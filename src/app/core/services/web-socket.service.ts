import { isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from "rxjs";
import { ToastService } from "../Toastr";
import { Question } from "../types/question.type";
import { User } from "../types/user.type";


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: Socket;
  private isConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isConnected = () => this.isConnectedSubject.asObservable();
  private askingQuestionSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  askingQuestion = () => this.askingQuestionSubject.asObservable();
  private questionSubject: BehaviorSubject<Question> = new BehaviorSubject<Question>({ question: "", answers: [], askerId: "" });
  question = () => this.questionSubject.asObservable();

  // check if platform is browser
  constructor(private $toast: ToastService) {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }
    this.socket = new Socket({
      // url: 'wss://b4ea-89-35-213-206.ngrok-free.app',
      url: 'ws://localhost:8080',
      options: {
        extraHeaders: {
          "ngrok-skip-browser-warning": "1",
        }
      }
    });
    this.socket.connect();

  }

  users: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  me: BehaviorSubject<User> = new BehaviorSubject<User>({ id: "", name: "", position: [0, 0] });

  connect({ username }: any) {

    this.socket.on('me', (data: any) => {
      console.log('me', data);
      if (data.question) {
        this.questionSubject.next(data.question);
        this.askingQuestionSubject.next(true);
      }

      this.me.next({ id: data.id, name: data.name, position: [0, 0] });

    });
    this.socket.on('users', (data: any[]) => {
      this.users.next(data.filter((user: any) => user.id !== this.me.value.id));
    });

    this.socket.on("info", (data: any) => {
      console.log('info recieved', data);
      this.$toast.info(data.message);
    });

    this.socket.on("questionAsked", (data: any) => {
      console.log('questionAsked', data);
      this.askingQuestionSubject.next(true);
      this.questionSubject.next(data);
    });

    this.socket.on("peopleAnswered", (data: any) => {
      console.log('peopleAnswered', data);
      this.questionSubject.next(data);
    });

    this.socket.on("questionClosed", (data: any) => {
      console.log('questionClosed', data);
      this.askingQuestionSubject.next(false);
      this.questionSubject.next({ question: "", answers: [], askerId: "" });
    });

    this.isConnectedSubject.next(true);
    this.send("/login", { type: 'login', username });

  }

  public send(channel: string, data: any) {
    this.socket.emit(channel, JSON.stringify(data));
  }
}