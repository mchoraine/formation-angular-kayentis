import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../model/product';
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Output()
  addToBasket = new EventEmitter<Product>();

  @Input()
  data!: Product;

  constructor (private productService: ProductService) {
  }
  addToBasketClick() {
    this.addToBasket.emit(this.data);
  }

  isLast () {
    return this.productService.isTheLast(this.data)
  }
}
