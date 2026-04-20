import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { MercadoPagoModule } from '../mercadopago/mercadopago.module';
import { ComunidadModule } from '../comunidad/comunidad.module';
import { PlanesController } from './planes.controller';
import { PlanesService } from './planes.service';

@Module({
  imports: [PrismaModule, MercadoPagoModule, ConfigModule, ComunidadModule],
  controllers: [PlanesController],
  providers: [PlanesService],
})
export class PlanesModule {}
