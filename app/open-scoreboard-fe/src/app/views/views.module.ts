import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameTableComponent} from "./game-table/game-table.component";
import {AvatarModule, CardModule, GridModule, ProgressModule, TableModule} from "@coreui/angular";
import {IconModule} from "@coreui/icons-angular";
import {PipesModule} from "../components/pipes/pipes.module";


@NgModule({
  declarations: [GameTableComponent],
  imports: [
    CommonModule,
    CardModule,
    GridModule,
    IconModule,
    TableModule,
    AvatarModule,
    ProgressModule,
    PipesModule
  ],
  exports: [GameTableComponent]
})
export class ViewsModule {
}
