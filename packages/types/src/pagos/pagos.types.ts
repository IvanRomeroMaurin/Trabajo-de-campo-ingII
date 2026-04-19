import { ISuscripcion } from '../suscripciones';

export interface ICicloPago {
  id_ciclo_pago: string;
  frecuencia: number;
  tipo_frecuencia: string;
  plan_comunidad?: any[]; // Avoiding circularity with IPlanComunidad if possible, or use import later
}

export interface IEstadoPago {
  id_estado_pago: string;
  estado: string;
  pago?: IPago[];
}

export interface IMoneda {
  id_moneda: string;
  moneda: string;
  pago?: IPago[];
  plan_comunidad?: any[];
}

export interface IPago {
  id_pago: string;
  id_suscripcion: string;
  monto: number;
  monto_neto?: number | null;
  mp_payment_id?: string | null;
  id_estado: string;
  fecha_pago?: string | Date | null;
  id_moneda: string;
  mp_payload_respuesta?: any | null;
  fecha_creacion: string | Date;
  fecha_actualizacion?: string | Date | null;
  mp_payment_method_id?: string | null;
  descripcion?: string | null;
  estado_pago?: IEstadoPago;
  moneda?: IMoneda;
  suscripcion?: ISuscripcion;
}
