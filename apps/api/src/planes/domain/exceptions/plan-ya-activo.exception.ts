import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class PlanYaActivoException extends DomainException {
  constructor(idPlan?: string) {
    const msg = idPlan
      ? `El plan ya está activo (ID: ${idPlan})`
      : 'El plan ya está activo';
    super(msg, HttpStatus.CONFLICT);
    this.name = 'PlanYaActivoException';
  }
}
