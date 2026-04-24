import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ComunidadRepository } from '../../comunidad/repositories/comunidad.repository.interface';
import { MiembroService } from '../../miembro/services/miembro.service.interface';
import type { IUsuario } from '@repo/types';

/**
 * Guardia que verifica que el usuario autenticado sea el creador de la comunidad.
 * Busca el ID de la comunidad en los parámetros (:id, :id_comunidad) o en el cuerpo de la petición.
 */
@Injectable()
export class ComunidadOwnerGuard implements CanActivate {
  public constructor(
    @Inject(ComunidadRepository)
    private readonly comunidadRepository: ComunidadRepository,
    private readonly miembroService: MiembroService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      user: IUsuario;
      params: { id?: string; id_comunidad?: string };
      body: { id_comunidad?: string };
    }>();
    const user = request.user;

    // Buscar el ID en params (:id o :id_comunidad) o en el body
    const idComunidad =
      request.params.id ||
      request.params.id_comunidad ||
      request.body.id_comunidad;

    // Si no hay usuario (AuthGuard no corrió) o no hay ID, denegar.
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
