import { IMiembroComunidad } from '../roles';
import { ISuscripcion } from '../suscripciones';

export interface IUsuario {
  id_usuario: string;
  nombre: string;
  apellido: string;
  email: string;
  password_hash?: string;
  fecha_alta: string | Date;
  activa: boolean;
  miembro_comunidad?: IMiembroComunidad[];
  suscripcion?: ISuscripcion[];
}
