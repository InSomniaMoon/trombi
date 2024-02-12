import { CommonModule } from "@angular/common";
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { WebSocketService } from "../../core/services/web-socket.service";
import { User } from "../../core/types/user.type";
import { MouseUserComponent } from "./mouseUser/mouseUser.component";

@Component({
  selector: 'app-mouse-conainer',
  standalone: true,
  imports: [
    CommonModule,
    MouseUserComponent,

  ],
  template: `
  @for (user of users(); track $index) {
    <app-mouse-user [user]="user"/>
  }`,
  styleUrl: './mouseConainer.component.scss',
})
export class MouseConainerComponent implements OnInit {
  constructor(private $ws: WebSocketService) { }
  users: WritableSignal<User[]> = signal([])
  ngOnInit(): void {
    this.$ws.users.subscribe((u) => {
      this.users.set(u);
    }
    )
  }

}
