import { Component, Inject, OnInit } from '@angular/core';

import { Product } from '../../model/product';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
  }

  updatePrice (product: Product) {
    this.customerService.addProduct(product).subscribe()
    this.productService.decreaseStock(product)
  }

  isAvailable (product: Product) {
    return this.productService.isAvailable(product)
  }
}
