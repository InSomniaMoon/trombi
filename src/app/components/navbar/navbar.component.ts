import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div></div>
  <h1>Trombinosope</h1>
  <div class="buttons-wrapper">
    <button (click)="question()" class="question">?</button>
    <button (click)="info()" class="information">i</button>
  </div>
  `,

  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  @Output("openInfo")
  private openInfoEvent = new EventEmitter<void>();

  @Output("openQuestion")
  private openQuestion = new EventEmitter<void>();

  info() {
    console.log("info")
    this.openInfoEvent.emit();
  }

  question() {
    this.openQuestion.emit()
  }


}
