
import { OrdersProducts } from 'src/order/entities/orders-products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'producto' })
export class ProductosEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, })
  nombre: string;

  @Column({ type: 'float', nullable: false })
  precio: number;

  @Column({ type: 'varchar', length: 200, nullable: false,})
  descripcion: string;

  @OneToMany(
    () => OrdersProducts,
    (OrdersProducts: OrdersProducts) => OrdersProducts.product,
  )
  OrdersProducts: OrdersProducts[];

}
