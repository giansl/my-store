import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocals'
})
export class VocalsPipe implements PipeTransform {

  transform(value: string): string {
    return value
      .replace(/(a)/g, "1")
      .replace(/(e)/g, "2")
      .replace(/(i)/g, "3")
      .replace(/(o)/g, "4")
      .replace(/(u)/g, "5");
  }

}
