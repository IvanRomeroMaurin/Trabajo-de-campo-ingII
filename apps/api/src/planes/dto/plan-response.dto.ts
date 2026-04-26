import { ApiProperty } from '@nestjs/swagger';
import { PlanComunidad } from '../models/plan.entity';

export class PlanResponseDto {
  @ApiProperty() id_plan_comunidad: string;
  @ApiProperty() precio: number;
  @ApiProperty() titulo: string;
  @ApiProperty() activa: boolean;
  @ApiProperty() fecha_creacion: Date;
  @ApiProperty() id_comunidad: string;
  @ApiProperty() id_ciclo_pago: string;
  @ApiProperty() id_moneda: string;
  @ApiProperty({ required: false }) descripcion?: string | null;

  public static fromEntity(entity: PlanComunidad): PlanResponseDto {
    const dto = new PlanResponseDto();
    dto.id_plan_comunidad = entity.id_plan_comunidad;
    dto.precio = entity.precio;
    dto.titulo = entity.titulo;
    dto.activa = entity.activa;
    dto.fecha_creacion = entity.fecha_creacion;
    dto.id_comunidad = entity.id_comunidad;
    dto.id_ciclo_pago = entity.id_ciclo_pago;
    dto.id_moneda = entity.id_moneda;
    dto.descripcion = entity.descripcion;
    return dto;
  }
}
