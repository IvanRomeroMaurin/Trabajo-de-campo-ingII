import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ICreateCommunityRequest } from '@repo/types';

/**
 * DTO para la creación de una nueva comunidad.
 * El slug se generará automáticamente a partir del nombre en el servicio.
 */
export class CrearComunidadDto implements ICreateCommunityRequest {
  @ApiProperty({
    example: 'Comunidad de NestJS',
    description: 'Nombre de la comunidad',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la comunidad es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombre: string;

  @ApiProperty({
    example: 'Una comunidad para aprender NestJS',
    description: 'Descripción opcional',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID de la categoría',
  })
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @IsUUID('4', { message: 'El id_categoria_comunidad debe ser un UUID válido' })
  id_categoria_comunidad: string;

  @ApiProperty({
    example: 'https://ejemplo.com/imagen.jpg',
    description: 'URL de la imagen de portada',
    required: false,
  })
  @IsOptional()
  @IsString()
  portada_url?: string;
}
