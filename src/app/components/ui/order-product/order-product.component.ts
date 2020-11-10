import { Component } from '@angular/core';
import { OrderProductClass } from '../../../_classes';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.sass'],
})
export class OrderProductComponent extends OrderProductClass {}
