import { ICurso } from '../cursos';
import { IMiembroComunidad } from '../roles';
import { IPlanComunidad } from '../suscripciones';

export interface ICategoriaComunidad {
  id_categoria_comunidad: string;
  descripcion: string;
  activa: boolean;
  comunidad?: IComunidad[];
}

export interface IComunidad {
  id_comunidad: string;
  nombre: string;
  slug: string;
  portada_url?: string | null;
  activa: boolean;
  fecha_creacion: string | Date;
  descripcion?: string | null;
  id_categoria_comunidad: string;
  categoria_comunidad?: ICategoriaComunidad;
  curso?: ICurso[];
  miembro_comunidad?: IMiembroComunidad[];
  plan_comunidad?: IPlanComunidad[];
}
