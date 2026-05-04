import { DomainException } from '../../../common/exceptions/domain.exception';

/**
 * Excepción de dominio: Intento de activar una comunidad ya activa.
 * Validación de estado en la entidad de dominio.
 */
export class ComunidadYaActivaException extends DomainException {
  constructor(idComunidad: string) {
    super(
      `La comunidad ya está activa (ID: ${idComunidad})`
    );
    this.name = 'ComunidadYaActivaException';
  }
}
