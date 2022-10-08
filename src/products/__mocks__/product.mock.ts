import { Product } from '../entities/product.entity';

export class ProductMock {
  productMock: Product;
  constructor() {
    this.productMock = new Product();
    this.productMock.id = 1;
    this.productMock.description = 'test-description';
    this.productMock.title = 'title-description';
    this.productMock.price = '1';
  }
}
