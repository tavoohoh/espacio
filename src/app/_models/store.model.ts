export class StoreModel {
  name: string;
  address: string;
  email: string;
  currencySymbol: string;
  website: string;
  category: string;
  abbreviation: string;
  description?: string;
  imageUrl?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;

  constructor(private props: any) {
    this.name = props.name;
    this.address = props.address;
    this.email = props.email;
    this.currencySymbol = props.currencySymbol;
    this.website = props.website;
    this.category = props.category;
    this.abbreviation = props.abbreviation;
    this.description = props.description;
    this.imageUrl = props.imageUrl;
    this.phone = props.phone;
    this.whatsapp = props.whatsapp;
    this.instagram = props.instagram;
    this.facebook = props.facebook;
    this.youtube = props.youtube;
    this.twitter = props.twitter;
    this.abbreviation = props.name.charAt(0);
  }
}
