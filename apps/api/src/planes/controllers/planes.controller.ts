import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PlanesService } from '../services/planes.service.interface';
import { CrearPlanDto } from '../dto/crear-plan.dto';
import { ICreatePlanResponse } from '@repo/types';
import { PlanComunidad } from '../models/plan.entity';
import { CicloPago } from '../models/ciclo-pago.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ComunidadOwnerGuard } from '../../common/guards/comunidad-owner.guard';

@ApiTags('Planes')
@ApiBearerAuth()
@Controller('planes')
@UseGuards(JwtAuthGuard)
export class PlanesController {
  public constructor(private readonly planesService: PlanesService) {}

  /**
   * Endpoint para crear un nuevo plan de suscripción.
   * Requiere autenticación JWT.
   *
   * @param dto - Datos del plan enviados en el cuerpo de la solicitud.
   * @returns El plan creado y la información de integración con Mercado Pago.
   */
  @ApiOperation({ summary: 'Crea un nuevo plan de suscripción' })
  @ApiResponse({ status: 201, description: 'Plan creado exitosamente.' })
  @UseGuards(JwtAuthGuard, ComunidadOwnerGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async crearPlan(
    @Body() dto: CrearPlanDto,
  ): Promise<ICreatePlanResponse> {
    return this.planesService.crearPlan({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      precio: dto.precio,
      frecuencia: dto.frecuencia,
      tipo_frecuencia: dto.tipo_frecuencia,
      moneda: dto.moneda,
      id_comunidad: dto.id_comunidad,
    });
  }


  /**
   * Obtiene las configuraciones de ciclos de pago válidos (frecuencia/tipo).
   * Se usa para poblar los selectores del formulario de creación de planes.
   */
  @ApiOperation({ summary: 'Obtiene los ciclos de pago válidos' })
  @ApiResponse({ status: 200, description: 'Listado de ciclos de pago.', type: [CicloPago] })
  @Get('config/ciclos-pago')
  public async getCiclosPago(): Promise<CicloPago[]> {
    return this.planesService.getValidCiclosPago();
  }

  /**
   * Obtiene la lista de planes asociados a una comunidad.
   * Devuelve todos los planes (activos e inactivos).
   *
   * @param id_comunidad ID numérico de la comunidad
   */
  @ApiOperation({ summary: 'Obtiene los planes de una comunidad' })
  @ApiResponse({ status: 200, description: 'Listado de planes.', type: [PlanComunidad] })
  @Get('comunidad/:id_comunidad')
  public async getPlanesPorComunidad(
    @Param('id_comunidad') id_comunidad: string,
  ): Promise<PlanComunidad[]> {
    return this.planesService.getPlanesPorComunidad(id_comunidad);
  }
}
