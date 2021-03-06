import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './services/product.service'
import { SortPipe } from './pipes/sort.pipe'
import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule } from '@angular/forms'

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ProductService,
    { provide: 'welcomeMsg', useValue: 'Welcome to Zenika Ecommerces' },
    { provide: 'API_URL', useValue: 'http://localhost:8080/rest/' },
    { provide: LOCALE_ID, useValue: navigator.language }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
