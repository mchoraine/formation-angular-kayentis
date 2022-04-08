import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { Product } from '../model/product';
import { CustomerService } from './customer.service';
import { BehaviorSubject } from 'rxjs'

const product1 = new Product('', '', '', '', 42, 0);
const product2 = new Product('', '', '', '', 666, 0);

describe('CustomerService', () => {
  let service: CustomerService;
  let http: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerService,
        { provide: 'API_URL', useValue: 'http://localhost:8080/rest/' },
      ],
    }).compileComponents();
    service = TestBed.inject(CustomerService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created with no product', waitForAsync(() => {
    expect(service).toBeTruthy();
    service.basket$.subscribe(basket => {
      expect(basket.length).toBe(0);
    })
  }));

  it('should load the basket from the server on getBasket', waitForAsync(() => {
    const mockedResponse = [new Product('', 'abc', '', '', 0, 0), new Product('', 'def', '', '', 0, 0)];
    service.getBasket().subscribe(() => {
      service.basket$.subscribe(basket => {
        expect(basket.length).toBe(2);
      })
    });
    http.expectOne('http://localhost:8080/rest/basket').flush(mockedResponse);
  }));

  it('should add products to the list when using addProduct', waitForAsync(() => {
    service.addProduct(product1).subscribe(() => {
      service.basket$.subscribe(basket => {
        expect(basket).toEqual([product1]);
      })
    });
    http.expectOne('http://localhost:8080/rest/basket').flush({});
  }));

  it('should calculate the total price when using getTotal', waitForAsync(() => {
    service.basket$ = new BehaviorSubject([product1, product2]);
    service.getTotal().subscribe((total) => {
      expect(total).toBe(product1.price + product2.price);
    })
  }));
});
