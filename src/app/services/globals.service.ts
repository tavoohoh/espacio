import { Injectable } from '@angular/core';
import { PageStateModel, StoreStateModel } from '../_models';
import { ModalStateModel } from '../_models/modal.model';
import { PendingOrdersStateModel } from '../_models/pending-orders.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  public currentPage = new PageStateModel();
  public store = new StoreStateModel();
  public modal = new ModalStateModel();
  public pendingOrders = new PendingOrdersStateModel();
}
