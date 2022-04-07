import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service'

@NgModule({
  declarations: [AppComponent, MenuComponent, ProductComponent],
  imports: [BrowserModule],
  providers: [
    ProductService,
    { provide: 'welcomeMsg', useValue: 'Welcome to Zenika Ecommerces' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
