import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SidebarMenuConstant } from '../../_constants/sidebar-menu.constant';
import { StoreModel } from '../../_models';
import { takeUntil } from 'rxjs/operators';
import { GlobalsService } from '../../services/globals.service';
import { ComponentBaseClass } from '../../_classes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent extends ComponentBaseClass {
  public readonly appVersion = environment.version;
  public readonly menu = SidebarMenuConstant;
  public store: StoreModel;
  public orderQuantity: { quantity: string } = { quantity: '0' };

  constructor(private globalsService: GlobalsService) {
    super();
  }

  init(): void {
    this.globalsService.store
      .observe()
      .pipe(takeUntil(this.$destroyed))
      .subscribe((store) => (this.store = store));
  }
}
