import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { User } from "../../../core/types/user.type";

@Component({
  selector: 'app-mouse-user',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<span class="name"> {{user.name}} </span>`,
  styleUrl: './mouseUser.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseUserComponent {
  @Input({ required: true }) user!: User;

  // set host style from user position
  @HostBinding('style.left.px')
  get left() {
    return this.user.position[0];
  }
  @HostBinding('style.top.px')
  get top() {
    return this.user.position[1];
  }



}
