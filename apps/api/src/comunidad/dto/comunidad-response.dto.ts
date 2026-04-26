import { ApiProperty } from '@nestjs/swagger';
import { Comunidad } from '../models/comunidad.entity';

export class ComunidadResponseDto {
  @ApiProperty() id_comunidad: string;
  @ApiProperty() nombre: string;
  @ApiProperty() slug: string;
  @ApiProperty({ required: false }) portada_url?: string | null;
  @ApiProperty() activa: boolean;
  @ApiProperty() fecha_creacion: string | Date;
  @ApiProperty({ required: false }) descripcion?: string | null;
  @ApiProperty() id_categoria_comunidad: string;

  public static fromEntity(entity: Comunidad): ComunidadResponseDto {
    const dto = new ComunidadResponseDto();
    dto.id_comunidad = entity.id_comunidad;
    dto.nombre = entity.nombre;
    dto.slug = entity.slug;
    dto.activa = entity.activa;
    dto.fecha_creacion = entity.fecha_creacion;
    dto.descripcion = entity.descripcion;
    dto.portada_url = entity.portada_url;
    dto.id_categoria_comunidad = entity.id_categoria_comunidad;
    return dto;
  }
}
