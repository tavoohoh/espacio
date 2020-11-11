export class ProductModel {
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
  id?: string;

  constructor(props: any, id?: string) {
    for (const prop in props) {
      if (props.hasOwnProperty(prop) && prop !== 'id') {
        this[prop] = props[prop];
      }
    }

    if (id) {
      this.id = id;
    }
  }
}
