import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * DTO para la creación de un nuevo plan de suscripción.
 * Contiene los datos validados necesarios para registrar el plan en BD y MP.
 */
export class CrearPlanDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @IsNumber()
  @IsNotEmpty()
  frecuencia: number;

  @IsString()
  @IsNotEmpty()
  tipo_frecuencia: string;

  @IsString()
  @IsNotEmpty()
  moneda: string;

  @IsString()
  @IsNotEmpty()
  id_comunidad: string;
}
