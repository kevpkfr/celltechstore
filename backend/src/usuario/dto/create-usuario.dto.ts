import { IsEmail, MaxLength } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateUsuarioDto {

  @IsNotBlank({ message: 'el nombre de usuario no puede estar vacío' })
  @MaxLength(20, { message: 'nombre de usuario: longitud máxima de 20' })
  nombreUsuario: string;

  @IsEmail()
  email: string;

  @IsNotBlank({ message: 'La contraseña no puede estar vacia'})
  password: string;

}
