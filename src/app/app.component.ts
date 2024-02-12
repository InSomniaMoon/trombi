import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener, Signal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoModalComponent } from './components/InfoModal/InfoModal.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { MouseConainerComponent } from './components/mouseConainer/mouseConainer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QuestionModalComponent } from './components/question-modal/question-modal.component';
import { StudentItemDetailsComponent } from './components/student-item-details/student-item-details.component';
import { StudentItemComponent } from './components/student-item/student-item.component';
import { ToastContainerComponent, ToastService } from './core/Toastr';
import { QuestionService } from './core/services/question.service';
import { StudentService } from './core/services/student.service';
import { WebSocketService } from './core/services/web-socket.service';
import { Student } from './core/types/student.type';
import { QuestionPageComponent } from './components/question-page/question-page.component';

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
    ToastContainerComponent,
    QuestionModalComponent,
    InfoModalComponent,
    QuestionPageComponent
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ToastService, WebSocketService, StudentService, QuestionService]
})
export class AppComponent {
  title = 'Trombinoscope';

  constructor(private $Student: StudentService, private $WebSocket: WebSocketService, private $Question: QuestionService) {
  }
  @HostListener('window: beforeunload',)
  beforeUnloadHandler() {
    this.$WebSocket.disconnect();
  }

  // on mouse move get the mouse position
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.$WebSocket.send('/mousemove', { x: event.clientX, y: event.clientY });
  }


  students: Signal<Student[]> = this.$Student.students;

  isDetailsOpen = computed(() => this.$Student.selectedStudent() !== null);

  closeStudentDetails() {
    this.$Student.selectedStudent.update(() => null);
  }

  showCreateStudent = signal(false);
  openCreateStudent() {
    this.showCreateStudent.set(true);
  }
  closeCreateStudent() {
    this.showCreateStudent.set(false);
  }
  showAskQuestion = signal(false);
  openAskQuestion() {
    this.showAskQuestion.set(true);
  }
  closeAskQuestion() {
    this.showAskQuestion.set(false);
  }

  showSendInformation = signal(false);
  openSendInformation() {
    this.showSendInformation.set(true);
  }
  closeSendInformation() {
    this.showSendInformation.set(false);
  }


  isConnected() {
    return this.$WebSocket.isConnected();
  }

  isQuestionSent() {
    return this.$Question.isQuestionSent();
  }
}
