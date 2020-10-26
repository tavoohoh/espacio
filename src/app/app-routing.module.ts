import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductComponent } from './components/ui/product/product.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { SectionAddComponent } from './pages/section-add/section-add.component';
import { OrderComponent } from './components/ui/order/order.component';

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
        component: ProductComponent,
      },
      {
        path: 'products/add',
        component: ProductAddComponent,
      },
      {
        path: 'sections',
        component: SectionsComponent,
      },
      {
        path: 'sections/add',
        component: SectionAddComponent,
      },
      {
        path: 'orders',
        component: OrderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
