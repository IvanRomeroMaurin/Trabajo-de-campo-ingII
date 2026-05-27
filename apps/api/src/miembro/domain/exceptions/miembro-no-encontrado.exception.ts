import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class MiembroNoEncontradoException extends DomainException {
  constructor(id_usuario: string, id_comunidad: string) {
    super(
      `El usuario (ID: ${id_usuario}) no es miembro de la comunidad (ID: ${id_comunidad})`,
      HttpStatus.NOT_FOUND,
    );
    this.name = 'MiembroNoEncontradoException';
  }
}
