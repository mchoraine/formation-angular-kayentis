import { Component, OnInit } from '@angular/core';

import { Product } from '../../model/product';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../model/customer'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket!: Product[];
  public checkoutForm!: FormGroup

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.checkoutForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      creditCard: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{3}-[0-9]{3}$/)])
    })
    this.customerService.getBasket().subscribe((products) => (this.basket = products));
  }

  checkout () {
    this.customerService.checkout(this.checkoutForm.value).subscribe()
  }

  get inputName(): AbstractControl {
    return this.checkoutForm.get('name')!!
  }

  get inputAddress(): AbstractControl {
    return this.checkoutForm.get('address')!!
  }

  get inputCreditCard(): AbstractControl {
    return this.checkoutForm.get('creditCard')!!
  }
}
