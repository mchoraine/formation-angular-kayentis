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
  constructor (private customerService: CustomerService) {
  }

  ngOnInit () {
    this.customerService.getBasket().subscribe()
  }
}
