export class SectionModel {
  name: string;
  category: string;
  description: string;
  imageUrl: string;

  constructor(private props: any, public id?: string) {
    for (const prop in props) {
      if (props.hasOwnProperty(prop) && prop !== 'id') {
        this[prop] = props[prop];
      }
    }

    if (!this.id) {
      delete this.id;
    }

    delete this.props;
  }
}
