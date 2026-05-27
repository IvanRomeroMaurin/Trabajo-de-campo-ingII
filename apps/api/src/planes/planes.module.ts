import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PrismaModule } from '../prisma/prisma.module';
import { MercadoPagoModule } from '../mercadopago/mercadopago.module';
import { ComunidadModule } from '../comunidad/comunidad.module';
import { DomainExceptionFilter } from '../common/filters/domain-exception.filter';
import { PlanesController } from './presentation/controllers/planes.controller';
import { IPlanesService } from './application/services/planes.service.interface';
import { PlanesService } from './application/services/planes.service';
import { IPlanesRepository } from './domain/ports/planes.repository.interface';
import { PrismaPlanesRepository } from './infrastructure/persistence/repositories/planes.prisma.repository';

@Module({
  imports: [PrismaModule, MercadoPagoModule, ConfigModule, ComunidadModule],
  controllers: [PlanesController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
    {
      provide: IPlanesService,
      useClass: PlanesService,
    },
    {
      provide: IPlanesRepository,
      useClass: PrismaPlanesRepository,
    },
  ],
  exports: [IPlanesService],
})
export class PlanesModule {}
