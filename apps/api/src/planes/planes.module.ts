import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { MercadoPagoModule } from '../mercadopago/mercadopago.module';
import { PlanesController } from './planes.controller';
import { PlanesService } from './services/planes.service.interface';
import { PlanesService as PlanesServiceImpl } from './services/planes.service';
import { PlanesRepository } from './repositories/planes.repository.interface';
import { PrismaPlanesRepository } from './repositories/prisma-planes.repository';

@Module({
  imports: [PrismaModule, MercadoPagoModule, ConfigModule],
  controllers: [PlanesController],
  providers: [
    {
      provide: PlanesService,
      useClass: PlanesServiceImpl,
    },
    {
      provide: PlanesRepository,
      useClass: PrismaPlanesRepository,
    },
  ],
  exports: [PlanesService, PlanesRepository],
})
export class PlanesModule {}
