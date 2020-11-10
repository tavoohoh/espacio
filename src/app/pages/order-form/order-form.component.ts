import { Component } from '@angular/core';
import { GetItemsClass } from '../../_classes';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../../services/globals.service';
import { ItemNameEnum, OrderProductActionEnum } from '../../_enums';
import { OrderClass, ProductModel } from '../../_models';

@Component({
  selector: 'app-orders',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass'],
})
export class OrderFormComponent extends GetItemsClass {
  public currencySymbol: string;
  public order: OrderClass;

  constructor(
    public afs: AngularFirestore,
    public globalsService: GlobalsService
  ) {
    super(afs, globalsService, ItemNameEnum.products);
  }

  afterFetchItems() {
    this.currencySymbol = this.globalsService.store.value.currencySymbol;
  }

  init() {
    super.init();

    this.order = new OrderClass({
      customer: null,
      products: [],
    });
  }

  public onProductActions(
    action: OrderProductActionEnum,
    product: ProductModel
  ): void {
    switch (action) {
      case OrderProductActionEnum.ADD:
        this.order.addProduct({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          id: product.id,
        });
        break;
      case OrderProductActionEnum.REMOVE:
        this.order.removeProduct(product.id);
        break;
    }
  }

  public updateCustomer(customer): void {
    this.order.customer = customer;
  }
}
