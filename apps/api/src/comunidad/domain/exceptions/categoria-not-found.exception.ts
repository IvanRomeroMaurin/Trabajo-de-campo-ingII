import { DomainException } from '../../../common/exceptions/domain.exception';

/**
 * Excepción de dominio: La categoría solicitada no existe.
 * Se lanza cuando se intenta crear/actualizar una comunidad
 * con una categoría que no existe.
 */
export class CategoriaNotFoundException extends DomainException {
  constructor(idCategoria: string) {
    super(`Categoría no encontrada (ID: ${idCategoria})`);
    this.name = 'CategoriaNotFoundException';
  }
}
