import { Component } from '@angular/core';
import { PrettyJsonPipe } from '../../core/pipes/pretty-json.pipe';
import { StudentService } from '../../core/services/student.service';

@Component({
  selector: 'app-student-item-details',
  standalone: true,
  imports: [PrettyJsonPipe],
  templateUrl: './student-item-details.component.html',
  styleUrl: './student-item-details.component.scss',
})
export class StudentItemDetailsComponent {

  constructor(private $Student: StudentService) {
  }

  student = this.$Student.selectedStudent

  deleteStudent() {
    this.$Student.deleteStudent(this.student()!)
  }
}