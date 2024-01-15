import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
    <button class="question">?</button>
    <button class="information">i</button>
  </div>
  `,

  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { }
