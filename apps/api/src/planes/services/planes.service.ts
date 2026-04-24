import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transactional } from '@nestjs-cls/transactional';
import { MercadoPagoService } from '../../mercadopago/services/mercadopago.service.interface';
import { CrearPlanCommand } from './planes.commands';
import type { ICreatePlanResponse } from '@repo/types';
import { PlanComunidad } from '../models/plan.entity';
import { CicloPago } from '../models/ciclo-pago.entity';
import { MONEDAS, MAP_CICLOS_PAGO } from '../../common/constants/planes';
import { PlanesRepository } from '../repositories/planes.repository.interface';
import { PlanesService as IPlanesService } from './planes.service.interface';

/**
 * Servicio encargado de la lógica de negocio para la gestión de Planes.
 * Implementa la interfaz IPlanesService para mantener un contrato claro.
 */
@Injectable()
export class PlanesService implements IPlanesService {
  private readonly logger = new Logger(PlanesService.name);

  public constructor(
    private readonly planesRepository: PlanesRepository,
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Registra un nuevo plan de suscripción asociado a una comunidad.
   * Este proceso incluye la validación de datos, la obtención de constantes de negocio,
   * la creación del plan en Mercado Pago y la persistencia en la base de datos local.
   *
   * @param command - Objeto con los datos necesarios para crear el plan (título, precio, frecuencia, etc.).
   * @returns Una promesa que resuelve con el objeto del plan creado.
   * @throws {BadRequestException} Si los datos del plan son inválidos o la combinación de frecuencia no existe.
   * @throws {InternalServerErrorException} Si falla la comunicación con Mercado Pago o la persistencia en BD.
   */
  @Transactional()
  public async crearPlan(
    command: CrearPlanCommand,
  ): Promise<ICreatePlanResponse> {
    this.validatePlanData(command.titulo, command.precio, command.frecuencia);

    const id_ciclo_pago = this.getCicloPago(
      command.tipo_frecuencia,
      command.frecuencia,
    );

    const id_moneda = this.getMoneda(command.moneda);

    const back_url = this.getBackUrl(command.id_comunidad);

    const { mp_preapproval_plan_id } =
      await this.mercadoPagoService.createPreapprovalPlan({
        titulo: command.titulo,
        descripcion: command.descripcion,
        precio: command.precio,
        frecuencia: command.frecuencia,
        tipo_frecuencia: command.tipo_frecuencia,
        moneda: command.moneda,
        back_url,
      });

    try {
      const plan = await this.planesRepository.guardar({
        titulo: command.titulo,
        descripcion: command.descripcion,
        precio: command.precio,
        id_ciclo_pago,
        id_moneda,
        mp_preapproval_plan_id,
        id_comunidad: command.id_comunidad,
        activa: true,
      });
      return { plan };
    } catch (error) {
      this.logger.error('Error al guardar el plan en BD', error);
      await this.mercadoPagoService.cancelPreapprovalPlan(
        mp_preapproval_plan_id,
      );
      throw new InternalServerErrorException(
        'Error al guardar el plan, intentá de nuevo',
      );
    }
  }

  /**
   * Obtiene la lista de todos los ciclos de pago (frecuencias) configurados y válidos en el sistema.
   *
   * @returns Una promesa que resuelve con un arreglo de ciclos de pago (mensual, anual, etc.).
   */
  public async getValidCiclosPago(): Promise<CicloPago[]> {
    return this.planesRepository.buscarCiclosPago();
  }

  /**
   * Recupera todos los planes de suscripción que pertenecen a una comunidad específica.
   *
   * @param id_comunidad - Identificador único de la comunidad.
   * @returns Una promesa que resuelve con un arreglo de planes de la comunidad.
   */
  public async getPlanesPorComunidad(
    id_comunidad: string,
  ): Promise<PlanComunidad[]> {
    return this.planesRepository.buscarPorComunidad(id_comunidad);
  }

  /**
   * Valida que los datos fundamentales del plan cumplan con las reglas de negocio.
   *
   * @param titulo - Nombre descriptivo del plan.
   * @param precio - Monto a cobrar (debe ser > 0).
   * @param frecuencia - Valor numérico de la frecuencia (debe ser > 0).
   * @throws {BadRequestException} Si alguna de las validaciones falla.
   * @private
   */
  private validatePlanData(
    titulo: string,
    precio: number,
    frecuencia: number,
  ): void {
    if (precio <= 0) {
      throw new BadRequestException('El precio debe ser mayor a cero');
    }
    if (frecuencia <= 0) {
      throw new BadRequestException('La frecuencia debe ser mayor a cero');
    }
    if (!titulo?.trim()) {
      throw new BadRequestException('El título es un campo obligatorio');
    }
  }

  /**
   * Determina el identificador único del ciclo de pago basado en la lógica de negocio.
   * Mapea la combinación de tipo y valor de frecuencia a un ID de la base de datos.
   *
   * @param tipo_frecuencia - El tipo de periodo (ej. 'months', 'days').
   * @param frecuencia - La cantidad de periodos.
   * @returns El ID del ciclo de pago correspondiente.
   * @throws {BadRequestException} Si la combinación proporcionada no está mapeada en el sistema.
   * @private
   */
  private getCicloPago(tipo_frecuencia: string, frecuencia: number): string {
    const key = `${tipo_frecuencia}:${frecuencia}`;
    const id_ciclo_pago = MAP_CICLOS_PAGO[key];

    if (!id_ciclo_pago) {
      throw new BadRequestException(
        'La combinación de frecuencia y tipo no es válida',
      );
    }
    return id_ciclo_pago;
  }

  /**
   * Obtiene el identificador interno de la moneda a partir de su código ISO (ej. 'ARS').
   *
   * @param moneda - Código ISO de la moneda.
   * @returns El ID interno de la moneda.
   * @throws {BadRequestException} Si la moneda no está soportada.
   * @private
   */
  private getMoneda(moneda: string): string {
    const id_moneda = MONEDAS[moneda as keyof typeof MONEDAS];
    if (!id_moneda) {
      throw new BadRequestException('Moneda no válida');
    }
    return id_moneda;
  }

  /**
   * Construye la URL de retorno (Back URL) para que Mercado Pago redireccione al usuario
   * una vez finalizado el proceso de suscripción en su plataforma.
   *
   * @param id_comunidad - ID de la comunidad para construir la ruta de retorno.
   * @returns La URL completa de redirección.
   * @throws {InternalServerErrorException} Si la configuración del sistema no tiene definida la URL del frontend.
   * @private
   */
  private getBackUrl(id_comunidad: string): string {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    if (!frontendUrl) {
      throw new InternalServerErrorException('No se configuro el FRONTEND_URL');
    }

    const sanitizedFrontendUrl = frontendUrl.replace(/\/$/, '');
    return `${sanitizedFrontendUrl}/comunidades/${id_comunidad}`;
  }
}
