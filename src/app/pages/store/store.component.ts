import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';

import { ComponentBaseClass } from '../../_classes';
import { GlobalsService } from '../../services/globals.service';
import { StoreModel } from '../../_models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass'],
})
export class StoreComponent extends ComponentBaseClass {
  public form: FormGroup;
  public submitted = false;
  private store: StoreModel;
  private fieldsValues = {};

  constructor(
    private globalsService: GlobalsService,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore
  ) {
    super();
  }

  init(): void {
    this.getStore();
  }

  destroy() {
    this.resetForm();
  }

  public resetForm(): void {
    this.form.reset(this.fieldsValues);
    this.submitted = false;
  }

  private setForm(): void {
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

    this.form = this.formBuilder.group(fields);
    this.fieldsValues = this.form.value;
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
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.fieldsValues = this.form.value;

    const store = this.afs.doc<StoreModel>(
      `store/${environment.appConfig.storeApiKey}`
    );
    await store.update(this.fieldsValues);
  }
}
