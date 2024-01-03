import { Component, HostListener, Input } from '@angular/core';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/types/student.type';

@Component({
  selector: 'app-student-item',
  standalone: true,
  imports: [
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

  sexe = () => {
    switch (this.student.sexe) {
      case "H":
        return "men";
      case "F":
        return "women";
      default:
        throw new Error("Invalid sexe");
    }
  }

  /**
   * Open the student details
   * @example
   * openDetails();
   */
  openDetails: () => void = () => {
    this.$Student.selectedStudent.update(() => this.student);
  };
}
