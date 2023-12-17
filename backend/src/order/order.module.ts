import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './entities/order.entity';
import { OrdersProducts } from './entities/orders-products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from '../productos/productos.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrdersProducts]),
    ProductosModule,
    UsuarioModule,    
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
