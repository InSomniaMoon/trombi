import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../core/types/student.type';
import { Question } from '../../core/types/question.type';
import { Observable } from 'rxjs';
import { WebSocketService } from '../../core/services/web-socket.service';
import { AsyncPipe, JsonPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, JsonPipe, NgClass],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent implements OnInit {

  question!: Observable<Question>;
  answerSelected!: Number;

  constructor(private webService: WebSocketService) { }

  ngOnInit(): void {
    this.question = this.webService.question();
  }

  removeQuestion() {
    this.webService.send("/closeQuestion", {});
  }

  saveQuestion() {
    //capture
    this.webService.send("/closeQuestion", {});
  }

  chooseAnswer(index: number) {
    this.answerSelected = index;
  }

}
