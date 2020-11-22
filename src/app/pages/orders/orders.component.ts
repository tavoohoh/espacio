import { Component } from '@angular/core';
import { ComponentBaseClass } from '../../_classes';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../../services/globals.service';
import { OrderModel } from '../../_models';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],
})
export class OrdersComponent extends ComponentBaseClass {
  public currencySymbol: string;
  public orders: Array<OrderModel> = [];
  public selectedOrder: OrderModel;

  constructor(
    public afs: AngularFirestore,
    public globalsService: GlobalsService
  ) {
    super();
  }

  async init() {
    await this.getOrders();
  }

  private async getOrders(): Promise<void> {
    const orders = this.afs.collection<OrderModel>(`orders`);

    orders
      .snapshotChanges()
      .pipe(
        takeUntil(this.$destroyed),
        map((ordersData) => {
          return ordersData.map((orderData) => {
            const data = orderData.payload.doc.data();

            return new OrderModel(
              data.products,
              data.customer,
              orderData.payload.doc.id,
              data.orderNumber,
              data.status,
              data.date
            );
          });
        })
      )
      .subscribe((ordersData) => {
        this.currencySymbol = this.globalsService.store.value.currencySymbol;
        this.orders = ordersData;
      });
  }

  public selectOrder(order: OrderModel): void {
    this.selectedOrder = order;
  }
}
