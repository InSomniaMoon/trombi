import { Component } from '@angular/core';
import { PhonePipe } from '../../core/pipes/phone.pipe';
import { StudentService } from '../../core/services/student.service';

@Component({
  selector: 'app-student-item-details',
  standalone: true,
  imports: [PhonePipe],
  templateUrl: './student-item-details.component.html',
  styleUrl: './student-item-details.component.scss',
})
export class StudentItemDetailsComponent {

  constructor(private $Student: StudentService) {
  }

  student = this.$Student.selectedStudent

  sexe = () => {
    switch (this.student()!.sexe) {
      case "H":
        return "men";
      case "F":
        return "women";
      default:
        throw new Error("Invalid sexe");
    }
  }


  deleteStudent() {
    this.$Student.deleteStudent(this.student()!)
  }
}