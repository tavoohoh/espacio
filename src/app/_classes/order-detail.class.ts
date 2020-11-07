import { Input } from '@angular/core';
import { ComponentBaseClass } from './component-base.class';
import { OrderClass } from '../_models';

export class OrderDetailClass extends ComponentBaseClass {
  @Input() order: OrderClass;
}
