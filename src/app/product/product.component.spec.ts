import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service'

const testProduct = new Product('title', 'description', 'photo', 42, 1);

class ProductServiceMock {
  isTheLast = jest.fn()
}

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [{ provide: ProductService, useClass: ProductServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    productService = TestBed.inject(ProductService);
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.data = testProduct;
    fixture.detectChanges();
  });

  it('should bind title and price in the h3', () => {
    const h3Content = (fixture.nativeElement as HTMLElement).querySelector('h3')?.textContent;
    expect(h3Content).toContain(`${testProduct.title} - ${testProduct.price}`);
  });

  it('should bind the photo url', () => {
    const img = (fixture.nativeElement as HTMLElement).querySelector('img');
    expect(img?.src).toContain(testProduct.photo);
  });

  it('should emit addToBasket event on a click on the button', () => {
    jest.spyOn(component.addToBasket, 'emit');
    const button = (fixture.nativeElement as HTMLElement).querySelector('button');
    button?.click();
    expect(component.addToBasket.emit).toHaveBeenCalledWith(testProduct);
  });

  it('should not add "last" class if stock > 1', () => {
    jest.spyOn(productService, 'isTheLast').mockReturnValue(false);
    component.data.stock = 2;
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.card');
    expect(card.classList).not.toContain('last');
  });

  it('should add "last" class if stock == 1', () => {
    jest.spyOn(productService, 'isTheLast').mockReturnValue(true);
    component.data.stock = 1;
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.card');
    expect(card.classList).toContain('last');
  });
});
