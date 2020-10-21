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
import { ProductComponent } from './components/ui/product/product.component';
import { SectionComponent } from './components/ui/section/section.component';
import { PaginatorComponent } from './components/ui/paginator/paginator.component';
import { OrderComponent } from './components/ui/order/order.component';
import { OrderDetailComponent } from './components/ui/order-detail/order-detail.component';
import { ModalComponent } from './components/ui/modal/modal.component';
import { LoaderComponent } from './components/ui/loader/loader.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const COMPONENTS = [
  HeaderComponent,
  SidebarComponent
];

const UI_COMPONENTS = [
  CategoryComponent,
  ProductComponent,
  SectionComponent,
  PaginatorComponent,
  OrderComponent,
  OrderDetailComponent,
  ModalComponent,
  ButtonComponent,
  LoaderComponent
];

const FIELD_COMPONENTS = [
  CharFieldComponent,
  NumericFieldComponent,
  TextareaFieldComponent,
  ImageFieldComponent,
  DropdownFieldComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...UI_COMPONENTS,
    ...FIELD_COMPONENTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
