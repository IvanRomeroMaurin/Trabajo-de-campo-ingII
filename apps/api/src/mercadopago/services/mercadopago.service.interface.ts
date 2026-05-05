/**
 * Datos necesarios para registrar un plan de suscripción en Mercado Pago.
 */
export interface CrearPreapprovalPlanData {
  readonly titulo: string;
  readonly descripcion?: string;
  readonly precio: number;
  readonly frecuencia: number;
  readonly tipo_frecuencia: string;
  readonly moneda: string;
  readonly back_url: string;
}

/**
 * Puerto (Interfaz) para la integración con Mercado Pago.
 */
export abstract class IMercadoPagoService {
  /**
   * Registra un plan de suscripción recurrente en Mercado Pago.
   *
   * @param data - Datos para la creación del plan.
   * @returns El ID del plan generado por Mercado Pago.
   */
  public abstract createPreapprovalPlan(
    data: CrearPreapprovalPlanData,
  ): Promise<{ mp_preapproval_plan_id: string }>;

  /**
   * Cancela un plan existente en Mercado Pago.
   * Se utiliza generalmente como acción de compensación si falla el flujo de negocio.
   *
   * @param mp_preapproval_plan_id - ID del plan en Mercado Pago.
   */
  public abstract cancelPreapprovalPlan(
    mp_preapproval_plan_id: string,
  ): Promise<void>;
}
