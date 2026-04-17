import { IUsuario } from '../usuarios';

export interface IRespuestaAuth {
  access_token: string;
  usuario: IUsuario;
}

export interface IRegistrarUsuario {
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
}

export interface IIniciarSesion {
  email: string;
  password?: string;
}

export interface IJwtPayload {
  email: string;
  sub: string;
}
