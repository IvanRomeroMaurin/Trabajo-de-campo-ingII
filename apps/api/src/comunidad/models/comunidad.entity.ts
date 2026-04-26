import crypto from 'crypto';
import { ICategoriaComunidad } from '@repo/types';
import { DomainException } from '../../common/exceptions/domain.exception';

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
  public get id_comunidad(): string { return this._id_comunidad; }
  public get nombre(): string { return this._nombre; }
  public get slug(): string { return this._slug; }
  public get activa(): boolean { return this._activa; }
  public get fecha_creacion(): Date { return this._fecha_creacion; }
  public get id_categoria_comunidad(): string { return this._id_categoria_comunidad; }
  public get descripcion(): string | null | undefined { return this._descripcion; }
  public get portada_url(): string | null | undefined { return this._portada_url; }
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
  public static crearComunidad(
    nombre: string,
    slug: string,
    id_categoria_comunidad: string,
    descripcion?: string | null,
    portada_url?: string | null,
  ): Comunidad {
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
  public desactivarComunidad(): void {
    if (!this._activa) {
      throw new DomainException('La comunidad ya está inactiva');
    }
    this._activa = false;
  }

  public reactivarComunidad(): void {
    if (this._activa) {
      throw new DomainException('La comunidad ya está activa');
    }
    this._activa = true;
  }

  public actualizarComunidad(
    nombre?: string,
    slug?: string,
    descripcion?: string | null,
    portada_url?: string | null,
    id_categoria_comunidad?: string,
  ): void {
    if (nombre) this.nombre = nombre;
    if (slug) this.slug = slug;
    if (descripcion !== undefined) this.descripcion = descripcion;
    if (portada_url !== undefined) this.portada_url = portada_url;
    if (id_categoria_comunidad) this.id_categoria_comunidad = id_categoria_comunidad;
  }
}

