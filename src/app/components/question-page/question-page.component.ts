import { AsyncPipe, JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCaptureModule, NgxCaptureService } from "ngx-capture";
import { Observable } from 'rxjs';
import { WebSocketService } from '../../core/services/web-socket.service';
import { Question } from '../../core/types/question.type';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, JsonPipe, NgClass, NgxCaptureModule],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent implements OnInit {

  question!: Observable<Question>;
  answerSelected!: Number;
  @ViewChild('screen') screen!: any;

  constructor(private webService: WebSocketService, private captureService: NgxCaptureService) { }

  ngOnInit(): void {
    this.question = this.webService.question();
  }

  removeQuestion() {
    this.webService.send("/closeQuestion", {});
  }

  saveQuestion() {
    //capture
    // console.log(this.screen);

    this.captureService.getImage(this.screen.nativeElement, true).subscribe((img) => {
      console.log(img);
      let a = document.createElement("a")
      a.href = img
      a.download = "answer"
      a.click()

    });
    this.webService.send("/closeQuestion", {});
  }

  chooseAnswer(index: number) {
    this.answerSelected = index;
  }

}
