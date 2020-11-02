import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ItemsClass } from '../../_classes';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent extends ItemsClass {
  public currencySymbol: string;

  constructor(
    public afs: AngularFirestore,
    public globalsService: GlobalsService
  ) {
    super(afs, globalsService, 'products');
  }

  afterFetchItems() {
    this.currencySymbol = this.globalsService.store.value.currencySymbol;
  }
}
