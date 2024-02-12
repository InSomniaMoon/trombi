import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { WebSocketService } from '../../core/services/web-socket.service';

@Component({
  selector: 'app-question-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './question-modal.component.html',
  styleUrl: './question-modal.component.scss'
})
export class QuestionModalComponent {
  reponses: string[] = [''];
  question = "";

  @Output()
  closeModal = new EventEmitter<void>();

  constructor(private $websocket: WebSocketService) { }

  onSubmit(form: NgForm) {
    this.$websocket.send("/askQuestion", { message: { question: form.value.question, answers: this.reponses } });
    form.reset();
    this.reponses = [''];
    this.closeModal.emit();
  }

  addResponse() {
    this.reponses.push('');
  }

  deleteAnswer(i: number) {
    this.reponses.splice(i, 1);
  }
}
