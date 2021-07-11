import {
  Controller,
  All,
  Query,
  Param,
  Req,
  Get,
  Headers,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('product')
export class ProductController {
  constructor(private readonly appService: AppService) {}

  @All('products')
  getProducts(@Query() query, @Param() param, @Headers() headers): string {
    console.log('!!query, param, headers', query, param, headers);
    return this.appService.getProducts();
  }
}
