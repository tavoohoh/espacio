import { Component } from '@angular/core';
import { ComponentFormBaseClass } from '../../_classes';
import { GlobalsService } from '../../services/globals.service';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.sass'],
})
export class ProductAddComponent extends ComponentFormBaseClass {
  constructor(
    private globalsService: GlobalsService,
    public formBuilder: FormBuilder,
    private afs: AngularFirestore
  ) {
    super(formBuilder);
  }
}
