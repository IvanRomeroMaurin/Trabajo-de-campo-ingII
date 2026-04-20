import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para la creación de una nueva comunidad.
 * El slug se generará automáticamente a partir del nombre en el servicio.
 */
export class CrearComunidadDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la comunidad es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @IsInt({ message: 'El id_categoria_comunidad debe ser un número entero' })
  @Type(() => Number)
  id_categoria_comunidad: number;

  @IsOptional()
  @IsString()
  portada_url?: string;
}
