export class ProductModel {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;

  constructor(private props: any) {
    for (const prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }

    delete this.props;
  }
}
