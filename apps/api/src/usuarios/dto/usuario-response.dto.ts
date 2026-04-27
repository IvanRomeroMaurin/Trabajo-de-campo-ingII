import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from '../models/usuario.entity';

export class UsuarioResponseDto {
  @ApiProperty() id_usuario: string;
  @ApiProperty() nombre: string;
  @ApiProperty() apellido: string;
  @ApiProperty() email: string;
  @ApiProperty() fecha_alta: Date;
  @ApiProperty() activa: boolean;

  public static fromEntity(entity: Usuario): UsuarioResponseDto {
    const dto = new UsuarioResponseDto();
    dto.id_usuario = entity.id_usuario;
    dto.nombre = entity.nombre;
    dto.apellido = entity.apellido;
    dto.email = entity.email;
    dto.fecha_alta = entity.fecha_alta;
    dto.activa = entity.activa;
    return dto;
  }
}
