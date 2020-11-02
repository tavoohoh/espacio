import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';

import { ComponentBaseClass } from '../../_classes';
import { CategoriesModel, ProductModel } from '../../_models';
import { GlobalsService } from '../../services/globals.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent extends ComponentBaseClass {
  public productCategories: Array<string> = [];
  public productActiveCategory: string;
  public products: Array<ProductModel> = [];
  public currencySymbol: string;
  private categoryQuery$ = new Subject<string>();

  constructor(
    private afs: AngularFirestore,
    private globalsService: GlobalsService
  ) {
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

  private getStoreCurrency(): void {
    this.currencySymbol = this.globalsService.store.value.currencySymbol;
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
          .snapshotChanges()
          .pipe(
            map((actions) => {
              return actions.map((product) => {
                const productData = product.payload.doc.data();

                return new ProductModel(productData, product.payload.doc.id);
              });
            })
          )
      )
    );

    products.pipe(takeUntil(this.$destroyed)).subscribe((productsData) => {
      this.products = productsData;
      this.getStoreCurrency();
    });
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
