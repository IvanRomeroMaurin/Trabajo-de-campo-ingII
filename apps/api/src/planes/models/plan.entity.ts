import { IPlanComunidad, ICicloPago, IComunidad, IMoneda, ISuscripcion } from '@repo/types';

export class PlanComunidad implements IPlanComunidad {
  public id_plan_comunidad: string;
  public precio: number;
  public titulo: string;
  public descripcion?: string | null;
  public activa: boolean;
  public mp_preapproval_plan_id?: string | null;
  public fecha_creacion: string | Date;
  public fecha_modificacion?: string | Date | null;
  public id_comunidad: string;
  public id_ciclo_pago: string;
  public id_moneda: string;
  public ciclo_pago?: ICicloPago;
  public comunidad?: IComunidad;
  public moneda?: IMoneda;
  public suscripcion?: ISuscripcion[];

  public constructor(partial: Partial<PlanComunidad>) {
    Object.assign(this, partial);
  }
}
