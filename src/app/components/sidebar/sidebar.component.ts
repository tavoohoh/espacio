import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import {SidebarMenuConstant} from '../../_constants/sidebar-menu.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  public readonly appVersion = environment.version;
  public readonly menu = SidebarMenuConstant;

  constructor() { }

  ngOnInit(): void {
  }

}
