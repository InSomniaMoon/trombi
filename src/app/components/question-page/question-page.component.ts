import { AsyncPipe, JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCaptureModule, NgxCaptureService } from "ngx-capture";
import { Observable } from 'rxjs';
import { WebSocketService } from '../../core/services/web-socket.service';
import { Question } from '../../core/types/question.type';
import { User } from '../../core/types/user.type';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, JsonPipe, NgClass, NgxCaptureModule],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent implements OnInit {

  question!: Observable<Question>;

  answerSelected!: number;
  @ViewChild('screen') screen!: any;
  answersSelected!: number[];

  constructor(private webService: WebSocketService, private captureService: NgxCaptureService) { }

  ngOnInit(): void {
    this.question = this.webService.question();
    this.question.subscribe((que) => {
      let nbAnswers = que.answers.length;
      this.answersSelected = Array(nbAnswers).fill(0);
    });
  }

  removeQuestion() {
    this.webService.send("/closeQuestion", {});
  }

  saveQuestion() {
    this.captureService.getImage(this.screen.nativeElement, true).subscribe((img) => {
      console.log(img);
      let a = document.createElement("a")
      a.href = img
      a.download = "answer"
      a.click()
    });
  }

  chooseAnswer(index: number) {
    this.webService.send("/answerQuestion", { answer: index });
    if (this.answerSelected != null) {
      this.answersSelected[this.answerSelected] -= 1;
    }
    this.answerSelected = index;
    this.answersSelected[index] += 1;
  }
  user(): Observable<User> {
    return this.webService.me.asObservable();
  }
}
