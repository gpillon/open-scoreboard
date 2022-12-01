import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PluralizePipe} from "./pluralize-pipe/pluralize.pipe";
import {PositionToColorPipe} from './position-to-color/position-to-color.pipe';

@NgModule({
  declarations: [PluralizePipe, PositionToColorPipe],
  imports: [
    CommonModule
  ],
  exports: [PluralizePipe, PositionToColorPipe]

})
export class PipesModule {
}
