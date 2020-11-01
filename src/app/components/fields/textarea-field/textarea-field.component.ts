import { Component } from '@angular/core';
import { FieldClass } from '../../../_classes';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.sass'],
})
export class TextareaFieldComponent extends FieldClass {
  constructor() {
    super();
  }
}
