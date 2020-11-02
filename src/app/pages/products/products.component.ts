import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ItemsClass } from '../../_classes';
import { GlobalsService } from '../../services/globals.service';
import { ItemNameEnum } from '../../_enums';

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
    super(afs, globalsService, ItemNameEnum.products);
  }

  afterFetchItems() {
    this.currencySymbol = this.globalsService.store.value.currencySymbol;
  }
}
