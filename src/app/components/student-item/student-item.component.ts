import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  constructor(private $Student: StudentService) { }
  @Input({ required: true }) student!: Student

  openDetails: () => void = () => {
    console.log(this.$Student.seletedStudent());
    this.$Student.seletedStudent.update(() => this.student);
    console.log(this.$Student.seletedStudent());
  };
}
