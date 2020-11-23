import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetItemsClass } from '../../_classes';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../../services/globals.service';
import { ItemNameEnum, OrderProductActionEnum } from '../../_enums';
import { OrderModel, ProductModel, OrderProductModel } from '../../_models';

@Component({
  selector: 'app-orders',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.sass'],
})
export class OrderFormComponent extends GetItemsClass {
  public currencySymbol: string;
  public order: OrderModel;
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

    this.order = new OrderModel();
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

    const order: OrderModel = {
      customer: this.order.customer,
      status: this.order.status,
      orderNumber: this.order.orderNumber,
      date: this.order.date,
      products: this.order.products.map((item: OrderProductModel) => {
        const productDocument = this.afs.doc<ProductModel>(
          `${ItemNameEnum.products}/${item.id}`
        );
        productDocument.update({
          quantity: item.quantity - item.selected,
        });

        return {
          name: item.name,
          price: item.price,
          totalPrice: item.getTotalPrice(),
          selected: item.selected,
          id: item.id,
        };
      }),
    };

    const orders = this.afs.collection('orders');
    await orders.add(order);

    this.navigateToParent();
  }
}
