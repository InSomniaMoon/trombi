import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ToastService } from '../toast.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'toastr-container',
  template: `
  @for(toast of toasts|async; track toast.uuid) {
    <toastr-toast *ngFor="let toast of toasts|async"
    [uid]=toast.uuid 
    [message]=toast.message 
    [type]=toast.type
    [title]=toast.title
    (onDismiss)="dismiss($event)" />
  }
    `,

  styleUrls: ['./toast-container.component.scss'],
  standalone: true,
  imports: [
    ToastComponent,
    NgFor,
    AsyncPipe
  ]

})
export class ToastContainerComponent implements OnInit {

  constructor(private $toast: ToastService) { }
  public get toasts() {
    return this.$toast.getAll()
  }

  public dismiss = (uid: string) => {
    this.$toast.remove(uid)
  }
  ngOnInit(): void {
  }

}
