import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { MercadoPagoService } from '../mercadopago/mercadopago.service';
import { ComunidadService } from '../comunidad/comunidad.service';
import { CrearPlanDto } from './dto/crear-plan.dto';
import { ICreatePlanResponse, IPlanComunidad, ICicloPago } from '@repo/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlanesService {
  private readonly logger = new Logger(PlanesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly configService: ConfigService,
    private readonly comunidadService: ComunidadService,
  ) {}

  /**
   * Registra un nuevo plan de suscripción asociado a una comunidad.
   * Implementa el contrato de operación crearPlan del documento de diseño.
   * Sincroniza con Mercado Pago y activa la comunidad si es el primer plan.
   *
   * @param dto - Objeto con los datos necesarios para crear el plan (titulo, precio, frecuencia, etc.)
   * @returns Una promesa que resuelve con el plan creado mapeado a ICreatePlanResponse.
   * @throws BadRequestException si los datos del plan no son válidos.
   * @throws InternalServerErrorException si hay problemas con la configuración o la persistencia.
   */
  async crearPlan(dto: CrearPlanDto): Promise<ICreatePlanResponse> {
    // PASO 1 — validatePlanData
    this.validatePlanData(dto.titulo, dto.precio, dto.frecuencia);

    // PASO 2 — getCicloPago
    const cicloPago = await this.getCicloPago(
      dto.frecuencia,
      dto.tipo_frecuencia,
    );

    // PASO 3 — getMoneda
    const moneda = await this.getMoneda(dto.moneda);

    // PASO 4 — createPreapprovalPlan
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    if (!frontendUrl) {
      throw new InternalServerErrorException('No se configuro el FRONTEND_URL');
    }

    // Limpiamos la URL de posibles barras al final y construimos la back_url
    const sanitizedFrontendUrl = frontendUrl.replace(/\/$/, '');
    const back_url = `${sanitizedFrontendUrl}/comunidades/${dto.id_comunidad}`;

    const { mp_preapproval_plan_id } =
      await this.mercadoPagoService.createPreapprovalPlan({
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        precio: dto.precio,
        frecuencia: dto.frecuencia,
        tipo_frecuencia: dto.tipo_frecuencia,
        moneda: dto.moneda,
        back_url,
      });

    // PASO 5 — guardarPlanComunidad dentro de prisma.$transaction con try/catch
    try {
      const plan = await this.prisma.$transaction(async (tx) => {
        return this.guardarPlanComunidad(tx, {
          titulo: dto.titulo,
          descripcion: dto.descripcion,
          precio: dto.precio,
          id_ciclo_pago: cicloPago.id_ciclo_pago.toString(),
          id_moneda: moneda.id_moneda.toString(),
          mp_preapproval_plan_id,
          id_comunidad: dto.id_comunidad,
        });
      });
      return { plan };
    } catch (error) {
      await this.mercadoPagoService.cancelPreapprovalPlan(
        mp_preapproval_plan_id,
      );
      throw new InternalServerErrorException(
        'Error al guardar el plan, intentá de nuevo',
      );
    }
  }

  /**
   * Valida los datos de negocio del plan antes de procesar.
   * Corresponde al paso validatePlanData del diagrama de secuencia.
   *
   * @param titulo - El nombre del plan.
   * @param precio - El costo de la suscripción (debe ser > 0).
   * @param frecuencia - El intervalo de tiempo del ciclo (debe ser > 0).
   * @returns void
   * @throws BadRequestException si alguna validación falla.
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
   * Busca el ciclo de pago por frecuencia y tipo.
   * Corresponde al paso getCicloPago del diagrama de secuencia.
   *
   * @param frecuencia - Ejemplo: 1, 3, 6.
   * @param tipo_frecuencia - Ejemplo: 'months', 'days'.
   * @returns El registro del ciclo de pago encontrado en la base de datos.
   * @throws BadRequestException si el ciclo solicitado no existe.
   */
  private async getCicloPago(frecuencia: number, tipo_frecuencia: string) {
    const cicloPago = await this.prisma.ciclo_pago.findFirst({
      where: { frecuencia, tipo_frecuencia },
    });
    if (!cicloPago) {
      throw new BadRequestException(
        'Frecuencia o tipo de frecuencia de pago no válida',
      );
    }
    return cicloPago;
  }

  /**
   * Busca la moneda por su código.
   * Corresponde al paso getMoneda del diagrama de secuencia.
   *
   * @param moneda - Código de la moneda (ej: 'ARS', 'USD').
   * @returns El registro de la moneda encontrado en la base de datos.
   * @throws BadRequestException si la moneda no existe.
   */
  private async getMoneda(moneda: string) {
    const registroMoneda = await this.prisma.moneda.findFirst({
      where: { moneda },
    });
    if (!registroMoneda) {
      throw new BadRequestException('Moneda no válida');
    }
    return registroMoneda;
  }

  /**
   * Persiste el plan en BD dentro de una transacción.
   * Si es el primer plan activo de la comunidad, activa la comunidad.
   * Corresponde al paso guardarPlanComunidad del diagrama de secuencia.
   *
   * @param tx - Cliente transaccional de Prisma.
   * @param data - Objeto con los datos a persistir, incluyendo IDs ya procesados.
   * @returns El objeto del plan creado y serializado.
   */
  private async guardarPlanComunidad(
    tx: Prisma.TransactionClient,
    data: {
      titulo: string;
      descripcion?: string;
      precio: number;
      id_ciclo_pago: string;
      id_moneda: string;
      mp_preapproval_plan_id: string;
      id_comunidad: string;
    },
  ): Promise<IPlanComunidad> {
    // a. Crear el registro
    const plan = await tx.plan_comunidad.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        precio: data.precio,
        id_ciclo_pago: BigInt(data.id_ciclo_pago),
        id_moneda: BigInt(data.id_moneda),
        mp_preapproval_plan_id: data.mp_preapproval_plan_id,
        id_comunidad: BigInt(data.id_comunidad),
        activa: true,
        fecha_creacion: new Date(),
      },
    });

    // b. Contar planes activos
    const count = await tx.plan_comunidad.count({
      where: { id_comunidad: BigInt(data.id_comunidad), activa: true },
    });

    // c. Si count === 1 → activar comunidad
    if (count === 1) {
      await this.comunidadService.activarComunidad(tx, data.id_comunidad);
    }

    // d. Retornar el plan creado mapeado a IPlanComunidad
    return {
      ...plan,
      id_plan_comunidad: plan.id_plan_comunidad.toString(),
      id_comunidad: plan.id_comunidad.toString(),
      id_ciclo_pago: plan.id_ciclo_pago.toString(),
      id_moneda: plan.id_moneda.toString(),
      precio: Number(plan.precio),
      descripcion: plan.descripcion ?? undefined,
      mp_preapproval_plan_id: plan.mp_preapproval_plan_id ?? undefined,
    } as IPlanComunidad;
  }

  /**
   * Obtiene la lista de ciclos de pago configurados en la base de datos.
   * Útil para poblar selectores en el frontend.
   *
   * @returns Lista de ciclos de pago (frecuencia y tipo).
   */
  async getValidCiclosPago(): Promise<ICicloPago[]> {
    const ciclos = await this.prisma.ciclo_pago.findMany({
      orderBy: [{ tipo_frecuencia: 'asc' }, { frecuencia: 'asc' }],
    });

    return ciclos.map((c) => ({
      ...c,
      id_ciclo_pago: c.id_ciclo_pago.toString(),
    }));
  }

  /**
   * Obtiene todos los planes asociados a una comunidad específica.
   * Devuelve tanto activos como inactivos para gestión del creador.
   *
   * @param id_comunidad - ID de la comunidad a consultar.
   * @returns Lista de planes con detalles de ciclo y moneda.
   */
  async getPlanesPorComunidad(id_comunidad: string): Promise<IPlanComunidad[]> {
    const planes = await this.prisma.plan_comunidad.findMany({
      where: { id_comunidad: BigInt(id_comunidad) },
      include: {
        ciclo_pago: true,
        moneda: true,
      },
      orderBy: { fecha_creacion: 'desc' },
    });

    return planes.map((p) => ({
      ...p,
      id_plan_comunidad: p.id_plan_comunidad.toString(),
      id_comunidad: p.id_comunidad.toString(),
      id_ciclo_pago: p.id_ciclo_pago.toString(),
      id_moneda: p.id_moneda.toString(),
      precio: Number(p.precio),
      descripcion: p.descripcion ?? undefined,
      mp_preapproval_plan_id: p.mp_preapproval_plan_id ?? undefined,
      // Serializar relaciones anidadas que también tienen BigInt
      ciclo_pago: p.ciclo_pago
        ? {
            ...p.ciclo_pago,
            id_ciclo_pago: p.ciclo_pago.id_ciclo_pago.toString(),
          }
        : undefined,
      moneda: p.moneda
        ? {
            ...p.moneda,
            id_moneda: p.moneda.id_moneda.toString(),
          }
        : undefined,
    })) as IPlanComunidad[];
  }
}
