import crypto from 'crypto';
import { ICategoriaComunidad } from '@repo/types';
import { DomainException } from '../../../common/exceptions/domain.exception';
import { ComunidadYaInactivaException, ComunidadYaActivaException } from '../exceptions';
import { stringToSlug } from '../../../common/utils/slug.utils';

/**
 * Entidad de Dominio que representa una Comunidad en el sistema.
 * Gestiona el perfil, el estado de activación y la categorización de los grupos de usuarios.
 */
export class Comunidad {
  private _id_comunidad: string;
  private _nombre: string;
  private _slug: string;
  private _activa: boolean;
  private _fecha_creacion: Date;
  private _descripcion?: string | null;
  private _portada_url?: string | null;
  private _id_categoria_comunidad: string;
  private _categoria_comunidad?: ICategoriaComunidad;

  private constructor(
    id_comunidad: string,
    nombre: string,
    slug: string,
    activa: boolean,
    fecha_creacion: Date,
    id_categoria_comunidad: string,
    descripcion?: string | null,
    portada_url?: string | null,
    categoria_comunidad?: ICategoriaComunidad,
  ) {
    this._id_comunidad = id_comunidad;
    this.nombre = nombre;
    this.slug = slug;
    this._activa = activa;
    this._fecha_creacion = fecha_creacion;
    this.id_categoria_comunidad = id_categoria_comunidad;
    this.descripcion = descripcion;
    this.portada_url = portada_url;
    this._categoria_comunidad = categoria_comunidad;
  }

  // Getters
  /** Identificador único (UUID) de la comunidad. */
  public get id_comunidad(): string { return this._id_comunidad; }
  /** Nombre público de la comunidad. */
  public get nombre(): string { return this._nombre; }
  /** Identificador amigable para URLs (slug). */
  public get slug(): string { return this._slug; }
  /** Indica si la comunidad es visible y permite interacciones. */
  public get activa(): boolean { return this._activa; }
  /** Fecha en la que la comunidad fue registrada inicialmente. */
  public get fecha_creacion(): Date { return this._fecha_creacion; }
  /** ID de la categoría a la que pertenece la comunidad. */
  public get id_categoria_comunidad(): string { return this._id_categoria_comunidad; }
  /** Texto descriptivo sobre los objetivos o reglas de la comunidad. */
  public get descripcion(): string | null | undefined { return this._descripcion; }
  /** URL de la imagen de portada o banner. */
  public get portada_url(): string | null | undefined { return this._portada_url; }
  /** Datos extendidos de la categoría (opcional, cargados desde persistencia). */
  public get categoria_comunidad(): ICategoriaComunidad | undefined { return this._categoria_comunidad; }

  // Setters privados (Validación de formato/estructura)
  private set nombre(value: string) {
    if (!value || value.length > 100) {
      throw new DomainException('El nombre no puede superar 100 caracteres');
    }
    this._nombre = value;
  }

  private set slug(value: string) {
    if (!value) {
      throw new DomainException('El slug es obligatorio');
    }
    this._slug = value;
  }

  private set descripcion(value: string | null | undefined) {
    this._descripcion = value;
  }

  private set portada_url(value: string | null | undefined) {
    this._portada_url = value;
  }

  private set id_categoria_comunidad(value: string) {
    if (!value) {
      throw new DomainException('La categoría es obligatoria');
    }
    this._id_categoria_comunidad = value;
  }

  // Factory Methods
  /**
   * Crea una nueva instancia de Comunidad con valores por defecto (inactiva).
   * @param nombre Nombre de la comunidad.
   * @param slug Identificador para URL.
   * @param id_categoria_comunidad ID de la categoría inicial.
   * @param descripcion Descripción opcional.
   * @param portada_url Imagen de portada opcional.
   * @returns Una nueva entidad Comunidad.
   */
  /**
   * Crea una nueva instancia de Comunidad con un slug único generado automáticamente.
   * Valida la unicidad del slug usando un callback que consulta el repositorio.
   * 
   * @param nombre - Nombre de la comunidad.
   * @param id_categoria_comunidad - ID de la categoría inicial.
   * @param slugRepository - Callback async que retorna true si el slug ya existe.
   * @param descripcion - Descripción opcional.
   * @param portada_url - Imagen de portada opcional.
   * @returns Una promesa con la nueva entidad Comunidad.
   */
  public static async crearComunidad(
    nombre: string,
    id_categoria_comunidad: string,
    slugRepository: (slug: string) => Promise<boolean>,
    descripcion?: string | null,
    portada_url?: string | null,
  ): Promise<Comunidad> {
    const slug = await Comunidad.generarSlugUnico(nombre, slugRepository);

    return new Comunidad(
      crypto.randomUUID(),
      nombre,
      slug,
      false, // activa: false por defecto
      new Date(),
      id_categoria_comunidad,
      descripcion,
      portada_url,
    );
  }

  /**
   * Genera un slug único basado en el nombre de la comunidad.
   * @public
   */
  public static async generarSlugUnico(
    nombre: string,
    slugRepository: (slug: string) => Promise<boolean>,
  ): Promise<string> {
    const baseSlug = stringToSlug(nombre);
    let slug = baseSlug;
    let contador = 2;

    while (await slugRepository(slug)) {
      slug = `${baseSlug}-${contador}`;
      contador++;
    }

    return slug;
  }

  /**
   * Reconstituye una entidad Comunidad desde el estado de persistencia.
   * @param props Propiedades crudas de la base de datos.
   * @returns La entidad Comunidad hidratada.
   */
  public static reconstituirComunidad(props: {
    id_comunidad: string;
    nombre: string;
    slug: string;
    activa: boolean;
    fecha_creacion: Date;
    id_categoria_comunidad: string;
    descripcion?: string | null;
    portada_url?: string | null;
    categoria_comunidad?: ICategoriaComunidad;
  }): Comunidad {
    const comunidad = Object.create(Comunidad.prototype) as Comunidad;
    comunidad._id_comunidad = props.id_comunidad;
    comunidad._nombre = props.nombre;
    comunidad._slug = props.slug;
    comunidad._activa = props.activa;
    comunidad._fecha_creacion = props.fecha_creacion;
    comunidad._id_categoria_comunidad = props.id_categoria_comunidad;
    comunidad._descripcion = props.descripcion;
    comunidad._portada_url = props.portada_url;
    comunidad._categoria_comunidad = props.categoria_comunidad;
    return comunidad;
  }

  // Métodos de Comportamiento
  /**
   * Desactiva la comunidad, impidiendo nuevas interacciones públicas.
   * @throws DomainException si ya estaba inactiva.
   */
  public desactivarComunidad(): void {
    if (!this._activa) {
      throw new ComunidadYaInactivaException(this._id_comunidad);
    }
    this._activa = false;
  }

  /**
   * Reactiva la comunidad, haciéndola visible nuevamente.
   * @throws ComunidadYaActivaException si ya estaba activa.
   */
  public reactivarComunidad(): void {
    if (this._activa) {
      throw new ComunidadYaActivaException(this._id_comunidad);
    }
    this._activa = true;
  }

  /**
   * Actualiza el perfil de la comunidad aplicando las validaciones correspondientes.
   * Solo regenera el slug si el nombre ha cambiado realmente.
   * 
   * @param nombre Nuevo nombre (opcional).
   * @param descripcion Nueva descripción (opcional).
   * @param portada_url Nueva imagen (opcional).
   * @param id_categoria_comunidad Nueva categoría (opcional).
   * @param slugRepository Callback para validar unicidad de slug (obligatorio si cambia el nombre).
   */
  public async actualizarComunidad(
    nombre?: string,
    descripcion?: string | null,
    portada_url?: string | null,
    id_categoria_comunidad?: string,
    slugRepository?: (slug: string) => Promise<boolean>,
  ): Promise<void> {
    // 1. Solo regeneramos el slug si el nombre cambió y nos pasaron el repositorio
    if (nombre && nombre !== this._nombre && slugRepository) {
      this._nombre = nombre;
      this._slug = await Comunidad.generarSlugUnico(nombre, slugRepository);
    }

    if (descripcion !== undefined) this._descripcion = descripcion;
    if (portada_url !== undefined) this._portada_url = portada_url;
    
    if (id_categoria_comunidad) {
      this._id_categoria_comunidad = id_categoria_comunidad;
    }
  }
}

