import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * DTO para la creación de un nuevo plan de suscripción.
 * Contiene los datos validados necesarios para registrar el plan en BD y MP.
 */
export class CrearPlanDto {
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
  tipo_frecuencia: string;

  @IsString({ message: 'La moneda debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La moneda es obligatoria' })
  moneda: string;

  @IsString({ message: 'El ID de la comunidad debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El ID de la comunidad es obligatorio' })
  id_comunidad: string;
}
