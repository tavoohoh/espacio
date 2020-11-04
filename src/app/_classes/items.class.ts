import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { ComponentBaseClass } from './component-base.class';
import { CategoriesModel, ProductModel, SectionModel } from '../_models';
import { GlobalsService } from '../services/globals.service';
import { ItemNameEnum, StyleEnum } from '../_enums';
import { ModalModel } from '../_models/modal.model';
import { ItemComponentConfigEnum } from '../_constants';
import * as firebase from 'firebase';

export class ItemsClass extends ComponentBaseClass {
  public categories: Array<string> = [];
  public activeCategory: string;
  public items: Array<ProductModel | SectionModel> = [];
  public categoryQuery$ = new Subject<string>();

  private componentConfig: {
    name: string;
    translateKey: string;
  };

  constructor(
    public afs: AngularFirestore,
    public globalsService: GlobalsService,
    private componentConfigName: ItemNameEnum
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

  /**
   * Delete item flow
   */
  public openDeleteItemModal(itemId: string): void {
    this.globalsService.modal.value = new ModalModel({
      title: `${this.componentConfig.translateKey}.DELETE.TITLE`,
      content: [
        `${this.componentConfig.translateKey}.DELETE.CONTENT.TEXT_1`,
        `${this.componentConfig.translateKey}.DELETE.CONTENT.TEXT_2`,
      ],
      btnConfirm: {
        text: 'GENERAL.DELETE',
        style: StyleEnum.danger,
      },
      context: { itemId },
    });

    const modalDestroyed$ = new Subject();

    this.globalsService.modal
      .observeModalResult()
      .pipe(takeUntil(modalDestroyed$))
      .subscribe(async (modalResultData) => {
        if (modalResultData && modalResultData.status) {
          if (modalResultData.status === 'confirmed') {
            await this.deleteItem(modalResultData.context.itemId);
          }

          modalDestroyed$.next(null);
          modalDestroyed$.complete();
        }
      });
  }

  private async deleteItem(itemId): Promise<void> {
    const item = this.afs.doc(`${this.componentConfig.name}/${itemId}`);
    await item.delete();
  }
}
