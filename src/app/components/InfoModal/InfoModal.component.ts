import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { WebSocketService } from "../../core/services/web-socket.service";

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
  <form (ngSubmit)="onSumbit(infoForm)" #infoForm="ngForm">
    <div class="row-wrapper">
        <div class="form-group">
        <input type="text" id="info" name="infoToPass" [(ngModel)]="text" placeholder="" class="form-control" [maxlength]="maxLenght" required />
        <label for="info">Information</label>
      </div>
      <span>{{text.length}}/{{maxLenght}}</span>
    </div>
    <input type="submit" class="btn btn-success" value="Envoyer l'info">
  </form>
  `,
  styleUrl: './InfoModal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoModalComponent {

  text: string = "";
  maxLenght = 50;

  @Output()
  closeModal = new EventEmitter<void>();

  constructor(private $websocket: WebSocketService) { }


  onSumbit(form: NgForm) {
    this.$websocket.send("/info", { message: form.value.infoToPass });
    this.text = "";
    this.closeModal.emit();
  }
}
