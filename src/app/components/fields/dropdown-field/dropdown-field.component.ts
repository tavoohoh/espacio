import { Component } from '@angular/core';
import { FieldClass } from '../../../_classes';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.sass'],
})
export class DropdownFieldComponent extends FieldClass {
  constructor() {
    super();
  }
}
