import { EntityRepository, Repository } from 'typeorm';
import { ProductosEntity } from './productos.entity';

@EntityRepository(ProductosEntity)
export class ProductosRepository extends Repository<ProductosEntity> {}
