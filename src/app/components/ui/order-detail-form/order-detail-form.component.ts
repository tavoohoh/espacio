import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ComponentFormBaseClass } from '../../../_classes';
import { OrderProductClass, OrderProductModel } from '../../../_models';
import { GlobalsService } from '../../../services/globals.service';

@Component({
  selector: 'app-order-form-detail',
  templateUrl: './order-detail-form.component.html',
  styleUrls: ['./order-detail-form.component.sass'],
})
export class OrderDetailFormComponent extends ComponentFormBaseClass {
  @Input() products: Array<OrderProductClass | OrderProductModel>;
  @Input() currencySymbol: string;
  @Output() removeProduct = new EventEmitter<string>();

  constructor(
    public formBuilder: FormBuilder,
    private globalsService: GlobalsService,
    private afs: AngularFirestore
  ) {
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
}
