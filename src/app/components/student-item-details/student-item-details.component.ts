import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { PrettyJsonPipe } from '../../core/pipes/pretty-json.pipe';
import { StudentService } from '../../core/services/student.service';

@Component({
  selector: 'app-student-item-details',
  standalone: true,
  imports: [CommonModule, PrettyJsonPipe],
  templateUrl: './student-item-details.component.html',
  styleUrl: './student-item-details.component.scss',
})
export class StudentItemDetailsComponent {

  constructor(private $Student: StudentService) { }

  student = this.$Student.seletedStudent

  isPopinVisible: boolean = true;

  closeDetails: () => void = () => {
    // this.$Student.seletedStudent.update(() => null);
    this.isPopinVisible = !this.isPopinVisible;

    if (!this.isPopinVisible) {
      setTimeout(() => {
        this.$Student.seletedStudent.update(() => null);
        this.isPopinVisible = !this.isPopinVisible;
      }, 300); // Ajustez le délai en fonction de la durée de votre animation (300ms dans cet exemple)
    }

  }
  @HostListener('click', ['$event.target'])
  onClick(div: HTMLElement): void {
    if (div.tagName === 'APP-STUDENT-ITEM-DETAILS')
      this.closeDetails();
  }
}
