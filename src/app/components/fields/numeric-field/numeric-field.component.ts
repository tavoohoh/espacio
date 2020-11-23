import { Component } from '@angular/core';
import { FieldClass } from '../../../_classes';

@Component({
  selector: 'app-numeric-field',
  templateUrl: './numeric-field.component.html',
  styleUrls: ['./numeric-field.component.sass'],
})
export class NumericFieldComponent extends FieldClass {
  constructor() {
    super();
  }

  public numberOnly(event): boolean {
    const validCodes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

    return !!validCodes.some((code) => code.includes(event.key));
  }
}
