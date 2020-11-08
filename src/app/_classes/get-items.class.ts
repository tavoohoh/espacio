import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { ComponentBaseClass } from './component-base.class';
import { CategoriesModel, ProductModel, SectionModel } from '../_models';
import { GlobalsService } from '../services/globals.service';
import { ItemNameEnum } from '../_enums';
import { ItemComponentConfigEnum } from '../_constants';
import * as firebase from 'firebase';

export class GetItemsClass extends ComponentBaseClass {
  public categories: Array<string> = [];
  public activeCategory: string;
  public items: Array<ProductModel | SectionModel> = [];
  public categoryQuery$ = new Subject<string>();

  public componentConfig: {
    name: string;
    translateKey: string;
  };

  constructor(
    public afs: AngularFirestore,
    public globalsService: GlobalsService,
    public componentConfigName: ItemNameEnum
  ) {
    super();
  }

  init() {
    if (!this.componentConfigName) {
      console.error('Make sure to define `componentConfigName`');

      return;
    }

    this.componentConfig = ItemComponentConfigEnum[this.componentConfigName];

    this.getCategories();
    this.getItems();
    this.startFilters();
  }

  afterFetchItems(): void {}

  private startFilters(): void {
    this.filterByCategory(this.activeCategory);
  }

  private getItems(): void {
    const items = combineLatest([this.categoryQuery$]).pipe(
      switchMap(([category]) =>
        this.afs
          .collection<ProductModel | SectionModel>(
            this.componentConfig.name,
            (ref) => {
              let query:
                | firebase.firestore.CollectionReference
                | firebase.firestore.Query = ref;

              if (category) {
                query = query.where('category', '==', category);
              }

              return query;
            }
          )
          .snapshotChanges()
          .pipe(
            map((rawItems) => {
              return rawItems.map((item) => {
                const itemData = item.payload.doc.data();

                switch (this.componentConfig.name) {
                  case ItemComponentConfigEnum.products.name:
                    return new ProductModel(itemData, item.payload.doc.id);

                  case ItemComponentConfigEnum.sections.name:
                    return new SectionModel(itemData, item.payload.doc.id);
                }
              });
            })
          )
      )
    );

    items.pipe(takeUntil(this.$destroyed)).subscribe((ItemsData) => {
      this.items = ItemsData;
      this.afterFetchItems();

      if (this.activeCategory && this.items.length === 0) {
        this.deleteCategory();
      }
    });
  }

  private deleteCategory(): void {
    const categories = this.afs.doc<CategoriesModel>(
      `categories/${this.componentConfig.name}`
    );

    categories
      .valueChanges()
      .pipe(takeUntil(this.$destroyed))
      .subscribe(async (categoriesData) => {
        const newCategories = categoriesData.categories.filter(
          (e) => e !== this.activeCategory
        );

        await categories.set({ categories: newCategories }).then(() => true);

        this.startFilters();
      });
  }

  private getCategories(): void {
    const categories = this.afs.doc<CategoriesModel>(
      `categories/${this.componentConfig.name}`
    );

    categories
      .valueChanges()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((categoriesData) => {
        if (categoriesData) {
          this.categories = categoriesData.categories;
        }
      });
  }

  public filterByCategory(value: string): void {
    this.activeCategory = value === this.activeCategory ? null : value;
    this.categoryQuery$.next(this.activeCategory);
  }
}
