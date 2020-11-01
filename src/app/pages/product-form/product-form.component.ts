import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { ComponentFormBaseClass } from '../../_classes';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass'],
})
export class ProductFormComponent extends ComponentFormBaseClass {
  constructor(
    private globalsService: GlobalsService,
    public formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private route: ActivatedRoute
  ) {
    super(formBuilder);
  }

  init(): void {
    const productId = this.route.snapshot.paramMap.get('productId');

    if (productId) {
      this.getProduct(productId);
    } else {
      this.setForm();
    }
  }

  setFields(): { [key: string]: any } {
    return super.setFields();
  }

  private getProduct(productId: string): void {}
}
