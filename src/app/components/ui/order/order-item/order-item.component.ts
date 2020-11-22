import { Component, Input } from '@angular/core';
import { OrderItemClass } from '../../../../_classes/order-item.class';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.sass'],
})
export class OrderItemComponent extends OrderItemClass {
  @Input() isActive: boolean;
}
