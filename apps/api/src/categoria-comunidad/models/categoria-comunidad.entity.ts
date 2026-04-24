import { ICategoriaComunidad, IComunidad } from '@repo/types';

export class CategoriaComunidad implements ICategoriaComunidad {
  public constructor(
    public readonly id_categoria_comunidad: string,
    public readonly descripcion: string,
    public readonly activa: boolean,
    public readonly comunidad?: IComunidad[],
  ) {}
}

