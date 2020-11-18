import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, takeUntil } from 'rxjs/operators';

import { GlobalsService } from './services/globals.service';
import {
  ActivatedRoute,
  ActivationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { OrderModel, StoreModel } from './_models';
import { ComponentBaseClass } from './_classes';
import { PageConstant } from './_constants';
import { environment } from '../environments/environment';

@Component({
  template: `
    <div class="es-main">
      <app-sidebar></app-sidebar>
      <app-header></app-header>
      <div class="es-main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
    <app-modal></app-modal>
  `,
  styleUrls: ['./main.component.sass'],
})
export class MainComponent extends ComponentBaseClass {
  constructor(
    private globalsService: GlobalsService,
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {
    super();
  }

  init() {
    this.setCurrentPage();
    this.setStore();
    this.setOrders();
  }

  private setCurrentPage(): void {
    if (this.route.firstChild) {
      this.route.firstChild.data.subscribe(
        (data) =>
          (this.globalsService.currentPage.value = PageConstant[data.routeName])
      );
    } else {
      this.globalsService.currentPage.value = null;
    }

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof ActivationStart) {
        if (PageConstant[event.snapshot.data.routeName]) {
          this.globalsService.currentPage.value =
            PageConstant[event.snapshot.data.routeName];
        }
      }
    });
  }

  private setStore(): void {
    const store = this.afs.doc<StoreModel>(
      `store/${environment.appConfig.storeApiKey}`
    );

    store
      .valueChanges()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((storeData) => {
        this.globalsService.store.value = new StoreModel(storeData);
      });
  }

  private setOrders(): void {
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
