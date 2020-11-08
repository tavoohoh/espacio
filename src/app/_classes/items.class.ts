import { AngularFirestore } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GetItemsClass } from './get-items.class';
import { GlobalsService } from '../services/globals.service';
import { ItemNameEnum, StyleEnum } from '../_enums';
import { ModalModel } from '../_models/modal.model';

export class ItemsClass extends GetItemsClass {
  constructor(
    public afs: AngularFirestore,
    public globalsService: GlobalsService,
    public componentConfigName: ItemNameEnum
  ) {
    super(afs, globalsService, componentConfigName);
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
