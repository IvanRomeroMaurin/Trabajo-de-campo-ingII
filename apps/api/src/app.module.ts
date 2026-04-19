import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PlansModule } from './plans/plans.module';
import { join } from 'path';

@Module({
  imports: [
    // ConfigModule DEBE ser el primero: garantiza que JWT_SECRET esté disponible
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsuariosModule,
    PlansModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
