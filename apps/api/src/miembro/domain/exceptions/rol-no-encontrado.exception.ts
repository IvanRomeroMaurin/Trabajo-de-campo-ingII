import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class RolNoEncontradoException extends DomainException {
  constructor(id_rol: string) {
    super(`El rol solicitado no existe (ID: ${id_rol})`, HttpStatus.NOT_FOUND);
    this.name = 'RolNoEncontradoException';
  }
}
