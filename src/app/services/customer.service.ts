import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  basket$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient, @Inject("API_URL") private API_URL: string) {
  }

  getBasket(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + 'basket').pipe(
      tap((products) => (this.basket$.next(products)))
    );
  }

  addProduct(product: Product): Observable<unknown> {
    return this.http.post(this.API_URL + 'basket', product).pipe(
      tap(() => this.basket$.next([...this.basket$.getValue(), product]))
    );
  }

  getTotal(): Observable<number> {
    return this.basket$.pipe(
      map(products => products.reduce((previous, next) => previous + next.price, 0))
    )

  }
}
