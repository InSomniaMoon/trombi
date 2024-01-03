import { Directive, TemplateRef } from "@angular/core";


export interface ModalChildInterface {
  closeDetails: () => void
}

@Directive({
  standalone: true,
  selector: "[modal-child]"
})
export class ModalChild {

  constructor() { }

  closeDetails: () => void = () => {
    console.log('closeDetails interface')
  }
}