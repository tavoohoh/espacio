import { Component, Input } from '@angular/core';
import { OrderItemClass } from '../../../../_classes/order-item.class';
import { OrderProductModel } from '../../../../_models';

@Component({
  selector: 'app-order-item-detail',
  templateUrl: './order-item-detail.component.html',
  styleUrls: ['./order-item-detail.component.sass'],
})
export class OrderItemDetailComponent extends OrderItemClass {
  @Input() products: Array<OrderProductModel>;

  changeOrderStatus(): void {}
}
