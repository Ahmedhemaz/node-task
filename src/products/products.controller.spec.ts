import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductMock } from './__mocks__/product.mock';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            save: jest.fn().mockResolvedValue(new ProductMock().productMock),
            find: jest.fn().mockResolvedValue([new ProductMock().productMock]),
            findOneBy: jest
              .fn()
              .mockResolvedValue(
                new Promise(() => new ProductMock().productMock),
              ),
            update: jest
              .fn()
              .mockResolvedValue([new ProductMock().productMock]),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
