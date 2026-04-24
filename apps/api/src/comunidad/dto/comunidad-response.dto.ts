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
    Object.assign(dto, entity);
    return dto;
  }
}
