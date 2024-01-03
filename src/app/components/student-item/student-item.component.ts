import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/types/student.type';

@Component({
  selector: 'app-student-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './student-item.component.html',
  styleUrl: './student-item.component.scss',

})
export class StudentItemComponent {

  @HostListener('click', ['$event.target'])
  onClick(div: HTMLElement): void {
    this.openDetails();
  }

  idpeople = Math.floor(Math.random() * 100) + 1;

  constructor(private $Student: StudentService) { }
  @Input({ required: true }) student!: Student

  openDetails: () => void = () => {
    this.$Student.selectedStudent.update(() => this.student);
  };
}
