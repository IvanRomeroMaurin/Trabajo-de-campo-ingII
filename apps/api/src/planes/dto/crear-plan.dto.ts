import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

import { ICreatePlanRequest } from '@repo/types';

/**
 * DTO para la creación de un nuevo plan de suscripción.
 * Contiene los datos validados necesarios para registrar el plan en BD y MP.
 */
export class CrearPlanDto implements ICreatePlanRequest {
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  descripcion?: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  precio: number;

  @IsNumber({}, { message: 'La frecuencia debe ser un número' })
  @IsNotEmpty({ message: 'La frecuencia es obligatoria' })
  frecuencia: number;

  @IsString({ message: 'El tipo de frecuencia debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de frecuencia es obligatorio' })
  tipo_frecuencia: 'months' | 'days';

  @IsString({ message: 'La moneda debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La moneda es obligatoria' })
  moneda: 'ARS' | 'USD';

  @IsUUID('4', { message: 'El ID de la comunidad debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID de la comunidad es obligatorio' })
  id_comunidad: string;
}
