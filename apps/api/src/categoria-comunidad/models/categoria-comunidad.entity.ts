import crypto from 'crypto';
import { DomainException } from '../../common/exceptions/domain.exception';

/**
 * Entidad de Dominio que representa una Categoría de Comunidad.
 * Centraliza las reglas de negocio para la clasificación de comunidades.
 */
export class CategoriaComunidad {
  private _id_categoria_comunidad: string;
  private _descripcion: string;
  private _activa: boolean;

  private constructor(
    id_categoria_comunidad: string,
    descripcion: string,
    activa: boolean,
  ) {
    this._id_categoria_comunidad = id_categoria_comunidad;
    this.descripcion = descripcion;
    this._activa = activa;
  }

  // Getters
  /** Identificador único de la categoría. */
  public get id_categoria_comunidad(): string {
    return this._id_categoria_comunidad;
  }
  /** Descripción o nombre de la categoría. */
  public get descripcion(): string {
    return this._descripcion;
  }
  /** Indica si la categoría está disponible para ser usada por nuevas comunidades. */
  public get activa(): boolean {
    return this._activa;
  }

  // Setters privados con validación
  private set descripcion(value: string) {
    if (!value || value.length > 100) {
      throw new DomainException('La descripción es inválida o demasiado larga');
    }
    this._descripcion = value;
  }

  // Factory Methods
  /**
   * Crea una nueva instancia de Categoría con un ID generado automáticamente.
   * @param descripcion Nombre de la categoría.
   * @returns Una nueva entidad CategoríaComunidad.
   */
  public static crearCategoria(descripcion: string): CategoriaComunidad {
    return new CategoriaComunidad(
      crypto.randomUUID(),
      descripcion,
      true, // Activa por defecto
    );
  }

  /**
   * Reconstituye una entidad desde datos persistidos (sin disparar validaciones de setters).
   * @param props Propiedades de la categoría.
   * @returns La entidad reconstituida.
   */
  public static reconstituirCategoria(props: {
    id_categoria_comunidad: string;
    descripcion: string;
    activa: boolean;
  }): CategoriaComunidad {
    const categoria = Object.create(
      CategoriaComunidad.prototype,
    ) as CategoriaComunidad;
    categoria._id_categoria_comunidad = props.id_categoria_comunidad;
    categoria._descripcion = props.descripcion;
    categoria._activa = props.activa;
    return categoria;
  }

  // Métodos de Comportamiento
  /**
   * Marca la categoría como inactiva.
   * @throws DomainException si la categoría ya estaba inactiva.
   */
  public desactivarCategoria(): void {
    if (!this._activa)
      throw new DomainException('La categoría ya está inactiva');
    this._activa = false;
  }

  /**
   * Marca la categoría como activa.
   * @throws DomainException si la categoría ya estaba activa.
   */
  public reactivarCategoria(): void {
    if (this._activa) throw new DomainException('La categoría ya está activa');
    this._activa = true;
  }

  /**
   * Actualiza la descripción de la categoría aplicando validaciones de negocio.
   * @param descripcion Nueva descripción.
   */
  public actualizarDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }
}
