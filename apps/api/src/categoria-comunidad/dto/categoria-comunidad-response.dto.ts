import { ApiProperty } from '@nestjs/swagger';
import { CategoriaComunidad } from '../models/categoria-comunidad.entity';

/**
 * DTO para la respuesta de categorías de comunidad.
 * Se utiliza para la documentación de Swagger y transporte de datos.
 */
export class CategoriaComunidadResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id_categoria_comunidad: string;

  @ApiProperty({ example: 'Tecnología' })
  descripcion: string;

  @ApiProperty({ example: true })
  activa: boolean;

  /**
   * Mapea una entidad de dominio a un DTO de respuesta.
   *
   * @param entity - La entidad de dominio.
   * @returns El DTO de respuesta.
   */
  public static fromEntity(
    entity: CategoriaComunidad,
  ): CategoriaComunidadResponseDto {
    const dto = new CategoriaComunidadResponseDto();
    dto.id_categoria_comunidad = entity.id_categoria_comunidad;
    dto.descripcion = entity.descripcion;
    dto.activa = entity.activa;
    return dto;
  }
}
