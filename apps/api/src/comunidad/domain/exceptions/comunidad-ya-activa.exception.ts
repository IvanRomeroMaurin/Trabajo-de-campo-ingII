import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class ComunidadYaActivaException extends DomainException {
  constructor() {
    super('La comunidad ya está activa', HttpStatus.CONFLICT);
    this.name = 'ComunidadYaActivaException';
  }
}
