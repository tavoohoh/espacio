import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemClass } from '../../../_classes';
import { OrderProductActionEnum } from '../../../_enums';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.sass'],
})
export class OrderProductComponent extends ItemClass {
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
