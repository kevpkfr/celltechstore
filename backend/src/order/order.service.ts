import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, ProductDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersProducts } from './entities/orders-products.entity';

import { ProductosService } from 'src/productos/productos.service';
import { Status } from './enums/status.enum';
import { ProductosEntity } from 'src/productos/productos.entity';
import { MessageDto } from 'src/common/message.dto';
import { OrderRepository } from './repositorys/orders.repository';
import { OrdersProductsRepository } from './repositorys/orders-products.repository';


@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(OrdersProducts)
    private readonly ordersProductsRepository: OrdersProductsRepository,   
    private readonly productService: ProductosService,     
  ) {}

  async findAllByUserId(id: string) {
    const orders = await this.orderRepository.find({
      where: { user: { id: id } },
    });
    if (!orders) {
      throw new NotFoundException(`This user doesn't have any orders`);
    }
    return orders;
  } 

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const status = Status.NEEDS_CONFIRMATION;    
    const productsDto = createOrderDto.products;
    const productsIds = productsDto.map((current) => current.id);
    const productsMap = this.createProductQuantityMap(productsDto);
    const products = await this.productService.findManyByIds(productsIds);
    const price = await this.getTotalPrice(products, productsMap);   

    const order = await this.orderRepository.create({
      ...createOrderDto,
      userId,
      status,
      price,      
    });

    const savedOrder = await this.orderRepository.save(order);
    const ordersProducts = products.map((product) => ({
      orderId: savedOrder.id,
      productId: product.id,
      quantity: productsMap.get(product.id.toString()),
    }));

    await this.ordersProductsRepository.save(ordersProducts);

    return new MessageDto(`compra ${ordersProducts} creada`);
  }

  private createProductQuantityMap(productsDto: Array<ProductDto>) {
    const productsMap = new Map<string, number>(); //productId -> quantity

    for (const product of productsDto) {
      const { id, quantity } = product;

      productsMap.set(id, quantity);
    }

    return productsMap;
  }

  private async getTotalPrice(
    products: Array<ProductosEntity>,
    productsMap: Map<string, number>,
  ) {
    const price = products.reduce(
      (sum, current) => sum + +current.precio * productsMap.get(current.id.toString()),
      0,
    );

    return price;
  }

 async findAll() {
    const orders = await this.orderRepository.find();

    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({where:{id: id}});

    if (!order) {
      throw new NotFoundException(`Order under this id doesn't exist`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
    });

    if (!order) {
      throw new NotFoundException(`There is no order under id ${id}`);
    }

    return this.orderRepository.save(order);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    return this.orderRepository.remove(order);

}
}