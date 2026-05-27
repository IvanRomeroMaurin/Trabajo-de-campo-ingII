import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class RolYaAsignadoException extends DomainException {
  constructor(id_rol: string) {
    super(
      `El miembro ya tiene asignado el rol (ID: ${id_rol})`,
      HttpStatus.CONFLICT,
    );
    this.name = 'RolYaAsignadoException';
  }
}
