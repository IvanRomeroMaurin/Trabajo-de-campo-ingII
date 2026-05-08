import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../../../common/exceptions/domain.exception';

export class CategoriaNotFoundException extends DomainException {
  constructor(idCategoria: string) {
    super(`Categoría no encontrada (ID: ${idCategoria})`, HttpStatus.NOT_FOUND);
    this.name = 'CategoriaNotFoundException';
  }
}
