import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropComponent } from './drop/drop.component';
import { DragComponent } from './drag/drag.component';
import { DragGridDirectiveDirective } from './drag-grid.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DropComponent,
    DragComponent,
    DragGridDirectiveDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, DragDropModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
