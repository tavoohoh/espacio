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
            const order: OrderModel = {
              products: data.products,
              customer: data.customer,
              id: orderData.payload.doc.id,
              orderNumber: data.orderNumber,
              status: data.status,
              date: data.date,
            };

            return order;
          });
        })
      )
      .subscribe((ordersData) => {
        console.log('ordersData', ordersData);
      });
  }
}
