import { ICicloPago, IPlanComunidad } from '@repo/types';

export class CicloPago implements ICicloPago {
  public id_ciclo_pago: string;
  public frecuencia: number;
  public tipo_frecuencia: string;
  public plan_comunidad?: IPlanComunidad[];

  public constructor(partial: Partial<CicloPago>) {
    Object.assign(this, partial);
  }
}
