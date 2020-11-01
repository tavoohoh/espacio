import { Component } from '@angular/core';
import { FieldClass } from '../../../_classes';

@Component({
  selector: 'app-char-field',
  templateUrl: './char-field.component.html',
  styleUrls: ['./char-field.component.sass'],
})
export class CharFieldComponent extends FieldClass {
  constructor() {
    super();
  }
}
