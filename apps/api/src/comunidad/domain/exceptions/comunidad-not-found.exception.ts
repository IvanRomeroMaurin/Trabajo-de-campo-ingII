import { DomainException } from '../../../common/exceptions/domain.exception';

/**
 * Excepción de dominio: La comunidad solicitada no existe.
 * Se lanza cuando se intenta acceder a una comunidad por ID o slug
 * que no existe en la base de datos.
 */
export class ComunidadNotFoundException extends DomainException {
  constructor(identificador: string, tipo: 'ID' | 'slug' = 'ID') {
    super(`Comunidad no encontrada (búsqueda por ${tipo}: ${identificador})`);
    this.name = 'ComunidadNotFoundException';
  }
}
