import { Component, Inject, OnInit } from '@angular/core';

import { Product } from './model/product';
import { ProductService } from './services/product.service'
import { CustomerService } from './services/customer.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products$!: Observable<Product[]>
  sortKey: keyof Product = "title"
  total$!: Observable<number>

  constructor (@Inject('welcomeMsg') public title: string,
               private productService: ProductService,
               private customerService: CustomerService) {
  }

  ngOnInit () {
    this.products$ = this.productService.getProducts();
    this.total$ = this.customerService.getTotal();
    this.customerService.getBasket().subscribe()
  }

  updatePrice (product: Product) {
    this.customerService.addProduct(product).subscribe()
    this.productService.decreaseStock(product)
  }

  isAvailable (product: Product) {
    return this.productService.isAvailable(product)
  }
}
