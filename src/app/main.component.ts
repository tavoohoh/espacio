import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';

import { GlobalsService } from './services/globals.service';
import {
  ActivatedRoute,
  ActivationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { StoreModel } from './_models';
import { ComponentBaseClass } from './_classes';
import { PageConstant } from './_constants';
import { environment } from '../environments/environment';

@Component({
  template: `
    <div class="es-main">
      <app-sidebar></app-sidebar>
      <app-header></app-header>
      <div class="es-main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
    <app-modal></app-modal>
  `,
  styleUrls: ['./main.component.sass'],
})
export class MainComponent extends ComponentBaseClass {
  constructor(
    private globalsService: GlobalsService,
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {
    super();
  }

  init() {
    this.setCurrentPage();
    this.setStore();
  }

  private setCurrentPage(): void {
    if (this.route.firstChild) {
      this.route.firstChild.data.subscribe(
        (data) =>
          (this.globalsService.currentPage.value = PageConstant[data.routeName])
      );
    } else {
      this.globalsService.currentPage.value = null;
    }

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof ActivationStart) {
        if (PageConstant[event.snapshot.data.routeName]) {
          this.globalsService.currentPage.value =
            PageConstant[event.snapshot.data.routeName];
        }
      }
    });
  }

  private setStore(): void {
    const store = this.afs.doc<StoreModel>(
      `store/${environment.appConfig.storeApiKey}`
    );

    store
      .valueChanges()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((storeData) => {
        this.globalsService.store.value = new StoreModel(storeData);
      });
  }
}
