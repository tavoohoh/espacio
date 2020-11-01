import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';

import { ComponentBaseClass } from '../../_classes';
import { CategoriesModel, ProductModel } from '../../_models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent extends ComponentBaseClass {
  public productCategories: Array<string> = [];
  public productActiveCategory: string;

  constructor(private afs: AngularFirestore) {
    super();
  }

  init() {
    console.log('categories/products');

    this.getProductCategories();
  }

  private getProductCategories(): void {
    const productCategories = this.afs.doc<CategoriesModel>(
      `categories/products`
    );

    productCategories
      .valueChanges()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((productCategoriesData) => {
        console.log(productCategoriesData);
        this.productCategories = productCategoriesData.categories;
      });
  }

  public filterByCategory(value: string): void {
    this.productActiveCategory = value;
  }
}
