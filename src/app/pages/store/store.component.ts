import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';

import { ComponentFormBaseClass } from '../../_classes';
import { GlobalsService } from '../../services/globals.service';
import { StoreModel } from '../../_models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass'],
})
export class StoreComponent extends ComponentFormBaseClass {
  private store: StoreModel;

  constructor(
    private globalsService: GlobalsService,
    public formBuilder: FormBuilder,
    private afs: AngularFirestore
  ) {
    super(formBuilder);
  }

  init(): void {
    this.getStore();
  }

  public setFields(): { [key: string]: any } {
    const fields = {};

    for (const prop in this.store) {
      if (
        this.store.hasOwnProperty(prop) &&
        prop !== 'abbreviation' &&
        prop !== 'imageUrl'
      ) {
        let fieldConfig;
        const notRequiredFields = [
          'instagram',
          'facebook',
          'youtube',
          'twitter',
        ];

        if (prop === 'email') {
          fieldConfig = [
            this.store[prop],
            [Validators.required, Validators.email],
          ];
        } else if (notRequiredFields.includes(prop)) {
          fieldConfig = [this.store[prop]];
        } else {
          fieldConfig = [this.store[prop], Validators.required];
        }

        fields[prop] = fieldConfig;
      }
    }

    return fields;
  }

  private getStore(): void {
    this.globalsService.store
      .observe()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((storeData) => {
        if (storeData) {
          this.store = storeData;
          this.setForm();
        }
      });
  }

  public async submit(): Promise<void> {
    super.submit();

    const store = this.afs.doc<StoreModel>(
      `store/${environment.appConfig.storeApiKey}`
    );
    await store.update(this.fieldsValues);
  }
}
