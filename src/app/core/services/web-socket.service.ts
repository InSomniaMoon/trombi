import { isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from "rxjs";
import { ToastService } from "../Toastr";


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: Socket;
  private isConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // check if platform is browser
  constructor(private $toast: ToastService) {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }
    this.socket = new Socket({
      url: 'ws://192.168.1.122:8080'
    });
    this.socket.connect();

  }

  users: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  me: BehaviorSubject<string> = new BehaviorSubject<string>("");

  connect({ username }: any) {
    this.socket.on('me', (data: any) => {
      console.log('me', data);
      this.me.next(data.id);
    });
    this.socket.on('users', (data: any[]) => {
      this.users.next(data.filter((user: any) => user.id !== this.me.value));
    });

    this.socket.on("info", (data: any) => {
      console.log('info recieved', data);
      this.$toast.info(data.message);
    });


    this.isConnectedSubject.next(true);
    this.send("/login", { type: 'login', username });

  }

  disconnect() {
    this.isConnectedSubject.next(false);
    this.send("/leave", {});
  }


  isConnected() {
    return this.isConnectedSubject.asObservable();
  }

  public send(channel: string, data: any) {
    this.socket.emit(channel, JSON.stringify(data));
  }
}