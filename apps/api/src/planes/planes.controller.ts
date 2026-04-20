import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlanesService } from './planes.service';
import { CrearPlanDto } from './dto/crear-plan.dto';
import { ICreatePlanResponse } from '@repo/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('planes')
@UseGuards(JwtAuthGuard)
export class PlanesController {
  constructor(private readonly planesService: PlanesService) { }

  /**
   * Endpoint para crear un nuevo plan de suscripción.
   * Requiere autenticación JWT.
   *
   * @param dto - Datos del plan enviados en el cuerpo de la solicitud.
   * @returns El plan creado y la información de integración con Mercado Pago.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crearPlan(@Body() dto: CrearPlanDto): Promise<ICreatePlanResponse> {
    return this.planesService.crearPlan(dto);
  }

  // TODO: validar que req.user.id_usuario sea creador de la comunidad (ownership)
}
