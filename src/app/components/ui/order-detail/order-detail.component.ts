import { Component } from '@angular/core';
import { OrderDetailClass } from '../../../_classes';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.sass'],
})
export class OrderDetailComponent extends OrderDetailClass {
  constructor() {
    super();
  }
}
