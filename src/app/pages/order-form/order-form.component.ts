import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetItemsClass } from '../../_classes';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../../services/globals.service';
import { ItemNameEnum, OrderProductActionEnum } from '../../_enums';
import {
  OrderClass,
  ProductModel,
  CreateOrderProductModel,
  OrderProductClass,
  CreatedOrderModel,
} from '../../_models';

// TODO: Hide products with quantity equals to "0"

@Component({
  selector: 'app-orders',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass'],
})
export class OrderFormComponent extends GetItemsClass {
  public currencySymbol: string;
  public order: OrderClass;
  public isValid: boolean;

  constructor(
    private router: Router,
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
          category: product.category,
          description: product.description,
          imageUrl: product.imageUrl,
        });
        break;
      case OrderProductActionEnum.REMOVE:
        this.order.removeProduct(product.id);
        break;
    }

    this.validateOrder();
  }

  public updateCustomer(customer): void {
    this.order.customer = customer;

    this.validateOrder();
  }

  public navigateToParent(): void {
    this.router.navigateByUrl(`/orders`).then(() => null);
  }

  public validateOrder(): boolean {
    this.isValid =
      this.order.products.length > 0 &&
      this.order.customer &&
      this.order.customer.name &&
      this.order.customer.email &&
      this.order.customer.phone &&
      this.order.customer.name.length > 0 &&
      this.order.customer.email.length > 0 &&
      this.order.customer.phone.length > 0;

    return this.isValid;
  }

  /**
   * Create order
   */
  public async submit(): Promise<void> {
    if (!this.validateOrder()) {
      return;
    }

    const order: CreatedOrderModel = {
      customer: this.order.customer,
      products: this.order.products.map((item: OrderProductClass) => {
        const product: CreateOrderProductModel = {
          name: item.name,
          price: item.price,
          totalPrice: item.getTotalPrice(),
          quantity: item.quantity,
          selected: item.selected,
          id: item.id,
        };

        const productValues: ProductModel = {
          name: item.name,
          category: item.category,
          description: item.description,
          imageUrl: item.imageUrl,
          price: item.price,
          quantity: item.quantity - item.selected,
        };

        const productDocument = this.afs.doc<ProductModel>(
          `${ItemNameEnum.products}/${item.id}`
        );
        productDocument.update(productValues);

        return product;
      }),
    };

    const orders = this.afs.collection('orders');
    await orders.add(order);

    this.navigateToParent();
  }
}
