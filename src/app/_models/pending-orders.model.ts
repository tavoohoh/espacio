import { StateElementModel } from './state.model';
import { BehaviorSubject } from 'rxjs';

export class PendingOrdersModel {
  quantity: string;

  constructor(quantity = 0) {
    this.quantity = quantity.toString();
  }
}

export class PendingOrdersStateModel extends StateElementModel {
  constructor() {
    super(new BehaviorSubject<PendingOrdersModel>(null));
  }
}
