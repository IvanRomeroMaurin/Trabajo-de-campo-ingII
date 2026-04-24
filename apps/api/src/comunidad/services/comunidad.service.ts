import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Transactional } from '@nestjs-cls/transactional';
import { MiembroService } from '../../miembro/services/miembro.service.interface';
import { stringToSlug } from '../../common/utils/slug.utils';
import { Comunidad } from '../models/comunidad.entity';
import { ROLES } from '../../common/constants/roles';
import { ComunidadRepository } from '../repositories/comunidad.repository.interface';
import {
  CrearComunidadCommand,
  ActualizarComunidadCommand,
} from './comunidad.commands';
import { ComunidadService as IComunidadService } from './comunidad.service.interface';

/**
 * Servicio encargado de la lógica de negocio de Comunidades.
 * Utiliza interfaces de comando (CrearComunidadCommand) para desacoplarse de la capa HTTP.
 */
@Injectable()
export class ComunidadService implements IComunidadService {
  private readonly logger = new Logger(ComunidadService.name);

  public constructor(
    private readonly comunidadRepository: ComunidadRepository,
    private readonly miembroService: MiembroService,
  ) {}

  /**
   * Crea una nueva comunidad e inserta al creador como miembro con el rol de CREADOR.
   * Valida que la categoría proporcionada exista antes de guardar.
   *
   * @param command - Objeto que contiene los datos básicos de la comunidad (nombre, descripción, categoría, etc.).
   * @param idCreador - Identificador único del usuario que está creando la comunidad.
   * @returns Una promesa que resuelve con los datos de la comunidad recién creada.
   * @throws {NotFoundException} Si la categoría de comunidad especificada no existe.
   * @throws {InternalServerErrorException} Si ocurre un error inesperado durante la creación o asignación de permisos.
   */
  @Transactional()
  public async crearComunidad(
    command: CrearComunidadCommand,
    idCreador: string,
  ): Promise<Comunidad> {
    const slug = await this.generarSlugUnico(command.nombre);

    const existeCategoria = await this.comunidadRepository.existeCategoria(
      command.id_categoria_comunidad,
    );
    if (!existeCategoria) {
      throw new NotFoundException(
        `La categoría con id ${command.id_categoria_comunidad} no existe`,
      );
    }

    try {
      const nuevaComunidad = await this.comunidadRepository.guardar({
        nombre: command.nombre,
        slug,
        descripcion: command.descripcion,
        portada_url: command.portada_url,
        id_categoria_comunidad: command.id_categoria_comunidad,
        activa: false,
      });

      await this.miembroService.agregarMiembro({
        id_usuario: idCreador,
        id_comunidad: nuevaComunidad.id_comunidad,
        id_rol: ROLES.CREADOR,
      });

      return nuevaComunidad;
    } catch (error) {
      this.logger.error('Error al crear comunidad', error);
      throw new InternalServerErrorException(
        'Error al configurar permisos, intentá de nuevo',
      );
    }
  }

  /**
   * Obtiene la lista de todas las comunidades que se encuentran actualmente activas.
   *
   * @returns Una promesa que resuelve con un arreglo de objetos IComunidad.
   */
  public async getComunidades(): Promise<Comunidad[]> {
    return this.comunidadRepository.buscarTodasActivas();
  }

  /**
   * Obtiene las comunidades que han sido creadas por un usuario específico.
   * Filtra las comunidades donde el usuario tiene el rol de CREADOR.
   *
   * @param idCreador - Identificador único del usuario creador.
   * @returns Una promesa que resuelve con un arreglo de comunidades asociadas al creador.
   */
  public async getMisComunidades(idCreador: string): Promise<Comunidad[]> {
    return this.comunidadRepository.buscarPorCreador(idCreador, ROLES.CREADOR);
  }

  /**
   * Busca y retorna la información de una comunidad específica utilizando su ID.
   *
   * @param id - Identificador único de la comunidad.
   * @returns Una promesa que resuelve con los datos de la comunidad encontrada.
   * @throws {NotFoundException} Si no se encuentra ninguna comunidad con el ID proporcionado.
   */
  public async getComunidad(id: string): Promise<Comunidad> {
    const comunidad = await this.comunidadRepository.buscarPorId(id);
    if (!comunidad) {
      throw new NotFoundException(`La comunidad no fue encontrada`);
    }
    return comunidad;
  }

  /**
   * Busca y retorna la información de una comunidad específica utilizando su slug.
   * El slug es una versión amigable del nombre para usar en URLs.
   *
   * @param slug - El slug de la comunidad a buscar.
   * @returns Una promesa que resuelve con los datos de la comunidad encontrada.
   * @throws {NotFoundException} Si no se encuentra ninguna comunidad con el slug proporcionado.
   */
  public async getComunidadPorSlug(slug: string): Promise<Comunidad> {
    const comunidad = await this.comunidadRepository.buscarPorSlug(slug);
    if (!comunidad) {
      throw new NotFoundException(`La comunidad no fue encontrada`);
    }
    return comunidad;
  }

  /**
   * Actualiza los datos de una comunidad existente.
   * Verifica previamente que la comunidad exista y que el usuario solicitante sea el creador.
   * Si el nombre cambia, se genera un nuevo slug único.
   *
   * @param id - Identificador único de la comunidad a actualizar.
   * @param command - Objeto con los campos parciales a actualizar (nombre, descripción, etc.).
   * @param idUsuario - Identificador del usuario que intenta realizar la actualización.
   * @returns Una promesa que resuelve con los datos de la comunidad actualizada.
   * @throws {NotFoundException} Si la comunidad o la nueva categoría especificada no existen.
   * @throws {ForbiddenException} Si el usuario no tiene permisos para modificar la comunidad.
   */
  @Transactional()
  public async actualizarComunidad(
    id: string,
    command: ActualizarComunidadCommand,
  ): Promise<Comunidad> {
    const updateData: Partial<{
      nombre: string;
      slug: string;
      descripcion: string;
      portada_url: string;
      id_categoria_comunidad: string;
      activa: boolean;
    }> = { ...command };

    if (command.nombre !== undefined) {
      updateData.slug = await this.generarSlugUnico(command.nombre);
    }

    if (command.id_categoria_comunidad !== undefined) {
      const existeCat = await this.comunidadRepository.existeCategoria(
        command.id_categoria_comunidad,
      );
      if (!existeCat) throw new NotFoundException(`La categoría no existe`);
    }

    return this.comunidadRepository.actualizar(id, updateData);
  }

  /**
   * Desactiva una comunidad realizando una baja lógica (activa: false).
   * Requiere que el usuario sea el creador de la comunidad.
   *
   * @param id - Identificador único de la comunidad a desactivar.
   * @returns Una promesa que resuelve con un mensaje de éxito.
   * @throws {NotFoundException} Si la comunidad no existe.
   */
  @Transactional()
  public async desactivarComunidad(id: string): Promise<{ mensaje: string }> {
    await this.comunidadRepository.actualizar(id, { activa: false });
    return {
      mensaje: `La comunidad con id ${id} fue desactivada correctamente`,
    };
  }

  /**
   * Reactiva una comunidad que fue previamente desactivada (activa: true).
   *
   * @param id - Identificador único de la comunidad a reactivar.
   * @returns Una promesa que resuelve con un mensaje de éxito.
   * @throws {NotFoundException} Si la comunidad no existe.
   */
  @Transactional()
  public async reactivarComunidad(id: string): Promise<{ mensaje: string }> {
    await this.comunidadRepository.actualizar(id, { activa: true });
    return {
      mensaje: `La comunidad con id ${id} fue reactivada correctamente`,
    };
  }

  /**
   * Genera un slug único basado en el nombre de la comunidad.
   * Si el slug base ya existe, añade un sufijo numérico incremental hasta encontrar uno disponible.
   *
   * @param nombre - El nombre de la comunidad para generar el slug.
   * @returns Una promesa que resuelve con el slug único generado.
   * @private
   */
  private async generarSlugUnico(nombre: string): Promise<string> {
    const base = stringToSlug(nombre);
    let slug = base;
    let contador = 2;

    while (await this.comunidadRepository.buscarPorSlug(slug)) {
      slug = `${base}-${contador}`;
      contador++;
    }

    return slug;
  }
}
