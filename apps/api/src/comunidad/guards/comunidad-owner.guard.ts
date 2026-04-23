import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ComunidadRepository } from '../repositories/comunidad.repository.interface';
import { MiembroService } from '../../miembro/miembro.service';
import { IUsuario } from '@repo/types';

/**
 * Guardia que verifica que el usuario autenticado sea el creador de la comunidad.
 * Se asocia a rutas que tengan el parámetro :id (ID de la comunidad).
 */
@Injectable()
export class ComunidadOwnerGuard implements CanActivate {
  constructor(
    @Inject(ComunidadRepository)
    private readonly comunidadRepository: ComunidadRepository,
    private readonly miembroService: MiembroService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as IUsuario;
    const idComunidad = request.params.id;

    // Si no hay usuario (AuthGuard no corrió) o no hay ID en la URL, denegar.
    if (!user || !idComunidad) {
      return false;
    }

    // 1. Verificar existencia
    const comunidad = await this.comunidadRepository.buscarPorId(idComunidad);
    if (!comunidad) {
      throw new NotFoundException('La comunidad no fue encontrada');
    }

    // 2. Verificar autoría/creador
    const esCreador = await this.miembroService.esCreador(
      user.id_usuario.toString(),
      idComunidad,
    );

    if (!esCreador) {
      throw new ForbiddenException(
        'No tenés permisos para realizar esta acción sobre esta comunidad',
      );
    }

    return true;
  }
}
