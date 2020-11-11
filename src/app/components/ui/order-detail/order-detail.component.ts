import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComponentFormBaseClass } from '../../../_classes';
import { OrderProductClass, OrderProductModel } from '../../../_models';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.sass'],
})
export class OrderDetailComponent extends ComponentFormBaseClass {
  @Input() products: Array<OrderProductClass | OrderProductModel>;
  @Input() currencySymbol: string;
  @Output() removeProduct = new EventEmitter<string>();
  @Output() formValues = new EventEmitter<{ [key: string]: any }>();

  constructor(public formBuilder: FormBuilder) {
    super(formBuilder);
  }

  init() {
    super.setForm();
  }

  setFields(): { [key: string]: any } {
    return {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    };
  }

  submit() {
    super.submit();

    this.formValues.emit(this.form.value);
  }
}
