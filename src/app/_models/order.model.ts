import { OrderStatusEnum } from '../_enums';
import { environment } from '../../environments/environment';

export class OrderCustomerModel {
  name: string;
  email: string;
  phone: string;
}

export class OrderProductModel {
  name: string;
  price: number;
  quantity: number;
}

export class OrderProductClass extends OrderProductModel {
  public readonly getTotalPrice: () => number = (): number =>
    this.price * this.quantity;

  constructor(private props: OrderProductModel) {
    super();

    for (const prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }

    delete this.props;
  }
}

export class OrderModel {
  customer: OrderCustomerModel;
  products: Array<OrderProductClass | OrderProductModel>;
}

export class OrderClass extends OrderModel {
  public id: string;
  public status: OrderStatusEnum;
  public orderNumber: string;

  private readonly setOrderNumber: () => string = () => {
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

  public readonly getOrderDate: () => Date = () => {
    const dateNow = this.orderNumber
      .slice(2, this.orderNumber.length - 1)
      .split('-')
      .join('');

    return new Date(Number(dateNow));
  };

  constructor(
    private props: {
      customer: OrderCustomerModel;
      products: Array<OrderProductModel>;
    }
  ) {
    super();

    this.customer = props.customer;
    this.orderNumber = this.setOrderNumber();
    this.status = OrderStatusEnum.PENDING;
    this.products = props.products.map(
      (product) => new OrderProductClass(product)
    );

    delete this.props;
  }
}
