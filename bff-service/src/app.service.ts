import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProducts(): string {
    const URL =
      'https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/products';
    return 'product response';
  }

  cartRequest(): string {
    return 'cart response';
  }
}
