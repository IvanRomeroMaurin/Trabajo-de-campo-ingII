import { IModulo } from '../cursos';

export interface ITipoContenido {
  id_tipo_contenido: string;
  descripcion: string;
  activa: boolean;
  contenido?: IContenido[];
}

export interface IContenido {
  id_contenido: string;
  titulo: string;
  descripcion?: string | null;
  orden: number;
  activa: boolean;
  fecha_creacion: string | Date;
  url_contenido?: string | null;
  duracion?: number | null;
  id_modulo: string;
  id_tipo_contenido: string;
  modulo?: IModulo;
  tipo_contenido?: ITipoContenido;
}
