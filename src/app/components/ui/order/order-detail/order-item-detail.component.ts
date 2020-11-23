import { Component, Input } from '@angular/core';
import { OrderItemClass } from '../../../../_classes/order-item.class';
import { OrderModel, OrderProductModel } from '../../../../_models';
import { OrderStatusEnum } from '../../../../_enums';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-order-item-detail',
  templateUrl: './order-item-detail.component.html',
  styleUrls: ['./order-item-detail.component.sass'],
})
export class OrderItemDetailComponent extends OrderItemClass {
  @Input() products: Array<OrderProductModel>;
  @Input() orderId: string;

  public statusEnum = OrderStatusEnum;

  constructor(public afs: AngularFirestore) {
    super();
  }

  public async changeOrderStatus(status: OrderStatusEnum): Promise<void> {
    const orderDocument = this.afs.doc<OrderModel>(`orders/${this.orderId}`);
    await orderDocument.update({
      status,
    });
  }
}
