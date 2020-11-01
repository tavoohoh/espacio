export class ProductModel {
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;

  constructor(private props: any) {
    for (const prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }

    delete this.props;
  }
}
