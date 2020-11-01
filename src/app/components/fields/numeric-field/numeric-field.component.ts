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
    const validCodes = [
      'Digit0',
      'Digit1',
      'Digit2',
      'Digit3',
      'Digit4',
      'Digit5',
      'Digit6',
      'Digit7',
      'Digit8',
      'Digit9',
      'Period',
    ];

    return !!validCodes.some((code) => code.includes(event.code));
  }
}
