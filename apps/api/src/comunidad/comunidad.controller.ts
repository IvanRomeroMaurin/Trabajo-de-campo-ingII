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
import { ComunidadService } from './services/comunidad.service.interface';
import { CrearComunidadDto } from './dto/crear-comunidad.dto';
import { ActualizarComunidadDto } from './dto/actualizar-comunidad.dto';
import { IComunidad, IUsuario } from '@repo/types';

/**
 * Controlador de Comunidades.
 * Gestiona los endpoints REST y mapea los DTOs a Comandos de negocio.
 */
@Controller('comunidades')
export class ComunidadController {
  public constructor(private readonly comunidadService: ComunidadService) {}

  /**
   * Crea una nueva comunidad.
   * Mapea el DTO de la petición al comando de creación del servicio.
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async crearComunidad(
    @Body() dto: CrearComunidadDto,
    @Request() req: { user: IUsuario },
  ): Promise<IComunidad> {
    return this.comunidadService.crearComunidad(
      {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        portada_url: dto.portada_url,
        id_categoria_comunidad: dto.id_categoria_comunidad,
      },
      req.user.id_usuario.toString(),
    );
  }

  /**
   * Lista todas las comunidades activas.
   */
  @Get()
  public async getComunidades(): Promise<IComunidad[]> {
    return this.comunidadService.getComunidades();
  }

  /**
   * Lista las comunidades donde el usuario autenticado es el Creador.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('mis-comunidades')
  public async getMisComunidades(
    @Request() req: { user: IUsuario },
  ): Promise<IComunidad[]> {
    return this.comunidadService.getMisComunidades(
      req.user.id_usuario.toString(),
    );
  }

  /**
   * Obtiene una comunidad por su slug.
   */
  @Get('s/:slug')
  public async getComunidadPorSlug(
    @Param('slug') slug: string,
  ): Promise<IComunidad> {
    return this.comunidadService.getComunidadPorSlug(slug);
  }

  /**
   * Obtiene una comunidad por su ID.
   */
  @Get(':id')
  public async getComunidad(@Param('id') id: string): Promise<IComunidad> {
    return this.comunidadService.getComunidad(id);
  }

  /**
   * Modifica los datos de una comunidad. Solo el creador puede hacerlo.
   * Mapea el DTO de la petición al comando de actualización.
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  public async actualizarComunidad(
    @Param('id') id: string,
    @Body() dto: ActualizarComunidadDto,
    @Request() req: { user: IUsuario },
  ): Promise<IComunidad> {
    return this.comunidadService.actualizarComunidad(
      id,
      {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        portada_url: dto.portada_url,
        id_categoria_comunidad: dto.id_categoria_comunidad,
      },
      req.user.id_usuario.toString(),
    );
  }

  /**
   * Baja lógica de la comunidad (activa = false).
   */
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async desactivarComunidad(
    @Param('id') id: string,
    @Request() req: { user: IUsuario },
  ): Promise<{ mensaje: string }> {
    return this.comunidadService.desactivarComunidad(
      id,
      req.user.id_usuario.toString(),
    );
  }

  /**
   * Alta lógica de la comunidad (activa = true).
   */
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post(':id/reactivar')
  public async reactivarComunidad(
    @Param('id') id: string,
    @Request() req: { user: IUsuario },
  ): Promise<{ mensaje: string }> {
    return this.comunidadService.reactivarComunidad(
      id,
      req.user.id_usuario.toString(),
    );
  }
}
