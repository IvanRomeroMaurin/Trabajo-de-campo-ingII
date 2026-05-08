import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { IUsuario } from '@repo/types';

/**
 * Decorador que extrae el usuario autenticado del request.
 * Reemplaza el uso de @Req() req: { user: IUsuario } por @CurrentUser() usuario: IUsuario.
 *
 * @example
 * public async crearComunidad(
 *   @Body() dto: CrearComunidadDto,
 *   @CurrentUser() usuario: IUsuario,
 * )
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): IUsuario => {
    const request = ctx.switchToHttp().getRequest<{ user: IUsuario }>();
    return request.user;
  },
);
