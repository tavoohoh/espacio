import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { SectionFormComponent } from './pages/section-form/section-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'store',
        component: StoreComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/add',
        component: ProductFormComponent,
      },
      {
        path: 'products/edit/:productId',
        component: ProductFormComponent,
      },
      {
        path: 'sections',
        component: SectionsComponent,
      },
      {
        path: 'sections/add',
        component: SectionFormComponent,
      },
      {
        path: 'sections/edit/:sectionId',
        component: SectionFormComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
