import { IsString, IsOptional, IsInt, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para la actualización parcial de una comunidad.
 * Todos los campos son opcionales.
 */
export class ActualizarComunidadDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsInt({ message: 'El id_categoria_comunidad debe ser un número entero' })
  @Type(() => Number)
  id_categoria_comunidad?: number;

  @IsOptional()
  @IsString()
  portada_url?: string;
}
