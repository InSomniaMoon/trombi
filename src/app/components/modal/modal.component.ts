import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
  ],
  template: `
  <div class="wrapper" [style.transform]="isPopinVisible ? 'scale(1)' : 'scale(0)'">
    <div class="head">
      <h2>{{HeadTitle}} </h2>
      <button (click)="closeDetails()" class="btn btn-danger">X</button>
    </div>
    <div >
      <ng-content />
    </div>
</div>`,
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  isPopinVisible = true;

  @Input({ required: true }) HeadTitle!: string

  @Output('onModalClose')
  onCloseModal = new EventEmitter<void>();

  closeDetails: () => void = () => {
    // this.$Student.seletedStudent.update(() => null);
    this.isPopinVisible = !this.isPopinVisible;

    if (!this.isPopinVisible) {
      setTimeout(() => {
        //TODO: close from child
        this.onCloseModal.emit();
        this.isPopinVisible = !this.isPopinVisible;
      }, 300); // Ajustez le délai en fonction de la durée de votre animation (300ms dans cet exemple)
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(div: HTMLElement): void {
    if (div.tagName === 'APP-MODAL')
      this.closeDetails();
  }

}
