import { EntityRepository, Repository } from 'typeorm';
import { OrdersProducts } from '../entities/orders-products.entity';

@EntityRepository(OrdersProducts)
export class OrdersProductsRepository extends Repository<OrdersProducts> {}
