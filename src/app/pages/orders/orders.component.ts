import { Component } from '@angular/core';
import { ComponentBaseClass } from '../../_classes';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalsService } from '../../services/globals.service';

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

  private async getOrders(): Promise<void> {}
}
