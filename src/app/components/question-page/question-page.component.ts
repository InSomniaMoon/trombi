import { Component, Input } from '@angular/core';
import { Student } from '../../core/types/student.type';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent {

  @Input({ required: true })
  students!: Student[];

  
}
