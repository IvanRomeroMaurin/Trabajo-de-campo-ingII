import crypto from 'crypto';
import { IMiembroComunidad, ISuscripcion } from '@repo/types';
import { DomainException } from '../../common/exceptions/domain.exception';

/**
 * Entidad de Dominio que representa a un Usuario del sistema.
 * Contiene la lógica de negocio para la gestión de identidad, perfiles y estados de cuenta.
 */
export class Usuario {
  private _id_usuario: string;
  private _nombre: string;
  private _apellido: string;
  private _email: string;
  private _fecha_alta: Date;
  private _activa: boolean;
  private _password_hash?: string;
  private _miembro_comunidad?: IMiembroComunidad[];
  private _suscripcion?: ISuscripcion[];

  private constructor(
    id_usuario: string,
    nombre: string,
    apellido: string,
    email: string,
    fecha_alta: Date,
    activa: boolean,
    password_hash?: string,
  ) {
    this._id_usuario = id_usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this._fecha_alta = fecha_alta;
    this._activa = activa;
    this._password_hash = password_hash;
  }

  // Getters
  /** Identificador único del usuario (UUID). */
  public get id_usuario(): string { return this._id_usuario; }
  /** Nombre del usuario. */
  public get nombre(): string { return this._nombre; }
  /** Apellido del usuario. */
  public get apellido(): string { return this._apellido; }
  /** Correo electrónico único. */
  public get email(): string { return this._email; }
  /** Fecha en la que el usuario se registró en el sistema. */
  public get fecha_alta(): Date { return this._fecha_alta; }
  /** Indica si la cuenta del usuario está habilitada. */
  public get activa(): boolean { return this._activa; }
  /** Hash de la contraseña (sensible, solo uso interno). */
  public get password_hash(): string | undefined { return this._password_hash; }
  /** Listado de membresías a comunidades (opcional). */
  public get miembro_comunidad(): IMiembroComunidad[] | undefined { return this._miembro_comunidad; }
  /** Listado de suscripciones del usuario (opcional). */
  public get suscripcion(): ISuscripcion[] | undefined { return this._suscripcion; }

  // Setters privados con validación
  private set nombre(value: string) {
    if (!value || value.length > 50) throw new DomainException('Nombre inválido');
    this._nombre = value;
  }

  private set apellido(value: string) {
    if (!value || value.length > 50) throw new DomainException('Apellido inválido');
    this._apellido = value;
  }

  private set email(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) throw new DomainException('Email inválido');
    this._email = value;
  }

  // Factory Methods
  /**
   * Crea un nuevo usuario con las validaciones de negocio iniciales.
   * @param props Datos necesarios para el registro.
   * @returns Una nueva entidad Usuario.
   */
  public static crearUsuario(props: {
    nombre: string;
    apellido: string;
    email: string;
    password_hash: string;
  }): Usuario {
    return new Usuario(
      crypto.randomUUID(),
      props.nombre,
      props.apellido,
      props.email,
      new Date(),
      true, // Activo por defecto
      props.password_hash,
    );
  }

  /**
   * Reconstituye un usuario desde la persistencia sin disparar lógica de creación ni setters.
   * @param props Datos crudos de la base de datos.
   * @returns La entidad Usuario hidratada.
   */
  public static reconstituirUsuario(props: {
    id_usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    fecha_alta: Date;
    activa: boolean;
    password_hash?: string;
    miembro_comunidad?: IMiembroComunidad[];
    suscripcion?: ISuscripcion[];
  }): Usuario {
    const usuario = Object.create(Usuario.prototype) as Usuario;
    usuario._id_usuario = props.id_usuario;
    usuario._nombre = props.nombre;
    usuario._apellido = props.apellido;
    usuario._email = props.email;
    usuario._fecha_alta = props.fecha_alta;
    usuario._activa = props.activa;
    usuario._password_hash = props.password_hash;
    usuario._miembro_comunidad = props.miembro_comunidad;
    usuario._suscripcion = props.suscripcion;
    return usuario;
  }

  // Métodos de Comportamiento
  /**
   * Desactiva la cuenta del usuario.
   * @throws DomainException si ya estaba inactiva.
   */
  public desactivarUsuario(): void {
    if (!this._activa) throw new DomainException('El usuario ya está inactivo');
    this._activa = false;
  }

  /**
   * Reactiva la cuenta del usuario.
   * @throws DomainException si ya estaba activa.
   */
  public reactivarUsuario(): void {
    if (this._activa) throw new DomainException('El usuario ya está activo');
    this._activa = true;
  }

  /**
   * Actualiza el perfil básico del usuario aplicando validaciones.
   * @param nombre Nuevo nombre.
   * @param apellido Nuevo apellido.
   */
  public actualizarDatosPersonales(nombre: string, apellido: string): void {
    this.nombre = nombre;
    this.apellido = apellido;
  }

  /**
   * Actualiza el hash de la contraseña.
   * @param nuevoHash Hash ya encriptado.
   */
  public cambiarPassword(nuevoHash: string): void {
    if (!nuevoHash) throw new DomainException('El password hash es obligatorio');
    this._password_hash = nuevoHash;
  }
}

