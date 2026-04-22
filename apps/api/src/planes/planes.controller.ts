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
import { PlanesService } from './planes.service';
import { CrearPlanDto } from './dto/crear-plan.dto';
import { ICreatePlanResponse } from '@repo/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async crearPlan(@Body() dto: CrearPlanDto): Promise<ICreatePlanResponse> {
    return this.planesService.crearPlan(dto);
  }

  // TODO: validar que req.user.id_usuario sea creador de la comunidad (ownership)

  /**
   * Obtiene las configuraciones de ciclos de pago válidos (frecuencia/tipo).
   * Se usa para poblar los selectores del formulario de creación de planes.
   */
  @Get('config/ciclos-pago')
  public async getCiclosPago() {
    return this.planesService.getValidCiclosPago();
  }

  /**
   * Obtiene la lista de planes asociados a una comunidad.
   * Devuelve todos los planes (activos e inactivos).
   *
   * @param id_comunidad ID numérico de la comunidad
   */
  @Get('comunidad/:id_comunidad')
  public async getPlanesPorComunidad(@Param('id_comunidad') id_comunidad: string) {
    return this.planesService.getPlanesPorComunidad(id_comunidad);
  }
}
