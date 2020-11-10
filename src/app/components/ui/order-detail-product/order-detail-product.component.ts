import { Component, Input } from '@angular/core';
import { OrderProductClass } from '../../../_classes';

@Component({
  selector: 'app-order-detail-product',
  templateUrl: './order-detail-product.component.html',
  styleUrls: ['./order-detail-product.component.sass'],
})
export class OrderDetailProductComponent extends OrderProductClass {
  @Input() totalPrice: number;
  @Input() selected: number;
}
