import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { PageModel } from '../../_models';
import { ComponentBaseClass } from '../../_classes';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent extends ComponentBaseClass implements OnInit {
  public currentPage: PageModel;

  constructor(private globalsService: GlobalsService) {
    super();
  }

  ngOnInit() {
    this.globalsService.currentPage
      .observe()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((currentPage) => (this.currentPage = currentPage));
  }
}
