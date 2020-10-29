import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BaseComponentModel } from '../../_models/base-component.model';
import { GlobalsService } from '../../services/globals.service';
import { StoreModel } from '../../_models';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass'],
})
export class StoreComponent extends BaseComponentModel {
  public form: FormGroup;
  public submitted: boolean = true;
  public fieldsNames: Array<{
    model: string;
    text: string;
    isTextarea: boolean;
  }> = [];

  constructor(
    private globalsService: GlobalsService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  init(): void {
    this.getStore();
  }

  get formControls() {
    return this.form.controls;
  }

  private setForm(store: StoreModel): void {
    const fields = {};

    for (const prop in store) {
      if (
        store.hasOwnProperty(prop) &&
        prop !== 'abbreviation' &&
        prop !== 'imageUrl'
      ) {
        let fieldConfig = [store[prop], Validators.required];

        if (prop === 'email') {
          fieldConfig = [store[prop], [Validators.required, Validators.email]];
        }

        this.fieldsNames.push({
          model: prop,
          text: prop.toUpperCase(),
          isTextarea: prop === 'description',
        });

        fields[prop] = fieldConfig;
      }
    }

    this.form = this.formBuilder.group(fields);
  }

  private getStore(): void {
    this.globalsService.store
      .observe()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((storeData) => {
        if (storeData) {
          this.setForm(storeData);
        }
      });
  }

  public submit(): void {}
}
