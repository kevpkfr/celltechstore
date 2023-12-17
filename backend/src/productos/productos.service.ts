import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosEntity } from './productos.entity';
import { ProductosRepository } from './productos.repository';
import { MessageDto } from 'src/common/message.dto';
import { ProductoDto } from './dto/producto.dto';

@Injectable()
export class ProductosService {

     constructor(
        @InjectRepository(ProductosEntity)
        private productoRepository: ProductosRepository,
      ) {}

      async getAll(): Promise<ProductosEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
          throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
      }

      async findById(id: string): Promise<ProductosEntity> {
        const producto = await this.productoRepository.findOne({
          where: { id: id },
        });
        if (!producto) {
          throw new NotFoundException(new MessageDto('no existe'));
        }
        return producto;
      }

      async create(dto: ProductoDto): Promise<any> {
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return new MessageDto(`producto ${producto.nombre} creado`);
      }

      async findManyByIds(arrayOfIds: Array<string>) {
        const products = await this.productoRepository
          .createQueryBuilder()
          .where('id IN(:...arrayOfIds)', { arrayOfIds })
          .getMany();
    
        return products;
      }
      

      async update(id: string, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(id);
        if (!producto) {
          throw new NotFoundException(new MessageDto('El producto no existe'));
        }
      
        // Verificar si ya existe un producto con el mismo nombre
        const productoExistente = await this.productoRepository.findOne({
          where: { nombre: dto.nombre },
        });
        if (productoExistente && productoExistente.id !== id) {
          throw new BadRequestException(new MessageDto('Ya existe un producto con ese nombre'));
        }
      
        // Actualizar el producto
        producto.nombre = dto.nombre ?? producto.nombre;
        producto.precio = dto.precio ?? producto.precio;
        producto.descripcion = dto.descripcion ?? producto.descripcion;
      
        try {
          await this.productoRepository.save(producto);
          return new MessageDto(`El producto ${producto.nombre} ha sido actualizado`);
        } catch (error) {
          throw new InternalServerErrorException(new MessageDto('Ocurrió un error al actualizar el producto'));
        }
      }

      async delete(id: string): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto.id);
        return new MessageDto(`producto ${producto.nombre} eliminado`);
      }
}
