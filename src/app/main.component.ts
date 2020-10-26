import { Component, OnInit } from '@angular/core';
import { GlobalsService } from './services/globals.service';
import { BaseComponentModel } from './_models/base-component.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { PageConstant } from './_constants/page.constant';

@Component({
  template: `
    <div class="es-main">
      <app-sidebar></app-sidebar>
      <app-header></app-header>
      <div class="es-main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./main.component.sass'],
})
export class MainComponent extends BaseComponentModel implements OnInit {
  constructor(private globalsService: GlobalsService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.globalsService.currentPage.value = PageConstant[this.router.url];

    this.router.events
      .pipe(
        takeUntil(this.$destroyed),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(
        (event: NavigationEnd) =>
          (this.globalsService.currentPage.value =
            event && event.url ? PageConstant[event.url] : null)
      );
  }
}
