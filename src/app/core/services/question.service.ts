import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  private isQuestionSentSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  isQuestionSent() {
    return this.isQuestionSentSubject.asObservable();
  }
}
