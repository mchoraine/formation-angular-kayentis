import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product("titre", "description", "photo", 0, 1)).toBeTruthy();
  });
});
