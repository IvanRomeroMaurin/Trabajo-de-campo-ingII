import { DomainException } from '../../../common/exceptions/domain.exception';

/**
 * Excepción de dominio: Intento de desactivar una comunidad ya inactiva.
 * Validación de estado en la entidad de dominio.
 */
export class ComunidadYaInactivaException extends DomainException {
  constructor(idComunidad: string) {
    super(`La comunidad ya está inactiva (ID: ${idComunidad})`);
    this.name = 'ComunidadYaInactivaException';
  }
}
