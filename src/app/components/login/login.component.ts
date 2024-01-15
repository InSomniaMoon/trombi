import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { WebSocketService } from "../../core/services/web-socket.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  template: `
    <div class="wrapper">
      <form (ngSubmit)="onSubmit(form)" #form="ngForm">
        <div>
          <label for="username">Username</label>
          <input type="text" id="username" name="username" ngModel>
        </div>
        <!-- submit -->
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  `,
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  constructor(private $ws: WebSocketService) { }
  onSubmit(form: NgForm) {

    console.log('onSubmit');
    this.$ws.connect(form.value);
  }
}
