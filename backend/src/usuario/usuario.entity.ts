/* eslint-disable @typescript-eslint/no-unused-vars */
import { RolEntity } from './../rol/rol.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { OrderEntity } from 'src/order/entities/order.entity';


@Entity({ name: 'usuario' })
export class UsuarioEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  nombreUsuario: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.user)
  orders: OrderEntity[];

  @ManyToMany((type) => RolEntity, (rol) => rol.usuarios, { eager: true })
  @JoinTable({
    name: 'usuario_rol',
    joinColumn: { name: 'usuario_id' },
    inverseJoinColumn: { name: 'rol_id' },
  })
  roles: RolEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasword() {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }
}
