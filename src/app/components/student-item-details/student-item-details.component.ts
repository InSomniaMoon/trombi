import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { PrettyJsonPipe } from '../../core/pipes/pretty-json.pipe';
import { StudentService } from '../../core/services/student.service';
import { ModalChild, ModalChildInterface } from '../modal/modal-child.interface';

@Component({
  selector: 'app-student-item-details',
  standalone: true,
  imports: [CommonModule, PrettyJsonPipe, ModalChild],
  templateUrl: './student-item-details.component.html',
  styleUrl: './student-item-details.component.scss',
})
export class StudentItemDetailsComponent {

  constructor(private $Student: StudentService) {
  }

  student = this.$Student.seletedStudent
}