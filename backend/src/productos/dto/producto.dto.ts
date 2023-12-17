import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class ProductoDto {

  @IsNotBlank({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsNumber()
  @IsNotEmpty() 
  precio: number;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion?: string;

}
