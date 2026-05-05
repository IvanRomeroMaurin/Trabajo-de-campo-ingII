import { Injectable } from '@nestjs/common';
import { Transactional } from '@nestjs-cls/transactional';
import { ICategoriaComunidadRepository } from '../infrastructure/categoria-comunidad.repository.interface';
import { ICategoriaComunidadService } from './categoria-comunidad.service.interface';
import { CategoriaComunidad } from '../models/categoria-comunidad.entity';
import { CategoriaNotFoundException } from '../domain/exceptions';

/**
 * Implementación del servicio de categorías de comunidad.
 * Orquestra las operaciones de negocio relacionadas con la clasificación de comunidades.
 */
@Injectable()
export class CategoriaComunidadService implements ICategoriaComunidadService {
  public constructor(
    private readonly repository: ICategoriaComunidadRepository,
  ) {}

  /**
   * Obtiene todas las categorías marcadas como activas en el sistema.
   * @returns Promesa con el listado de categorías.
   */
  public async getCategorias(): Promise<CategoriaComunidad[]> {
    return this.repository.buscarCategoriasActivas();
  }

  /**
   * Registra una nueva categoría en el sistema.
   * @param descripcion Nombre o descripción de la categoría.
   * @returns La entidad creada.
   */
  @Transactional()
  public async crear(descripcion: string): Promise<CategoriaComunidad> {
    const nuevaCategoria = CategoriaComunidad.crearCategoria(descripcion);
    return this.repository.crearCategoria(nuevaCategoria);
  }

  /**
   * Modifica la descripción de una categoría existente.
   * @param id Identificador de la categoría.
   * @param descripcion Nueva descripción.
   * @throws NotFoundException si el ID no existe.
   */
  @Transactional()
  public async actualizarDescripcion(
    id: string,
    descripcion: string,
  ): Promise<void> {
    const categoria = await this.obtenerPorIdOError(id);
    categoria.actualizarDescripcion(descripcion);
    await this.repository.actualizarCategoria(categoria);
  }

  /**
   * Desactiva una categoría para que no pueda ser asignada a nuevas comunidades.
   * @param id Identificador de la categoría.
   * @throws NotFoundException si el ID no existe.
   */
  @Transactional()
  public async desactivarCategoria(id: string): Promise<void> {
    const categoria = await this.obtenerPorIdOError(id);
    categoria.desactivarCategoria();
    await this.repository.actualizarCategoria(categoria);
  }

  public async existeCategoria(id: string): Promise<boolean> {
    return this.repository.existeCategoria(id);
  }

  /**
   * Valida que una categoría exista. Lanza CategoriaNotFoundException si no existe.
   * @param id ID de la categoría a validar.
   * @throws {CategoriaNotFoundException} Si la categoría no existe.
   */
  public async validarExistencia(id: string): Promise<void> {
    const existe = await this.existeCategoria(id);
    if (!existe) {
      throw new CategoriaNotFoundException(id);
    }
  }

  private async obtenerPorIdOError(id: string): Promise<CategoriaComunidad> {
    const categoria = await this.repository.buscarCategoriaPorId(id);
    if (!categoria) {
      throw new CategoriaNotFoundException(id);
    }
    return categoria;
  }
}
