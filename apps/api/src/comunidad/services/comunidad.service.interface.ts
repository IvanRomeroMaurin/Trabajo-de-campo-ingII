import { Comunidad } from '../models/comunidad.entity';
import {
  CrearComunidadCommand,
  ActualizarComunidadCommand,
} from './comunidad.commands';

/**
 * Interfaz que define el contrato para el servicio de Comunidades.
 */
export abstract class ComunidadService {
  /**
   * Crea una nueva comunidad e inserta al creador como miembro con el rol de CREADOR.
   *
   * @param command - Objeto que contiene los datos básicos de la comunidad.
   * @param idCreador - Identificador único del usuario que está creando la comunidad.
   * @returns Una promesa que resuelve con los datos de la comunidad recién creada.
   */
  abstract crearComunidad(
    command: CrearComunidadCommand,
    idCreador: string,
  ): Promise<Comunidad>;

  /**
   * Obtiene la lista de todas las comunidades que se encuentran actualmente activas.
   *
   * @returns Una promesa que resuelve con un arreglo de comunidades.
   */
  abstract getComunidades(): Promise<Comunidad[]>;

  /**
   * Obtiene las comunidades que han sido creadas por un usuario específico.
   *
   * @param idCreador - Identificador único del usuario creador.
   * @returns Una promesa que resuelve con un arreglo de comunidades asociadas al creador.
   */
  abstract getMisComunidades(idCreador: string): Promise<Comunidad[]>;

  /**
   * Busca y retorna la información de una comunidad específica utilizando su ID.
   *
   * @param id - Identificador único de la comunidad.
   * @returns Una promesa que resuelve con los datos de la comunidad encontrada.
   */
  abstract getComunidad(id: string): Promise<Comunidad>;

  /**
   * Busca y retorna la información de una comunidad específica utilizando su slug.
   *
   * @param slug - El slug de la comunidad a buscar.
   * @returns Una promesa que resuelve con los datos de la comunidad encontrada.
   */
  abstract getComunidadPorSlug(slug: string): Promise<Comunidad>;

  /**
   * Actualiza los datos de una comunidad existente.
   *
   * @param id - Identificador único de la comunidad a actualizar.
   * @param command - Objeto con los campos parciales a actualizar.
   * @returns Una promesa que resuelve con los datos de la comunidad actualizada.
   */
  abstract actualizarComunidad(
    id: string,
    command: ActualizarComunidadCommand,
  ): Promise<Comunidad>;

  /**
   * Desactiva una comunidad realizando una baja lógica.
   *
   * @param id - Identificador único de la comunidad a desactivar.
   * @returns Una promesa que resuelve con un mensaje de éxito.
   */
  abstract desactivarComunidad(id: string): Promise<{ mensaje: string }>;

  /**
   * Reactiva una comunidad que fue previamente desactivada.
   *
   * @param id - Identificador único de la comunidad a reactivar.
   * @returns Una promesa que resuelve con un mensaje de éxito.
   */
  abstract reactivarComunidad(id: string): Promise<{ mensaje: string }>;
}
