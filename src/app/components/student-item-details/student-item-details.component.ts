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

  animations: [
    // open and close animation with a popin effect

    trigger('openClose', [
      state('open', style({
        opacity: 1,
        transform: 'scale(1)',
        height: "100%",
        width: "100%",
      })),
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.1)',
        height: "0%",
        width: "0%",
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class StudentItemDetailsComponent {

  constructor(private $Student: StudentService) { }

  student = this.$Student.seletedStudent

  closeDetails: () => void = () => {
    this.$Student.seletedStudent.update(() => null);
  }
  @HostListener('click', ['$event.target'])
  onClick(div: HTMLElement): void {
    if (div.tagName === 'APP-STUDENT-ITEM-DETAILS')
      this.closeDetails();
  }
}
