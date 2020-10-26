import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// https://github.com/ngx-translate/core
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// https://github.com/angular/angularfire
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { firebaseConfig } from '../espacio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { CharFieldComponent } from './components/fields/char-field/char-field.component';
import { NumericFieldComponent } from './components/fields/numeric-field/numeric-field.component';
import { TextareaFieldComponent } from './components/fields/textarea-field/textarea-field.component';
import { ImageFieldComponent } from './components/fields/image-field/image-field.component';
import { DropdownFieldComponent } from './components/fields/dropdown-field/dropdown-field.component';
import { CategoryComponent } from './components/ui/category/category.component';
import { ProductsComponent } from './pages/products/products.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { PaginatorComponent } from './components/ui/paginator/paginator.component';
import { OrderComponent } from './components/ui/order/order.component';
import { OrderDetailComponent } from './components/ui/order-detail/order-detail.component';
import { ModalComponent } from './components/ui/modal/modal.component';
import { LoaderComponent } from './components/ui/loader/loader.component';
import { StoreComponent } from './pages/store/store.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { SectionAddComponent } from './pages/section-add/section-add.component';
import { MainComponent } from './main.component';
import { IconComponent } from './components/ui/icon/icon.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const COMPONENTS = [HeaderComponent, SidebarComponent];

const UI_COMPONENTS = [
  CategoryComponent,
  ProductsComponent,
  SectionsComponent,
  PaginatorComponent,
  OrderComponent,
  OrderDetailComponent,
  ModalComponent,
  ButtonComponent,
  LoaderComponent,
  IconComponent,
];

const FIELD_COMPONENTS = [
  CharFieldComponent,
  NumericFieldComponent,
  TextareaFieldComponent,
  ImageFieldComponent,
  DropdownFieldComponent,
];

const PAGES = [
  StoreComponent,
  ProductsComponent,
  ProductAddComponent,
  SectionsComponent,
  SectionAddComponent,
  OrdersComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ...COMPONENTS,
    ...UI_COMPONENTS,
    ...FIELD_COMPONENTS,
    ...PAGES,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
