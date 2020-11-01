import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';

import { ComponentFormBaseClass } from '../../_classes';
import { GlobalsService } from '../../services/globals.service';
import { ProductModel, CategoriesModel } from '../../_models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass'],
})
export class ProductFormComponent extends ComponentFormBaseClass {
  private product: ProductModel = new ProductModel({
    name: '',
    category: '',
    price: null,
    quantity: null,
    description: '',
    imageUrl: '',
  });
  private productId: string;

  constructor(
    private globalsService: GlobalsService,
    public formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(formBuilder);
  }

  init(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');

    if (this.productId) {
      this.getProduct();
    } else {
      this.setForm();
    }
  }

  setFields(): { [key: string]: any } {
    const fields = {};

    for (const prop in this.product) {
      if (this.product.hasOwnProperty(prop)) {
        if (prop === 'imageUrl') {
          fields[prop] = [this.product[prop]];
        } else {
          fields[prop] = [this.product[prop], Validators.required];
        }
      }
    }

    return fields;
  }

  resetForm(): void {
    super.resetForm();
    this.router.navigateByUrl('/products').then(() => null);
  }

  private getProduct(): void {
    const product = this.afs.doc<ProductModel>(`products/${this.productId}`);

    product
      .valueChanges()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((productData) => {
        this.product = new ProductModel(productData);
        this.setForm();
      });
  }

  public async submit(): Promise<void> {
    super.submit();

    this.updateProductCategories();

    if (this.productId) {
      const product = this.afs.doc<ProductModel>(`products/${this.productId}`);
      await product.update(this.fieldsValues);
    } else {
      const product = this.afs.collection<ProductModel>('products');
      await product.add(this.fieldsValues as ProductModel).then(() => true);
    }

    this.resetForm();
  }

  private updateProductCategories(): void {
    if (this.product.category === this.fieldsValues.category) {
      return;
    }

    const productCategories = this.afs.doc<CategoriesModel>(
      `categories/products`
    );

    productCategories
      .valueChanges()
      .pipe(takeUntil(this.$destroyed))
      .subscribe(async (productCategoriesData) => {
        const category =
          this.fieldsValues.category.charAt(0).toUpperCase() +
          this.fieldsValues.category.slice(1);

        if (
          productCategoriesData &&
          productCategoriesData.categories.indexOf(
            this.fieldsValues.category
          ) === -1
        ) {
          productCategoriesData.categories.push(category);
          await productCategories.update(productCategoriesData);
        } else if (!productCategoriesData) {
          await productCategories
            .set({ categories: [category] })
            .then(() => true);
        }
      });
  }
}
