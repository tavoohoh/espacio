import { Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ComponentBaseClass } from './component-base.class';

export class ComponentFormBaseClass
  extends ComponentBaseClass
  implements OnDestroy {
  public form: FormGroup;
  public submitted = false;
  public fieldsValues: { [key: string]: any } = {};

  constructor(@Inject(FormBuilder) public formBuilder: FormBuilder) {
    super();
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
    this.resetForm();
    this.destroy();
  }

  setFields(): { [key: string]: any } {
    return {};
  }

  setForm(): void {
    this.form = this.formBuilder.group(this.setFields());
    this.fieldsValues = this.form.value;
  }

  resetForm(): void {
    if (this.form) {
      this.form.reset(this.fieldsValues);
    }
    this.submitted = false;
  }

  submit(): void {
    this.submitted = true;
    this.fieldsValues = this.form.value;
  }
}
