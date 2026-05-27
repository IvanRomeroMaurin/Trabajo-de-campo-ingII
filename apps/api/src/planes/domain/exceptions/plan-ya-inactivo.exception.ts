import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class PlanYaInactivoException extends DomainException {
  constructor(idPlan?: string) {
    const msg = idPlan
      ? `El plan ya está inactivo (ID: ${idPlan})`
      : 'El plan ya está inactivo';
    super(msg, HttpStatus.CONFLICT);
    this.name = 'PlanYaInactivoException';
  }
}
