import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldVars } from '../_constants/field-vars.constant';

export class FieldClass implements OnChanges {
  @Input() submitted: boolean;
  @Input() formGroup: FormGroup;
  @Input() fieldName: string;
  @Input() fieldLabel: string;
  @Input() fieldPlaceholder: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      FieldVars.forEach((fieldVar) => {
        if (changes[fieldVar] && changes[fieldVar].currentValue) {
          this[fieldVar] = changes[fieldVar].currentValue;
        }
      });
    }

    this.changes(changes);
  }

  public changes(changes: SimpleChanges): void {}

  get controls() {
    return this.formGroup.controls;
  }
}
