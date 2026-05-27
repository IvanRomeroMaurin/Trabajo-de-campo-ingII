import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class ComunidadNoEncontradaException extends DomainException {
  constructor(id_comunidad: string) {
    super(
      `La comunidad no fue encontrada (ID: ${id_comunidad})`,
      HttpStatus.NOT_FOUND,
    );
    this.name = 'ComunidadNoEncontradaException';
  }
}
