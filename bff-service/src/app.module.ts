import { Module } from '@nestjs/common';
import { ProductController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [AppService],
})
export class AppModule {}
