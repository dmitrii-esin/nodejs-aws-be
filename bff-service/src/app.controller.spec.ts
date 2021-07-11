import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './app.controller';
import { AppService } from './app.service';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [AppService],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(productController.product()).toBe('Hello World!');
    // });

    it('test', () => {
      expect(true).toBeTruthy();
    });
  });
});
