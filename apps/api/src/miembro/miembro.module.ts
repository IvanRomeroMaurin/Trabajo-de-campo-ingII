import { Module } from '@nestjs/common';
import { MiembroService } from './miembro.service';

@Module({
  providers: [MiembroService],
  exports: [MiembroService],
})
export class MiembroModule {}
