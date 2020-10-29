import { BehaviorSubject } from 'rxjs';
import { StateElementModel } from './state.model';

export class StoreModel {
  name: string;
  address: string;
  email: string;
  currencySymbol: string;
  website: string;
  category: string;
  phone: number;
  whatsapp: number;
  instagram: string;
  facebook: string;
  youtube: string;
  twitter: string;
  imageUrl: string;
  description: string;
  abbreviation: string;

  constructor(private props: any) {
    for (const prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }

    this.abbreviation = props.name.charAt(0);

    delete this.props;
  }
}

export class StoreStateModel extends StateElementModel {
  constructor() {
    super(new BehaviorSubject<StoreModel>(null));
  }
}
