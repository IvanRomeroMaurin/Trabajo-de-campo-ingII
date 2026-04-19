import { IComunidad } from '../comunidades';
import { IUsuario } from '../usuarios';

export interface IRol {
  id_rol: string;
  rol: string;
  miembro_comunidad?: IMiembroComunidad[];
}

export interface IMiembroComunidad {
  id_miembro: string;
  id_usuario: string;
  id_comunidad: string;
  id_rol_comunidad: string;
  fecha_ingreso: string | Date;
  fecha_actualizacion?: string | Date | null;
  comunidad?: IComunidad;
  rol?: IRol;
  usuario?: IUsuario;
}
