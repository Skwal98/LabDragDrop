import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropComponent } from './drop/drop.component';
import { DragComponent } from './drag/drag.component';

@NgModule({
  declarations: [AppComponent, DropComponent, DragComponent],
  imports: [BrowserModule, AppRoutingModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
