import { Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { ButtonEmum, StyleEnum } from '../_enums';

export class ComponentFormBaseClass implements OnDestroy, OnInit {
  public $destroyed = new Subject();
  public buttonType = ButtonEmum;
  public style = StyleEnum;
  public form: FormGroup;
  public submitted = false;
  public fieldsValues: { [key: string]: any } = {};

  constructor(@Inject(FormBuilder) public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.init();
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
    this.form.reset(this.fieldsValues);
    this.submitted = false;
  }

  submit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.fieldsValues = this.form.value;
  }

  init(): void {}
  destroy(): void {}
}
