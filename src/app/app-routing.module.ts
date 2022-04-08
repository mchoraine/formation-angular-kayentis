import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketGuard } from './guards/basket.guard'

const routes: Routes = [
  { path: 'home', loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule) },
  { path: 'product/:id', loadChildren: () => import("./pages/product-detail/product-detail.module").then(m => m.ProductDetailModule) },
  { path: 'basket', canActivate: [BasketGuard], loadChildren: () => import("./pages/basket/basket.module").then(m => m.BasketModule) },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
