import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { IUsuariosService } from './services/usuarios.service.interface';
import { UsuariosService } from './services/usuarios.service';
import { IUsuariosRepository } from './infrastructure/usuarios.repository.interface';
import { PrismaUsuariosRepository } from './repositories/usuarios.prisma.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IUsuariosService,
      useClass: UsuariosService,
    },
    {
      provide: IUsuariosRepository,
      useClass: PrismaUsuariosRepository,
    },
  ],
  exports: [IUsuariosService],
})

export class UsuariosModule { }
