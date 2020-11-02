import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { SectionFormComponent } from './pages/section-form/section-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RouteNamesEnums } from './_enums';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'store',
        component: StoreComponent,
        data: {
          routeName: RouteNamesEnums.STORE,
        },
      },
      {
        path: 'products',
        component: ProductsComponent,
        data: {
          routeName: RouteNamesEnums.PRODUCTS,
        },
      },
      {
        path: 'products/add',
        component: ProductFormComponent,
        data: {
          routeName: RouteNamesEnums.PRODUCT_ADD,
        },
      },
      {
        path: 'products/:itemId/edit',
        component: ProductFormComponent,
        data: {
          routeName: RouteNamesEnums.PRODUCT_EDIT,
        },
      },
      {
        path: 'sections',
        component: SectionsComponent,
        data: {
          routeName: RouteNamesEnums.SECTIONS,
        },
      },
      {
        path: 'sections/add',
        component: SectionFormComponent,
        data: {
          routeName: RouteNamesEnums.SECTION_ADD,
        },
      },
      {
        path: 'sections/:itemId/edit',
        component: SectionFormComponent,
        data: {
          routeName: RouteNamesEnums.SECTION_EDIT,
        },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: {
          routeName: RouteNamesEnums.ORDERS,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
