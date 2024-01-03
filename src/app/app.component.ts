import { CommonModule } from '@angular/common';
import { Component, Signal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { ModalComponent } from './components/modal/modal.component';
import { StudentItemDetailsComponent } from './components/student-item-details/student-item-details.component';
import { StudentItemComponent } from './components/student-item/student-item.component';
import { StudentService } from './core/services/student.service';
import { Student } from './core/types/student.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    StudentItemComponent,
    StudentItemDetailsComponent,
    CreateStudentComponent,
    ModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Trombinoscope';

  constructor(private $Student: StudentService) {
  }

  showCreateStudent = signal(false);

  students: Signal<Student[]> = this.$Student.students;

  isDetailsOpen = computed(() => this.$Student.seletedStudent() !== null);

  closeStudentDetails() {
    this.$Student.seletedStudent.update(() => null);
  }

  openCreateStudent() {
    this.showCreateStudent.set(true);
    console.log(this.showCreateStudent());
  }
  closeCreateStudent() {
    this.showCreateStudent.set(false);
  }
}
