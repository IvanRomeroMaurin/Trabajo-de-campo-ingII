import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreatePlanRequest } from '@repo/types';

/**
 * DTO para la creación de un nuevo plan de suscripción.
 * Contiene los datos validados necesarios para registrar el plan en BD y MP.
 */
export class CrearPlanDto implements ICreatePlanRequest {
  @ApiProperty({
    example: 'Plan Pro',
    description: 'Título del plan de suscripción',
  })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @ApiProperty({
    example: 'Acceso a contenido exclusivo y mentorías',
    description: 'Descripción de los beneficios del plan',
    required: false,
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    example: 5000,
    description: 'Precio de la suscripción',
  })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  precio: number;

  @ApiProperty({
    example: 1,
    description: 'Valor numérico de la frecuencia (ej: 1)',
  })
  @IsNumber({}, { message: 'La frecuencia debe ser un número' })
  @IsNotEmpty({ message: 'La frecuencia es obligatoria' })
  frecuencia: number;

  @ApiProperty({
    example: 'months',
    enum: ['months', 'days'],
    description: 'Unidad de tiempo para la frecuencia',
  })
  @IsString({ message: 'El tipo de frecuencia debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de frecuencia es obligatorio' })
  tipo_frecuencia: 'months' | 'days';

  @ApiProperty({
    example: 'ARS',
    enum: ['ARS', 'USD'],
    description: 'Moneda del plan',
  })
  @IsString({ message: 'La moneda debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La moneda es obligatoria' })
  moneda: 'ARS' | 'USD';

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID de la comunidad a la que pertenece el plan',
  })
  @IsUUID('4', { message: 'El ID de la comunidad debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID de la comunidad es obligatorio' })
  id_comunidad: string;
}
