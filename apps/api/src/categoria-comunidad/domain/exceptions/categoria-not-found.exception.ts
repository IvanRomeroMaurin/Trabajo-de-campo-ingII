import { DomainException } from '../../../common/exceptions/domain.exception';

/**
 * Excepción de dominio: La categoría solicitada no existe.
 * Se lanza cuando se intenta realizar una operación con una categoría
 * que no existe en el sistema.
 */
export class CategoriaNotFoundException extends DomainException {
  constructor(idCategoria: string) {
    super(`Categoría no encontrada (ID: ${idCategoria})`);
    this.name = 'CategoriaNotFoundException';
  }
}
