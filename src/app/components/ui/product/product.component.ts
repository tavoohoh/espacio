import { Component, Input } from '@angular/core';
import { ItemClass } from '../../../_classes';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
})
export class ProductComponent extends ItemClass {
  @Input() price: number;
  @Input() quantity: number;
  @Input() currencySymbol: string;

  constructor() {
    super();
  }
}
