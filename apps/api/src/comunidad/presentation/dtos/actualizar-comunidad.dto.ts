import { IsString, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUpdateCommunityRequest } from '@repo/types';

/**
 * DTO para la actualización parcial de una comunidad.
 * Todos los campos son opcionales.
 */
export class ActualizarComunidadDto implements IUpdateCommunityRequest {
  @ApiProperty({
    example: 'Comunidad Actualizada',
    description: 'Nuevo nombre de la comunidad',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombre?: string;

  @ApiProperty({
    example: 'Nueva descripción de la comunidad',
    description: 'Nueva descripción opcional',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID de la nueva categoría',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'El id_categoria_comunidad debe ser un UUID válido' })
  id_categoria_comunidad?: string;

  @ApiProperty({
    example: 'https://ejemplo.com/nueva-portada.jpg',
    description: 'Nueva URL de la imagen de portada',
    required: false,
  })
  @IsOptional()
  @IsString()
  portada_url?: string;
}
