import { Component } from '@angular/core';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';

import { ComponentBaseClass } from '../../_classes';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../../services/globals.service';
import { OrderModel } from '../../_models';
import { OrderStatusEnum } from '../../_enums';
import * as firebase from 'firebase';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass'],
})
export class OrdersComponent extends ComponentBaseClass {
  public currencySymbol: string;
  public orders: Array<OrderModel> = [];
  public selectedOrder: OrderModel;
  public categories = [
    OrderStatusEnum.PENDING,
    OrderStatusEnum.COMPLETED,
    OrderStatusEnum.CANCELED,
  ];
  public categoryQuery$ = new Subject<string>();
  public activeCategory: string;

  constructor(
    public afs: AngularFirestore,
    public globalsService: GlobalsService
  ) {
    super();
  }

  public filterByCategory(value: string): void {
    this.activeCategory = value === this.activeCategory ? null : value;
    this.categoryQuery$.next(this.activeCategory);
  }

  private startFilters(): void {
    this.filterByCategory(this.activeCategory);
  }

  async init() {
    this.getOrders();
    this.startFilters();
  }

  private getOrders(): void {
    const items = combineLatest([this.categoryQuery$]).pipe(
      switchMap(([category]) =>
        this.afs
          .collection<OrderModel>('orders', (ref) => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;

            if (category) {
              query = query.where('status', '==', category);
            } else {
              query = query.limit(25);
            }

            return query;
          })
          .snapshotChanges()
          .pipe(
            map((rawItems) => {
              return rawItems.map((orderData) => {
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
      )
    );

    items.pipe(takeUntil(this.$destroyed)).subscribe((ordersData) => {
      this.selectedOrder = null;
      this.orders = ordersData;
      this.currencySymbol = this.globalsService.store.value.currencySymbol;
    });
  }

  public selectOrder(order: OrderModel): void {
    this.selectedOrder = order;

    window.scrollTo(0, 0);
  }
}
