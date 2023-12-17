import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { OrdersProducts } from "./orders-products.entity";

@Entity({ name: 'order' })
export class OrderEntity {
  
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 50 })
    adress: string;
  
    @Column('decimal', {
      precision: 8,
      scale: 2,
    })
    price: number;
  
    @Column({ length: 25 })
    date: string;
  
    @Column({ length: 50 })
    status: string;
  
    @Column({ nullable: true })
    stripeId: string;
  
    @ManyToOne(() => UsuarioEntity, (user: UsuarioEntity) => user.orders)
    user: UsuarioEntity;
  
    @Column()
    userId: string;
  
    @OneToMany(
      () => OrdersProducts,
      (OrdersProducts: OrdersProducts) => OrdersProducts.order,
    )
    OrdersProducts: OrdersProducts[];
}
