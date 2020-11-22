import { EventEmitter, Input, Output } from '@angular/core';
import { OrderStatusEnum } from '../_enums';
import { OrderCustomerModel } from '../_models';

export class OrderItemClass {
  @Input() customer: OrderCustomerModel;
  @Input() productQuantity: number;
  @Input() orderNumber: string;
  @Input() status: OrderStatusEnum;
  @Input() totalPrice: number;
  @Input() currencySymbol: string;
  @Output() clicked = new EventEmitter<void>();
}
