import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="es-main">
      <app-sidebar></app-sidebar>
      <app-header
        [title]="pageTitle"
        [description]="pageDescription"
        [action]="pageAction"
      ></app-header>
      <div class="es-main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  public pageTitle: string;
  public pageDescription: string;
  public pageAction: {
    text: string;
    id: string;
  };

  ngOnInit() {
    // TODO: change this values base on the page
    this.pageTitle = 'Products';
    this.pageDescription = 'Products description. Products description. Products description.';
    this.pageAction = {
      text: 'Add product',
      id: 'add-product'
    };
  }
}
