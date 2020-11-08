import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetItemsClass } from '../../_classes';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../../services/globals.service';
import { ItemNameEnum } from '../../_enums';

@Component({
  selector: 'app-orders',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass'],
})
export class OrderFormComponent extends GetItemsClass {
  public currencySymbol: string;
  public form: FormGroup;
  public submitted = false;
  public fieldsValues: { [key: string]: any } = {};

  constructor(
    public afs: AngularFirestore,
    public globalsService: GlobalsService,
    @Inject(FormBuilder) public formBuilder: FormBuilder
  ) {
    super(afs, globalsService, ItemNameEnum.products);
  }

  afterFetchItems() {
    this.currencySymbol = this.globalsService.store.value.currencySymbol;
  }
}
