import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class MiembroYaExistenteException extends DomainException {
  constructor(id_usuario: string, id_comunidad: string) {
    super(
      `El usuario (ID: ${id_usuario}) ya es miembro de la comunidad (ID: ${id_comunidad})`,
      HttpStatus.CONFLICT,
    );
    this.name = 'MiembroYaExistenteException';
  }
}
