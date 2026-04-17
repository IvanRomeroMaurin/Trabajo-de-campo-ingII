import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IIniciarSesion } from '@repo/types';

/**
 * Objeto de Transferencia de Datos (DTO) para Iniciar Sesión.
 * Define las reglas estrictas de lo que el cliente debe enviar en su petición POST al intentar loguearse.
 * El motor "Class Validator" rechazará automáticamente la solicitud si el email es inválido o no hay clave.
 */
export class IniciarSesionDto implements IIniciarSesion {
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}
