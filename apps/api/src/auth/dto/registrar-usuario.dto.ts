import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Objeto de Transferencia de Datos (DTO) para el Registro de Usuario.
 * Contiene todas las validaciones previas necesarias para garantizar que no se intenten guardar
 * datos malintencionados o incompletos en la base de datos de Postgres.
 */
export class RegistrarUsuarioDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  nombre: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString()
  apellido: string;

  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
