import { EventEmitter, Input, Output } from '@angular/core';
import { ItemClass } from './item.class';
import { OrderProductActionEnum } from '../_enums';

export class OrderProductClass extends ItemClass {
  @Input() price: number;
  @Input() quantity: number;
  @Input() selected = 0;
  @Input() currencySymbol: string;
  @Input() isOrderDetail: boolean;
  @Output() edit = new EventEmitter<OrderProductActionEnum>();
  public orderProductAction = OrderProductActionEnum;

  public updateProductSelection(action: OrderProductActionEnum): void {
    this.edit.emit(action);

    switch (action) {
      case OrderProductActionEnum.ADD:
        if (this.selected >= this.quantity) {
          return;
        }

        ++this.selected;
        break;
      case OrderProductActionEnum.REMOVE:
        if (this.selected === 0) {
          return;
        }

        --this.selected;
        break;
      case OrderProductActionEnum.REMOVE_ALL:
        if (this.selected === 0) {
          return;
        }

        this.selected = 0;
        break;
    }
  }
}
