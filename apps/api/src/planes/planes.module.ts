import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { MercadoPagoModule } from '../mercadopago/mercadopago.module';
import { PlanesController } from './controllers/planes.controller';
import { IPlanesService } from './services/planes.service.interface';
import { PlanesService } from './services/planes.service';
import { IPlanesRepository } from './repositories/planes.repository.interface';
import { PrismaPlanesRepository } from './repositories/prisma-planes.repository';
import { ComunidadModule } from '../comunidad/comunidad.module';

@Module({
  imports: [PrismaModule, MercadoPagoModule, ConfigModule, ComunidadModule],
  controllers: [PlanesController],
  providers: [
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

export class PlanesModule { }
