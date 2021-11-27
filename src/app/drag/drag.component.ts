import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { DragDropGridEvent } from '../drag-grid.directive';
import { randomColor } from '../utils';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss'],
})
export class DragComponent {
  public items: Array<Ele>;

  constructor() {
    this.items = [...Array(16).keys()].map(
      (x, i) => new Ele(x, randomColor(0.2))
    );
  }

  dropped(event: DragDropGridEvent) {
    moveItemInArray(this.items, event.dragIndex, event.dropIndex);
  }
}

export class Ele {
  constructor(public index: number, public color: string) {}
}
