import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[phoneFormat]',
  standalone: true,
})
export class PhoneFormatDirective {

  constructor(private el: ElementRef, private ngControl: NgControl) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputValue = this.el.nativeElement.value;

    // Supprime tous les caractères non numériques
    const numericValue = inputValue.replace(/\D/g, '');

    // Formatage du numéro de téléphone
    const formattedValue = this.formatPhoneNumber(numericValue);

    // Met à jour la valeur dans le modèle
    this.ngControl.control?.setValue(formattedValue, { emitEvent: false });
  }

  private formatPhoneNumber(value: string): string {
    if (value.length <= 2) {
      return value;
    } else {
      // ajoute un espace tous les 2 caractères, quelque soit le nombre de caractères
      
      return value.replace(/(\d{2})/g, '$1 ').trim();
    }
  }
}