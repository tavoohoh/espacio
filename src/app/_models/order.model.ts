import { OrderStatusEnum } from '../_enums';
import { environment } from '../../environments/environment';

export class OrderCustomerModel {
  name: string;
  email: string;
  phone: string;
}

export class OrderProductModel {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
  description?: string;
  imageUrl?: string;
  selected?: number;
  totalPrice?: string;

  public getTotalPrice?: () => string = (): string =>
    (this.price * this.selected).toString();

  constructor(props: OrderProductModel) {
    this.selected = 1;

    for (const prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }
  }
}

export class OrderModel {
  public customer: OrderCustomerModel;
  public products: Array<OrderProductModel>;
  public status: OrderStatusEnum;
  public orderNumber: string;
  public date?: string;
  public id?: string;

  private setOrderNumber?: () => string = () => {
    const now = Date.now().toString();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const char = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );

    return [
      environment.appConfig.name.charAt(0).toUpperCase() +
        Math.floor(Math.random() * 10) +
        now.slice(0, 3),
      now.slice(3, 8),
      now.slice(8, 14) + char,
    ].join('-');
  };

  public setOrderDate?: () => string = () => {
    const dateNow = this.orderNumber
      .slice(2, this.orderNumber.length - 1)
      .split('-')
      .join('');

    return new Date(Number(dateNow)).toString();
  };

  public addProduct?: (product: OrderProductModel) => void = (
    product: OrderProductModel
  ) => {
    const productIndex = this.products.findIndex(
      (prod) => prod.id === product.id
    );

    if (productIndex === -1) {
      this.products.push(new OrderProductModel(product));
    } else {
      ++this.products[productIndex].selected;
    }
  };

  public removeProduct?: (id: string) => void = (id: string) => {
    const productIndex = this.products.findIndex((prod) => prod.id === id);

    if (productIndex === -1) {
      console.error('This product is not present in this order');
    }

    if (this.products[productIndex].selected > 1) {
      --this.products[productIndex].selected;
    } else {
      this.removeAllOfProduct(id);
    }
  };

  public removeAllOfProduct?: (id: string) => void = (id: string) => {
    this.products = this.products.filter((prod) => prod.id !== id);
  };

  public productQuantity?: () => number = () => {
    let quantity = 0;

    this.products.forEach((product) => (quantity += product.selected));

    return quantity;
  };

  public totalPrice?: () => number = () => {
    let price = 0;

    this.products.forEach(
      (product) => (price = price + Number(product.totalPrice))
    );

    return price;
  };

  constructor(
    products: Array<OrderProductModel> = [],
    customer: OrderCustomerModel = null,
    id: string = null,
    orderNumber: string = null,
    status: OrderStatusEnum = null,
    date: string = null
  ) {
    this.customer = customer;
    this.products = products.map((product) => new OrderProductModel(product));

    if (id) {
      this.orderNumber = orderNumber;
      this.status = status;
      this.date = date;
      this.id = id;
    } else {
      this.orderNumber = this.setOrderNumber();
      this.status = OrderStatusEnum.PENDING;
      this.date = this.setOrderDate();
    }
  }
}
