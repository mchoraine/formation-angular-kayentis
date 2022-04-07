import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../model/product';

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

  addToBasketClick() {
    this.addToBasket.emit(this.data);
  }

  isLast () {
    return this.data.stock === 1
  }
}
