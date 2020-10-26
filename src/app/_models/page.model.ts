import { StateElementModel } from './state.model';
import { BehaviorSubject } from 'rxjs';

export interface PageModel {
  title: string;
  description: string;
  action: {
    text: string;
    id: string;
    route?: string;
  };
}

export class PageStateModel extends StateElementModel {
  constructor() {
    super(new BehaviorSubject<PageModel>(null));
  }
}
