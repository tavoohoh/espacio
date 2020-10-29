import { Injectable } from '@angular/core';
import { PageStateModel, StoreStateModel } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  public currentPage = new PageStateModel();
  public store = new StoreStateModel();
  public orders;
}
