import { ICicloPago, IPlanComunidad } from '@repo/types';

export class CicloPago implements ICicloPago {

  public constructor(
    public readonly id_ciclo_pago: string,
    public readonly frecuencia: number,
    public readonly tipo_frecuencia: string,
    public readonly plan_comunidad?: IPlanComunidad[],
  ) {}
}

