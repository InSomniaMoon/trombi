import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener, Signal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { MouseConainerComponent } from './components/mouseConainer/mouseConainer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentItemDetailsComponent } from './components/student-item-details/student-item-details.component';
import { StudentItemComponent } from './components/student-item/student-item.component';
import { StudentService } from './core/services/student.service';
import { WebSocketService } from './core/services/web-socket.service';
import { Student } from './core/types/student.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgClass,
    RouterOutlet,
    StudentItemComponent,
    StudentItemDetailsComponent,
    CreateStudentComponent,
    ModalComponent,
    LoginComponent,
    NavbarComponent,
    CommonModule,
    MouseConainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Trombinoscope';

  constructor(private $Student: StudentService, private $WebSocket: WebSocketService) {
  }
  @HostListener('window: beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    this.$WebSocket.disconnect();
  }

  // on mouse move get the mouse position
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.$WebSocket.send('/mousemove', { x: event.clientX, y: event.clientY });
  }

  showCreateStudent = signal(false);

  students: Signal<Student[]> = this.$Student.students;

  isDetailsOpen = computed(() => this.$Student.selectedStudent() !== null);

  closeStudentDetails() {
    this.$Student.selectedStudent.update(() => null);
  }

  openCreateStudent() {
    this.showCreateStudent.set(true);
  }
  closeCreateStudent() {
    this.showCreateStudent.set(false);
  }

  isConnected() {
    return this.$WebSocket.isConnected();
  }
}
