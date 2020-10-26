import { Injectable } from '@angular/core';
import { PageStateModel } from '../_models/page.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  public currentPage = new PageStateModel();
}
