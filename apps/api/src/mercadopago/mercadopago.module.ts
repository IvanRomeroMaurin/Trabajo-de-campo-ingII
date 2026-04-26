import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IMercadoPagoService } from './services/mercadopago.service.interface';
import { MercadoPagoService } from './services/mercadopago.service';


@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: IMercadoPagoService,
      useClass: MercadoPagoService,
    },
  ],
  exports: [IMercadoPagoService],
})
export class MercadoPagoModule {}
