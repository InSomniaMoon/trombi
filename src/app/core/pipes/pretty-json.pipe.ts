import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyJson',
  standalone: true
})
export class PrettyJsonPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return JSON.stringify(value, null, 2);
  }

}
