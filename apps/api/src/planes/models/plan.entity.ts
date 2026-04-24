import { IPlanComunidad, ICicloPago, IComunidad, IMoneda, ISuscripcion } from '@repo/types';
import { ApiProperty } from '@nestjs/swagger';

export class PlanComunidad implements IPlanComunidad {
  @ApiProperty()
  public id_plan_comunidad: string;
  @ApiProperty()
  public precio: number;
  @ApiProperty()
  public titulo: string;
  @ApiProperty({ required: false })
  public descripcion?: string | null;
  @ApiProperty()
  public activa: boolean;
  @ApiProperty({ required: false })
  public mp_preapproval_plan_id?: string | null;
  @ApiProperty()
  public fecha_creacion: string | Date;
  @ApiProperty({ required: false })
  public fecha_modificacion?: string | Date | null;
  @ApiProperty()
  public id_comunidad: string;
  @ApiProperty()
  public id_ciclo_pago: string;
  @ApiProperty()
  public id_moneda: string;
  public ciclo_pago?: ICicloPago;
  public comunidad?: IComunidad;
  public moneda?: IMoneda;
  public suscripcion?: ISuscripcion[];

  public constructor(partial: Partial<PlanComunidad>) {
    Object.assign(this, partial);
  }
}
