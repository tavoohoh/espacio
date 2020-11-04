import { Component } from '@angular/core';
import { ComponentBaseClass } from '../../_classes';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],
})
export class OrdersComponent extends ComponentBaseClass {
  constructor() {
    super();
  }
}
