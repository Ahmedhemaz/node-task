import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductMock } from './__mocks__/product.mock';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
  it('should find a product', async () => {
    const mockedProduct = new ProductMock().productMock;
    expect(service.findOne(1)).resolves.toEqual(mockedProduct);
  });
  it('should find a product', async () => {
    const mockedProduct = new ProductMock().productMock;
    expect(service.findAll()).resolves.toEqual([mockedProduct]);
  });
  it('should create a product', async () => {
    const mockedProduct: Product = new ProductMock().productMock;
    const createProductDto: CreateProductDto = new CreateProductDto();
    createProductDto.description = mockedProduct.description;
    createProductDto.title = mockedProduct.title;
    createProductDto.price = mockedProduct.price;

    expect(service.create(createProductDto)).resolves.toEqual(mockedProduct);
  });
  it('should update a product', async () => {
    const mockedProduct: Product = new ProductMock().productMock;
    const updateProductDto: UpdateProductDto = new UpdateProductDto();
    updateProductDto.description = mockedProduct.description;
    updateProductDto.title = mockedProduct.title;
    updateProductDto.price = mockedProduct.price;

    expect(service.update(1, updateProductDto)).resolves.toEqual(mockedProduct);
  });
});
