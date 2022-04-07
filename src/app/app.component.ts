import { Component } from '@angular/core';

import { Product } from './model/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  total = 0;

  products: Product[] = [
    {
      title: 'Sweat homme',
      description: '<C0D1NG_TH3_W0RLD> SWEATSHIRT CHAUD BIO À CAPUCHE - HOMME',
      photo: 'https://s3.eu-central-1.amazonaws.com/balibart-s3/Products/5acf344514006a7fe670e2eb/Mockups/front.png',
      price: 39,
      stock: 2
    },
    {
      title: 'Tee-Shirt homme',
      description: 'TEE-SHIRT BIO À COL ROND - HOMME',
      photo: 'https://s3.eu-central-1.amazonaws.com/balibart-s3/Products/5b2911e4ab33424aec592bd6/Mockups/front.png',
      price: 19,
      stock: 1
    },
    {
      title: 'Tee-Shirt femme',
      description: 'TEE-SHIRT BIO À COL ROND - FEMME',
      photo: 'https://s3.eu-central-1.amazonaws.com/balibart-s3/Products/5b290d26ab33424aec592bd4/Mockups/front.png',
      price: 19,
      stock: 3
    }
  ];

  constructor () {
    console.log("AppComponent init")
    setInterval(() => {
      console.log("tick")
    }, 500)
  }

  updatePrice(product: Product) {
    this.total += product.price;
    product.stock -=  1
  }

  isAvailable (product: Product) {
    console.log("AppComponent check isAvailable :", product)
    return product.stock > 0
  }
}
