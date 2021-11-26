import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragComponent } from './drag/drag.component';
import { DropComponent } from './drop/drop.component';

const routes: Routes = [
  { path: 'drag', component: DragComponent },
  { path: 'drop', component: DropComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
