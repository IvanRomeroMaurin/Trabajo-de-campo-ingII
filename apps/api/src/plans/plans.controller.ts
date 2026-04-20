import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { ICreatePlanResponse } from '@repo/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('plans')
@UseGuards(JwtAuthGuard)
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crearPlan(@Body() dto: CreatePlanDto): Promise<ICreatePlanResponse> {
    return this.plansService.crearPlan(dto);
  }

  // TODO: validar que req.user.id_usuario sea creador de la comunidad (ownership)
}
