import { ICicloPago, IPlanComunidad } from '@repo/types';
import { ApiProperty } from '@nestjs/swagger';

export class CicloPago implements ICicloPago {
  @ApiProperty()
  public id_ciclo_pago: string;
  @ApiProperty()
  public frecuencia: number;
  @ApiProperty()
  public tipo_frecuencia: string;
  public plan_comunidad?: IPlanComunidad[];

  public constructor(partial: Partial<CicloPago>) {
    Object.assign(this, partial);
  }
}
