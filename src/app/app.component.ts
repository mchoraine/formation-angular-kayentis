import { Component, Inject } from '@angular/core';

import { Product } from './model/product';
import { ProductService } from './services/product.service'
import { CustomerService } from './services/customer.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  products: Promise<Product[]> = this.productService.getProducts();
  sortKey: keyof Product = "title"

  constructor (@Inject('welcomeMsg') public title: string,
               private productService: ProductService,
               private customerService: CustomerService) {

  }

  get total() {
    return this.customerService.getTotal()
  }

  updatePrice(product: Product) {
    this.customerService.addProduct(product)
    this.productService.decreaseStock(product)
  }

  isAvailable (product: Product) {
    return this.productService.isAvailable(product)
  }
}
