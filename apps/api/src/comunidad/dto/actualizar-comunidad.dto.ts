import { IsString, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { IUpdateCommunityRequest } from '@repo/types';

/**
 * DTO para la actualización parcial de una comunidad.
 * Todos los campos son opcionales.
 */
export class ActualizarComunidadDto implements IUpdateCommunityRequest {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsUUID('4', { message: 'El id_categoria_comunidad debe ser un UUID válido' })
  id_categoria_comunidad?: string;

  @IsOptional()
  @IsString()
  portada_url?: string;
}
