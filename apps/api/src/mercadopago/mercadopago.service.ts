import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, PreApprovalPlan } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private readonly logger = new Logger(MercadoPagoService.name);
  private readonly preApprovalPlan: PreApprovalPlan;

  constructor(private readonly configService: ConfigService) {
    const client = new MercadoPagoConfig({
      accessToken: this.configService.getOrThrow<string>('MP_ACCESS_TOKEN'),
    });
    this.preApprovalPlan = new PreApprovalPlan(client);
  }

  /**
   * Registra un plan de suscripción recurrente en Mercado Pago.
   * Corresponde al paso createPreapprovalPlan del diagrama de secuencia.
   * @returns mp_preapproval_plan_id devuelto por MP
   */
  async createPreapprovalPlan(data: {
    titulo: string;
    descripcion?: string;
    precio: number;
    frecuencia: number;
    tipo_frecuencia: string;
    moneda: string;
    back_url: string;
  }): Promise<{ mp_preapproval_plan_id: string }> {
    try {
      const response = await this.preApprovalPlan.create({
        body: {
          reason: data.titulo,
          auto_recurring: {
            frequency: data.frecuencia,
            frequency_type: data.tipo_frecuencia,
            transaction_amount: data.precio,
            currency_id: data.moneda,
          },
          back_url: data.back_url,
        },
      });

      if (!response.id) {
        throw new HttpException(
          'No se pudo registrar el plan en Mercado Pago, intentá de nuevo',
          HttpStatus.BAD_GATEWAY,
        );
      }

      return { mp_preapproval_plan_id: response.id };
    } catch (error) {
      this.logger.error('Error al crear plan en Mercado Pago', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new HttpException(
        'Error al comunicarse con Mercado Pago: ' + errorMessage,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   * Cancela un plan en MP como operación de compensación.
   * Se invoca SOLO si falla la persistencia en BD tras crear el plan en MP.
   * No relanza errores para no pisar la excepción original.
   */
  async cancelPreapprovalPlan(mp_preapproval_plan_id: string): Promise<void> {
    try {
      await this.preApprovalPlan.update({
        id: mp_preapproval_plan_id,
        updatePreApprovalPlanRequest: {
          status: 'cancelled',
        },
      });
      this.logger.log(
        `Plan de MP ${mp_preapproval_plan_id} cancelado por compensación`,
      );
    } catch (error) {
      this.logger.error(
        `Fallo al cancelar plan de MP ${mp_preapproval_plan_id} en compensación`,
        error,
      );
    }
  }
}
