import { OrderStatusEnum } from '../_enums';

export class OrderCustomerModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class OrderProductModel {
  name: string;
  price: number;
  quantity: number;
  totalPrice = (): number => this.price * this.quantity;

  constructor(
    private props: { name: string; price: number; quantity: number }
  ) {
    for (const prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }

    delete this.props;
  }
}

export class OrderModel {
  orderNumber: string;
  customer: OrderCustomerModel;
  products: Array<OrderProductModel>;
  status: OrderStatusEnum;

  constructor(private props: OrderModel, public id?: string) {
    this.orderNumber = props.orderNumber;
    this.customer = props.customer;
    this.status = props.status;
    this.products = props.products.map(
      (product) => new OrderProductModel(product)
    );

    if (!this.id) {
      delete this.id;
    }

    delete this.props;
  }
}
