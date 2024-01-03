// phone pipe that formats a phone number to a french format

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(phone: string): string {
    if (!phone) {
      return '';
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length === 10) {
      return phoneDigits.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    return phone;
  }
}