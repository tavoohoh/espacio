import { Component } from '@angular/core';
import { ComponentFormBaseClass } from '../../_classes';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.sass'],
})
export class ProductAddComponent extends ComponentFormBaseClass {
  constructor() {
    super();
  }
}
