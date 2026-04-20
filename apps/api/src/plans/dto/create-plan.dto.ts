import {
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsNumber,
  IsPositive,
  IsInt,
  IsIn,
} from 'class-validator';
import type { ICreatePlanRequest } from '@repo/types';

export class CreatePlanDto implements ICreatePlanRequest {
  @IsNotEmpty()
  @MaxLength(100)
  titulo: string;

  @IsOptional()
  descripcion?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  precio: number;

  @IsInt()
  @IsPositive()
  frecuencia: number;

  @IsIn(['months', 'days'])
  tipo_frecuencia: 'months' | 'days';

  @IsIn(['ARS', 'USD'])
  moneda: 'ARS' | 'USD';

  @IsNotEmpty()
  id_comunidad: string;
}
