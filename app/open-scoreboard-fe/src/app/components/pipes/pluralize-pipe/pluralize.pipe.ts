import {ChangeDetectorRef, Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {

  constructor(
    private ref: ChangeDetectorRef
  ) {
  }

  transform(value: number | null, singleLetter: string = "", pluralLetter: string = "s"): string | null {
    if (value == null) return null
    return value === 1 ? singleLetter : pluralLetter;
  }

}
