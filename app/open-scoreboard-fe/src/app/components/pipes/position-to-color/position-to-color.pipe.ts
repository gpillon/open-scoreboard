import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'positionToColor'
})
export class PositionToColorPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 1:
        return "gold"
      case 2:
        return "silver"
      case 3:
        return "bronze"
    }
    return ""
  }

}
