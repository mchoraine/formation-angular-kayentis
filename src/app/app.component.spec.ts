import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Product } from './model/product';
import { ProductService } from './services/product.service'
import { CustomerService } from './services/customer.service'


const testProducts = [new Product('', '', '', 0, 0), new Product('', '', '', 0, 0)];
const welcomeMsg = 'test';

class ProductServiceMock {
  getProducts() {
    return testProducts;
  }
  isAvailable() {
    return true;
  }
  decreaseStock() {}
}

class CustomerServiceMock {
  getTotal() {
    return 42;
  }
  addProduct() {}
}


describe('AppComponent', () => {

  let customerService: CustomerService;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ProductService, useClass: ProductServiceMock },
        { provide: CustomerService, useClass: CustomerServiceMock },
        { provide: 'welcomeMsg', useValue: welcomeMsg },
      ],
    }).compileComponents();

    customerService = TestBed.inject(CustomerService);
    productService = TestBed.inject(ProductService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a total starting at 42', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.total).toEqual(42);
  });

  it('should have the title bound in the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    expect(compiled.querySelector('header').textContent).toContain(welcomeMsg);
  });

  it('should have the total bound in the header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    expect(compiled.querySelector('header').textContent).toContain(""+customerService.getTotal());
  });

  it('should bind each product component with its product', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
    const products = compiled.querySelectorAll('app-product');
    expect(products).toHaveLength(2)
    products.forEach((product: any, i) => {
      expect(product?.data).toBe(app.products[i]);
    });
  });

  it('should call addProduct and decreaseStock when updatePrice', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const product = testProducts[0];

    jest.spyOn(customerService, 'addProduct');
    jest.spyOn(productService, 'decreaseStock');

    app.updatePrice(product);
    expect(customerService.addProduct).toHaveBeenCalledWith(product);
    expect(productService.decreaseStock).toHaveBeenCalledWith(product);
  });

  it('should not display product with an empty stock',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      const compiled = fixture.debugElement.nativeElement;

      jest.spyOn(productService, 'isAvailable').mockImplementation(product => {
        return product !== testProducts[0];
      })

      fixture.detectChanges();
      const products = compiled.querySelectorAll('app-product');
      expect(products.length).toBe(1);
      expect(products[0].data).toBe(app.products[1]);
    })
  );
});
