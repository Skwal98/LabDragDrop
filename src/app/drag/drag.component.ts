import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss'],
})
export class DragComponent {
  public items: Array<Ele>;

  constructor() {
    this.items = [...Array(100).keys()].map(
      (x, i) => new Ele(x, randomColor(0.2))
    );
  }

  drop(ev: CdkDragDrop<unknown>) {
    this.oldDropElement = undefined;
    this.oldContainer = undefined;
    this.startDragContainer = undefined;
    this.commonDragIndex = undefined;

    // this.getContainer(0)!.removeChild(this.getElementFromContainer(0, 0)!);
  }

  oldDropElement?: Element;
  oldContainer?: Element;
  startDragContainer?: Element;
  commonDragIndex?: number;
  dragIndex?: number;
  dropIndex?: number;
  containers?: ParentNode | null;

  public enter(event: CdkDragEnter): void {
    console.log('enter');
    const dragContainerElement: HTMLElement =
      event.item.dropContainer.element.nativeElement;
    const dropContainerElement: HTMLElement =
      event.container.element.nativeElement;
    this.containers = dropContainerElement.parentNode;

    this.dragIndex = _indexOf(this.containers!.children, dragContainerElement);
    this.dropIndex = _indexOf(this.containers!.children, dropContainerElement);

    if (this.commonDragIndex === undefined) {
      this.commonDragIndex = this.dragIndex;
    }

    if (this.startDragContainer === undefined) {
      this.startDragContainer = dragContainerElement;
    }

    this.oldContainer = dropContainerElement;

    if (this.dropIndex > this.commonDragIndex) {
      const lenPositions = this.dropIndex - this.commonDragIndex;
      for (
        let i = this.commonDragIndex;
        i < this.commonDragIndex + lenPositions;
        i++
      ) {
        console.log('drag from -> ' + (i + 1) + ' to ' + i);
        const currentContainer = this.getContainer(i);
        const nextContainer = this.getContainer(i + 1);

        const element = this.findElementWithoutClass(
          'cdk-drag-placeholder',
          nextContainer!.children
        );
        currentContainer!.appendChild(element!);
      }
    } else {
      const lenPositions = this.commonDragIndex - this.dropIndex;
      for (
        let i = this.dropIndex + lenPositions - 1;
        i >= this.dropIndex;
        i--
      ) {
        console.log('drag from <- ' + i + ' to ' + (i + 1));
        const currentContainer = this.getContainer(i);
        const nextContainer = this.getContainer(i + 1);

        const element = this.findElementWithoutClass(
          'cdk-drag-placeholder',
          currentContainer!.children
        );
        nextContainer!.appendChild(element!);
      }
    }
    this.commonDragIndex = this.dropIndex;

    this.getContainer(this.dropIndex)!.appendChild(this.getPlaceholder()!);
  }

  //utils method
  private findElementWithTwoItems(): Element | null {
    const container = this.startDragContainer!.parentElement;
    for (let i = 0; i < container!.children.length; i++) {
      if (container!.children.item(i)!.children.length === 2)
        return container!.children.item(i)!;
    }
    return null;
  }

  getEmptyContainer(): Element | null {
    const container = this.startDragContainer!.parentElement;
    for (let i = 0; i < container!.children.length; i++) {
      if (container!.children.item(i)!.children.length === 0)
        return container!.children.item(i);
    }
    return null;
  }

  getContainer(index: number): Element | null {
    return this.containers!.children.item(index);
  }

  getElementFromContainer(
    containerIndex: number,
    index: number
  ): Element | null {
    return this.containers!.children.item(containerIndex)!.children.item(index);
  }

  getPlaceholder(): Element | null {
    for (let i = 0; i < this.containers!.children.length; i++) {
      const children = this.containers!.children.item(i)!.children;
      for (let i = 0; i < children.length; i++) {
        const el = children.item(i);
        if (el!.classList.contains('cdk-drag-placeholder')) {
          return el;
        }
      }
    }
    return null;
  }

  public findElementWithoutClass(
    cl: string,
    elements: HTMLCollection
  ): Element | null {
    for (let i = 0; i < elements.length; i++) {
      const el = elements.item(i);
      if (!el!.classList.contains(cl)) {
        return el;
      }
    }
    return null;
  }
}

const _indexOf = (collection: unknown, node: unknown): number =>
  Array.prototype.indexOf.call(collection, node);

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const randomColor = (brightness: number): string =>
  '#' +
  randomChannel(brightness) +
  randomChannel(brightness) +
  randomChannel(brightness);

export const randomChannel = (brightness: number): string => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const r = 255 - brightness;
  const n = 0 | (Math.random() * r + brightness);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const s = n.toString(16);
  return s.length === 1 ? '0' + s : s;
};

export class Ele {
  constructor(public index: number, public color: string) {}
}
