import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsuariosService } from './services/usuarios.service.interface';
import { UsuariosService as UsuariosServiceImpl } from './services/usuarios.service';
import { UsuariosRepository } from './repositories/usuarios.repository.interface';
import { PrismaUsuariosRepository } from './repositories/usuarios.prisma.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UsuariosService,
      useClass: UsuariosServiceImpl,
    },
    {
      provide: UsuariosRepository,
      useClass: PrismaUsuariosRepository,
    },
  ],
  exports: [UsuariosService, UsuariosRepository],
})
export class UsuariosModule {}
