import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class ComunidadYaInactivaException extends DomainException {
  constructor() {
    super('La comunidad ya está inactiva', HttpStatus.CONFLICT);
    this.name = 'ComunidadYaInactivaException';
  }
}
