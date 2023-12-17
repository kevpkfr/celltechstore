import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolNombre } from 'src/rol/rol.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';
import { ProductoDto } from './dto/producto.dto';

@Controller('productos')
export class ProductosController {

    constructor(private readonly productoService: ProductosService) {}

  @Get()
  async getAll() {
    return await this.productoService.getAll();
  }

  @RolDecorator(RolNombre.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.productoService.findById(id);
  }

  @RolDecorator(RolNombre.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: ProductoDto) {
    return await this.productoService.create(dto);
  }

  @RolDecorator(RolNombre.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: ProductoDto,
  ) {
    return await this.productoService.update(id, dto);
  }

  @RolDecorator(RolNombre.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productoService.delete(id);
  }



}
