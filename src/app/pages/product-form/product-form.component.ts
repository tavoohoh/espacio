import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { ItemFormClass } from '../../_classes';
import { GlobalsService } from '../../services/globals.service';
import { ItemNameEnum } from '../../_enums';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass'],
})
export class ProductFormComponent extends ItemFormClass {
  constructor(
    public globalsService: GlobalsService,
    public formBuilder: FormBuilder,
    public afs: AngularFirestore,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(
      globalsService,
      formBuilder,
      afs,
      route,
      router,
      ItemNameEnum.products
    );
  }
}
