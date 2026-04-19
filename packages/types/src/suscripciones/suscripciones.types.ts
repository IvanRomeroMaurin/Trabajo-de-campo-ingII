import { ICicloPago, IMoneda, IPago } from '../pagos';
import { IComunidad } from '../comunidades';
import { IUsuario } from '../usuarios';

export interface IEstadoSuscripcion {
  id_estado_suscripcion: string;
  estado: string;
  suscripcion?: ISuscripcion[];
}

export interface IPlanComunidad {
  id_plan_comunidad: string;
  precio: number;
  titulo: string;
  descripcion?: string | null;
  activa: boolean;
  mp_preapproval_plan_id?: string | null;
  fecha_creacion: string | Date;
  fecha_modificacion?: string | Date | null;
  id_comunidad: string;
  id_ciclo_pago: string;
  id_moneda: string;
  ciclo_pago?: ICicloPago;
  comunidad?: IComunidad;
  moneda?: IMoneda;
  suscripcion?: ISuscripcion[];
}

export interface ISuscripcion {
  suscripcion_id: string;
  fecha_suscripcion: string | Date;
  fecha_inicio?: string | Date | null;
  fecha_fin?: string | Date | null;
  external_reference?: string | null;
  mp_subscription_id?: string | null;
  init_point?: string | null;
  fecha_actualizacion?: string | Date | null;
  fecha_proximo_pago?: string | Date | null;
  back_url?: string | null;
  id_usuario: string;
  id_plan_comunidad: string;
  id_estado: string;
  pago?: IPago[];
  estado_suscripcion?: IEstadoSuscripcion;
  plan_comunidad?: IPlanComunidad;
  usuario?: IUsuario;
}

export interface ICreatePlanRequest {
  titulo: string;
  descripcion?: string;
  precio: number;
  frecuencia: number;
  tipo_frecuencia: 'months' | 'days';
  moneda: 'ARS' | 'USD';
  id_comunidad: string;
}

export interface ICreatePlanResponse {
  plan: IPlanComunidad;
}

