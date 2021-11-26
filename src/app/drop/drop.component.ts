import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss'],
})
export class DropComponent implements OnInit {
  public items: Array<number>;

  constructor() {
    this.items = [...Array(9).keys()];
  }

  ngOnInit(): void {}

  containers?: ParentNode | null;
  dragIndex?: number;
  dropIndex?: number;
  drop(ev: CdkDragDrop<unknown>) {
    moveItemInArray(this.items, this.dragIndex!, this.dropIndex!);
  }

  public enter(event: CdkDragEnter): void {
    const dragContainerElement: HTMLElement =
      event.item.dropContainer.element.nativeElement;
    const dropContainerElement: HTMLElement =
      event.container.element.nativeElement;
    this.containers = dropContainerElement.parentNode;

    this.dragIndex = _indexOf(this.containers!.children, dragContainerElement);
    this.dropIndex = _indexOf(this.containers!.children, dropContainerElement);
  }
}

const _indexOf = (collection: unknown, node: unknown): number =>
  Array.prototype.indexOf.call(collection, node);
