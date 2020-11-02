import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inject } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { SectionModel, ProductModel, CategoriesModel } from '../_models';
import { ComponentFormBaseClass } from './component-form-base.class';
import { GlobalsService } from '../services/globals.service';
import { ItemComponentConfigEnum } from '../_constants';
import { ItemNameEnum } from '../_enums';

export class ItemFormClass extends ComponentFormBaseClass {
  private item: ProductModel | SectionModel;
  private itemId: string;

  constructor(
    @Inject(GlobalsService) public globalsService: GlobalsService,
    @Inject(FormBuilder) public formBuilder: FormBuilder,
    @Inject(AngularFirestore) public afs: AngularFirestore,
    @Inject(ActivatedRoute) public route: ActivatedRoute,
    @Inject(Router) public router: Router,
    public componentConfigName: ItemNameEnum
  ) {
    super(formBuilder);
  }

  init(): void {
    if (!this.componentConfigName) {
      console.error('Make sure to define `componentConfigName`');

      return;
    }

    switch (this.componentConfigName) {
      case ItemComponentConfigEnum.products.name:
        this.item = new ProductModel({
          name: '',
          category: '',
          price: null,
          quantity: null,
          description: '',
          imageUrl: '',
        });
        break;
      case ItemComponentConfigEnum.sections.name:
        this.item = new SectionModel({
          name: '',
          category: '',
          description: '',
          imageUrl: '',
        });
    }

    this.itemId = this.route.snapshot.paramMap.get('itemId');

    if (this.itemId) {
      this.getItem();
    } else {
      this.setForm();
    }
  }

  setFields(): { [key: string]: any } {
    const fields = {};

    for (const prop in this.item) {
      if (this.item.hasOwnProperty(prop)) {
        if (prop === 'imageUrl') {
          fields[prop] = [this.item[prop]];
        } else {
          fields[prop] = [this.item[prop], Validators.required];
        }
      }
    }

    return fields;
  }

  private getItem(): void {
    const item = this.afs.doc<ProductModel | SectionModel>(
      `${this.componentConfigName}/${this.itemId}`
    );

    item
      .valueChanges()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((itemData) => {
        if (itemData) {
          switch (this.componentConfigName) {
            case ItemComponentConfigEnum.products.name:
              this.item = new ProductModel(itemData);
              break;
            case ItemComponentConfigEnum.sections.name:
              this.item = new SectionModel(itemData);
              break;
          }
          this.setForm();
        } else {
          console.error(
            `The item was not found in ${this.componentConfigName}`
          );
        }
      });
  }

  public async submit(): Promise<void> {
    this.form.controls.category.patchValue(
      this.form.controls.category.value.charAt(0).toUpperCase() +
        this.form.controls.category.value.slice(1)
    );

    super.submit();

    if (this.form.invalid) {
      return;
    }

    this.updateCategories();

    if (this.itemId) {
      const item = this.afs.doc<ProductModel | SectionModel>(
        `${this.componentConfigName}/${this.itemId}`
      );
      await item.update(this.fieldsValues);
    } else {
      const items = this.afs.collection(this.componentConfigName);
      await items.add(this.fieldsValues as ProductModel | SectionModel);
    }

    this.navigateToParent();
  }

  private updateCategories(): void {
    if (this.item.category === this.fieldsValues.category) {
      return;
    }

    const categories = this.afs.doc<CategoriesModel>(
      `categories/${this.componentConfigName}`
    );

    categories
      .valueChanges()
      .pipe(takeUntil(this.$destroyed))
      .subscribe(async (categoriesData) => {
        if (
          categoriesData &&
          categoriesData.categories.indexOf(this.fieldsValues.category) === -1
        ) {
          categoriesData.categories.push(this.fieldsValues.category);
          await categories.update(categoriesData);
        } else if (!categoriesData) {
          await categories
            .set({ categories: [this.fieldsValues.categories] })
            .then(() => true);
        }
      });
  }

  public navigateToParent(): void {
    this.router.navigateByUrl(`/${this.componentConfigName}`).then(() => null);
  }
}
