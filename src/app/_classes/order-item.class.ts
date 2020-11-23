import { EventEmitter, Input, Output } from '@angular/core';
import { OrderStatusEnum } from '../_enums';
import { OrderCustomerModel } from '../_models';
import { ComponentBaseClass } from './component-base.class';

export class OrderItemClass extends ComponentBaseClass {
  @Input() customer: OrderCustomerModel;
  @Input() productQuantity: number;
  @Input() orderNumber: string;
  @Input() status: OrderStatusEnum;
  @Input() totalPrice: number;
  @Input() currencySymbol: string;
  @Output() clicked = new EventEmitter<void>();
}
