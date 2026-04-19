import { IComunidad } from '../comunidades';
import { IContenido } from '../contenidos';

export interface INivelDificultad {
  id_dificultad: string;
  dificultad: string;
  descripcion?: string | null;
  curso?: ICurso[];
}

export interface IModulo {
  id_modulo: string;
  titulo: string;
  descripcion?: string | null;
  orden: number;
  activa: boolean;
  fecha_creacion: string | Date;
  id_curso: string;
  contenido?: IContenido[];
  curso?: ICurso;
}

export interface ICurso {
  id_curso: string;
  titulo: string;
  descripcion?: string | null;
  imagen_url?: string | null;
  certificado_habilitado: boolean;
  activa: boolean;
  fecha_creacion: string | Date;
  id_comunidad: string;
  id_dificultad: string;
  comunidad?: IComunidad;
  nivel_dificultad?: INivelDificultad;
  modulo?: IModulo[];
}
