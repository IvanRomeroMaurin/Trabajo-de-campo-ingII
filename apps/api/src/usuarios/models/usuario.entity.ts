import { IUsuario, IMiembroComunidad, ISuscripcion } from '@repo/types';
import { ApiProperty } from '@nestjs/swagger';

export class Usuario implements IUsuario {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  public id_usuario: string;
  @ApiProperty({ example: 'Juan' })
  public nombre: string;
  @ApiProperty({ example: 'Pérez' })
  public apellido: string;
  @ApiProperty({ example: 'juan.perez@ejemplo.com' })
  public email: string;
  public password_hash?: string;
  @ApiProperty()
  public fecha_alta: string | Date;
  @ApiProperty()
  public activa: boolean;
  public miembro_comunidad?: IMiembroComunidad[];
  public suscripcion?: ISuscripcion[];

  public constructor(partial: Partial<Usuario>) {
    Object.assign(this, partial);
  }
}
