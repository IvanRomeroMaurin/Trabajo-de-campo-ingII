import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class ComunidadNotFoundException extends DomainException {
  constructor(identificador: string, tipo: 'ID' | 'slug' = 'ID') {
    super(
      `Comunidad no encontrada (búsqueda por ${tipo}: ${identificador})`,
      HttpStatus.NOT_FOUND,
    );
    this.name = 'ComunidadNotFoundException';
  }
}
