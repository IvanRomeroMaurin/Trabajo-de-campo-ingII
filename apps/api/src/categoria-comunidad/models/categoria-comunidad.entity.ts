import { ICategoriaComunidad, IComunidad } from '@repo/types';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriaComunidad implements ICategoriaComunidad {
  @ApiProperty()
  public id_categoria_comunidad: string;
  @ApiProperty()
  public descripcion: string;
  @ApiProperty()
  public activa: boolean;
  public comunidad?: IComunidad[];

  public constructor(partial: Partial<CategoriaComunidad>) {
    Object.assign(this, partial);
  }
}
