export abstract class MercadoPagoService {
  /**
   * Registra un plan de suscripción recurrente en Mercado Pago.
   *
   * @param data - Datos del plan (título, precio, frecuencia, etc.)
   * @returns El ID del plan generado por Mercado Pago.
   */
  abstract createPreapprovalPlan(data: {
    titulo: string;
    descripcion?: string;
    precio: number;
    frecuencia: number;
    tipo_frecuencia: string;
    moneda: string;
    back_url: string;
  }): Promise<{ mp_preapproval_plan_id: string }>;

  /**
   * Cancela un plan existente en Mercado Pago.
   * Se utiliza generalmente como acción de compensación si falla el flujo de negocio.
   *
   * @param mp_preapproval_plan_id - ID del plan en Mercado Pago.
   */
  abstract cancelPreapprovalPlan(mp_preapproval_plan_id: string): Promise<void>;
}
