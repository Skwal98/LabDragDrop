import { CdkDragDrop, CdkDragEnter, CdkDropList } from '@angular/cdk/drag-drop';
import { Directive, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[dragGrid]',
})
export class DragGridDirectiveDirective {
  @Output('dragGridDropped') dropped$ = new Subject<DragDropGridEvent>();

  static commonDragIndex?: number;
  static dragIndex?: number;
  static dropIndex?: number;
  containers?: ParentNode | null;
  startDragContainer?: Element;
  private _debug = false;

  constructor(dropList: CdkDropList) {
    dropList.dropped.subscribe((x) => this.drop(x));
    dropList.entered.subscribe((x) => this.enter(x));
  }

  public get dragIndex() {
    return DragGridDirectiveDirective.dragIndex!;
  }
  public set dragIndex(val: number | undefined) {
    DragGridDirectiveDirective.dragIndex = val;
  }

  public get commonDragIndex() {
    return DragGridDirectiveDirective.commonDragIndex!;
  }
  public set commonDragIndex(val: number | undefined) {
    DragGridDirectiveDirective.commonDragIndex = val;
  }

  public get dropIndex() {
    return DragGridDirectiveDirective.dropIndex!;
  }
  public set dropIndex(val: number | undefined) {
    DragGridDirectiveDirective.dropIndex = val;
  }

  public enter(event: CdkDragEnter): void {
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

    if (this.dropIndex > this.commonDragIndex) {
      const lenPositions = this.dropIndex - this.commonDragIndex;
      for (
        let i = this.commonDragIndex;
        i < this.commonDragIndex + lenPositions;
        i++
      ) {
        this._log('drag from -> ' + (i + 1) + ' to ' + i);
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
        this._log('drag from <- ' + i + ' to ' + (i + 1));
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
  getEmptyContainer(): Element | null {
    const container = this.startDragContainer!.parentElement;
    for (let i = 0; i < container!.children.length; i++) {
      if (container!.children.item(i)!.children.length === 0)
        return container!.children.item(i);
    }
    return null;
  }

  private getContainer(index: number): Element | null {
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

  drop(ev: CdkDragDrop<unknown>) {
    this._log('Drop from: ' + this.dragIndex + ' to ' + this.dropIndex);
    if (this.dragIndex == this.dropIndex) {
      return;
    }

    if (this.dropIndex! > this.dragIndex!) {
      for (let i = this.dropIndex!; i > this.dragIndex!; i--) {
        this._log('move from: ' + (i - 1) + ' to ' + i);

        const nextContainer = this.getContainer(i - 1);
        const length = nextContainer?.children.length;

        const element = this.getElementFromContainer(i - 1, length! - 1);
        this.getContainer(i)!.appendChild(element!);
      }
    } else {
      for (let i = this.dropIndex!; i < this.dragIndex!; i++) {
        this._log('move from: ' + (i + 1) + ' to ' + i);

        const nextContainer = this.getContainer(i + 1);
        const length = nextContainer?.children.length;

        const element = this.getElementFromContainer(i + 1, length! - 1);
        this.getContainer(i)!.appendChild(element!);
      }
    }

    this.dropped$.next(new DragDropGridEvent(this.dragIndex!, this.dropIndex!));

    this.startDragContainer = undefined;
    this.commonDragIndex = undefined;
    this.dragIndex = undefined;
    this.dropIndex = undefined;
  }

  private _log(text: string) {
    if (this._debug) {
      console.log(text);
    }
  }
}

const _indexOf = (collection: unknown, node: unknown): number =>
  Array.prototype.indexOf.call(collection, node);

export class DragDropGridEvent {
  constructor(public dragIndex: number, public dropIndex: number) {}
}
