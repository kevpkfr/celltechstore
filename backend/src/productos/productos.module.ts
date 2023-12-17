import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosEntity } from './productos.entity';
import { OrdersProducts } from 'src/order/entities/orders-products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductosEntity,OrdersProducts  ])],
  providers: [ProductosService],
  controllers: [ProductosController],
  exports: [ProductosService]
})
export class ProductosModule {}
