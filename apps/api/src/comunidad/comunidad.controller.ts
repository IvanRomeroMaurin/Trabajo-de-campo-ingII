import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComunidadService } from './comunidad.service';
import { CrearComunidadDto } from './dto/crear-comunidad.dto';
import { ActualizarComunidadDto } from './dto/actualizar-comunidad.dto';
import { IComunidad, IUsuario } from '@repo/types';

/**
 * Controlador de Comunidades
 * Gestiona los endpoints REST para el CRUD de comunidades.
 *
 * Rutas públicas:  GET /comunidades, GET /comunidades/:id
 * Rutas privadas:  POST /comunidades, GET /comunidades/mis-comunidades,
 *                  PATCH /comunidades/:id, DELETE /comunidades/:id
 */
@Controller('comunidades')
export class ComunidadController {
  constructor(private readonly comunidadService: ComunidadService) { }

  /**
   * Crea una nueva comunidad.
   * La comunidad se crea con activa = false y el creador se registra como
   * miembro con rol "Creador" (id_rol = 1) automáticamente vía agregarMiembro().
   * @route POST /comunidades
   * @access Protegido (JWT)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async crearComunidad(
    @Body() dto: CrearComunidadDto,
    @Request() req: { user: IUsuario },
  ): Promise<IComunidad> {
    return this.comunidadService.crearComunidad(dto, req.user.id_usuario.toString());
  }

  /**
   * Lista todas las comunidades activas.
   * @route GET /comunidades
   * @access Público
   */
  @Get()
  public async getComunidades(): Promise<IComunidad[]> {
    return this.comunidadService.getComunidades();
  }

  /**
   * Obtiene la lista de categorías para comunidades.
   * @route GET /comunidades/categorias
   * @access Público
   */
  @Get('categorias')
  public async getCategorias(): Promise<any[]> {
    return this.comunidadService.getCategorias();
  }

  /**
   * Lista las comunidades donde el usuario autenticado es el Creador.
   * IMPORTANTE: esta ruta DEBE ir antes de GET /:id para que NestJS
   * no la interprete como un parámetro dinámico.
   * @route GET /comunidades/mis-comunidades
   * @access Protegido (JWT)
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('mis-comunidades')
  public async getMisComunidades(
    @Request() req: { user: IUsuario },
  ): Promise<IComunidad[]> {
    return this.comunidadService.getMisComunidades(req.user.id_usuario.toString());
  }

  /**
   * Obtiene una comunidad por su slug.
   * @route GET /comunidades/:slug
   * @access Público
   */
  @Get(':slug([a-zA-Z0-9\\-]+)')
  public async getComunidadPorSlug(@Param('slug') slug: string): Promise<IComunidad> {
    return this.comunidadService.getComunidadPorSlug(slug);
  }

  /**
   * Obtiene una comunidad por su ID.
   * @route GET /comunidades/:id
   * @access Público
   */
  @Get(':id(\\d+)')
  public async getComunidad(@Param('id') id: string): Promise<IComunidad> {
    return this.comunidadService.getComunidad(id);
  }

  /**
   * Modifica los datos de una comunidad. Solo el creador puede hacerlo.
   * @route PATCH /comunidades/:id
   * @access Protegido (JWT)
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  public async actualizarComunidad(
    @Param('id') id: string,
    @Body() dto: ActualizarComunidadDto,
    @Request() req: { user: IUsuario },
  ): Promise<IComunidad> {
    return this.comunidadService.actualizarComunidad(id, dto, req.user.id_usuario.toString());
  }

  /**
   * Baja lógica de la comunidad (activa = false). Solo el creador puede hacerlo.
   * @route DELETE /comunidades/:id
   * @access Protegido (JWT)
   */
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async desactivarComunidad(
    @Param('id') id: string,
    @Request() req: { user: IUsuario },
  ): Promise<{ mensaje: string }> {
    return this.comunidadService.desactivarComunidad(id, req.user.id_usuario.toString());
  }
}
