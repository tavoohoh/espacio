import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ComponentBaseClass } from '../../_classes';
import {
  CategoriesModel,
  CollectionQueryModel,
  ProductModel,
} from '../../_models';
import { combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent extends ComponentBaseClass {
  public productCategories: Array<string> = [];
  public productActiveCategory: string;
  public products: Array<ProductModel> = [];
  private categoryQuery$ = new Subject<string>();

  constructor(private afs: AngularFirestore) {
    super();
  }

  init() {
    this.getProductCategories();
    this.getProducts();
    this.resetFilters();
  }

  private resetFilters(): void {
    this.filterByCategory(null);
  }

  private getProducts(): void {
    const products = combineLatest([this.categoryQuery$]).pipe(
      switchMap(([category]) =>
        this.afs
          .collection<ProductModel>('products', (ref) => {
            let query: any = ref;

            if (category) {
              query = query.where('category', '==', category);
            }

            return query;
          })
          .valueChanges()
      )
    );

    products
      .pipe(takeUntil(this.$destroyed))
      .subscribe((productsData) => (this.products = productsData));
  }

  private getProductCategories(): void {
    const productCategories = this.afs.doc<CategoriesModel>(
      `categories/products`
    );

    productCategories
      .valueChanges()
      .pipe(takeUntil(this.$destroyed))
      .subscribe(
        (productCategoriesData) =>
          (this.productCategories = productCategoriesData.categories)
      );
  }

  public filterByCategory(value: string): void {
    this.productActiveCategory =
      value === this.productActiveCategory ? null : value;
    this.categoryQuery$.next(this.productActiveCategory);
  }
}
