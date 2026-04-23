import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { ICreateCommunityRequest } from '@repo/types';

/**
 * DTO para la creación de una nueva comunidad.
 * El slug se generará automáticamente a partir del nombre en el servicio.
 */
export class CrearComunidadDto implements ICreateCommunityRequest {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la comunidad es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @IsUUID('4', { message: 'El id_categoria_comunidad debe ser un UUID válido' })
  id_categoria_comunidad: string;

  @IsOptional()
  @IsString()
  portada_url?: string;
}
