import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SidebarMenuConstant } from '../../_constants/sidebar-menu.constant';
import { StoreModel } from '../../_models';
import { ButtonEmum } from '../../_enums';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  public readonly appVersion = environment.version;
  public readonly menu = SidebarMenuConstant;
  public store = new StoreModel({
    name: 'Sinpote',
    address: 'Address 10-135',
    email: 'hi@sinpote.com',
    currencySymbol: '$',
    website: 'www.sinpote.com',
    category: 'Commerce',
  });

  public buttonType = ButtonEmum;

  constructor() {}

  ngOnInit(): void {}
}
