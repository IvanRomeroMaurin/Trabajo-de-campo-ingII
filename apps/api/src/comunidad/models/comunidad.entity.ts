import {
  IComunidad,
  ICategoriaComunidad,
  ICurso,
  IMiembroComunidad,
  IPlanComunidad,
} from '@repo/types';
import { ApiProperty } from '@nestjs/swagger';

export class Comunidad implements IComunidad {
  @ApiProperty({ description: 'ID único de la comunidad' })
  public id_comunidad: string;
  @ApiProperty({ description: 'Nombre de la comunidad' })
  public nombre: string;
  @ApiProperty({ description: 'Slug único para la URL' })
  public slug: string;
  @ApiProperty({ description: 'URL de la imagen de portada', required: false })
  public portada_url?: string | null;
  @ApiProperty({ description: 'Indica si la comunidad está activa' })
  public activa: boolean;
  @ApiProperty({ description: 'Fecha de creación' })
  public fecha_creacion: string | Date;
  @ApiProperty({ description: 'Descripción de la comunidad', required: false })
  public descripcion?: string | null;
  @ApiProperty({ description: 'ID de la categoría' })
  public id_categoria_comunidad: string;
  public categoria_comunidad?: ICategoriaComunidad;
  public curso?: ICurso[];
  public miembro_comunidad?: IMiembroComunidad[];
  public plan_comunidad?: IPlanComunidad[];

  public constructor(partial: Partial<Comunidad>) {
    Object.assign(this, partial);
  }
}
