import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MercadoPagoService } from './services/mercadopago.service.interface';
import { MercadoPagoService as MercadoPagoServiceImpl } from './services/mercadopago.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MercadoPagoService,
      useClass: MercadoPagoServiceImpl,
    },
  ],
  exports: [MercadoPagoService],
})
export class MercadoPagoModule {}
