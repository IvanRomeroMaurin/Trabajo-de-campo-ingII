import {
  IPlanComunidad,
  ICicloPago,
  IComunidad,
  IMoneda,
  ISuscripcion,
} from '@repo/types';
export class PlanComunidad implements IPlanComunidad {
  public constructor(
    public readonly id_plan_comunidad: string,
    public readonly precio: number,
    public readonly titulo: string,
    public readonly activa: boolean,
    public readonly fecha_creacion: string | Date,
    public readonly id_comunidad: string,
    public readonly id_ciclo_pago: string,
    public readonly id_moneda: string,
    public readonly descripcion?: string | null,
    public readonly mp_preapproval_plan_id?: string | null,
    public readonly fecha_modificacion?: string | Date | null,
    public readonly ciclo_pago?: ICicloPago,
    public readonly comunidad?: IComunidad,
    public readonly moneda?: IMoneda,
    public readonly suscripcion?: ISuscripcion[],
  ) {}
}

