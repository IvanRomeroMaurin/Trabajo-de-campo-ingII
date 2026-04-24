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
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ComunidadService } from '../services/comunidad.service.interface';
import { CrearComunidadDto } from '../dto/crear-comunidad.dto';
import { ActualizarComunidadDto } from '../dto/actualizar-comunidad.dto';
import type { IUsuario } from '@repo/types';
import { Comunidad } from '../models/comunidad.entity';
import { ComunidadOwnerGuard } from '../../common/guards/comunidad-owner.guard';

/**
 * Controlador de Comunidades.
 *
 * Expone los puntos de entrada (endpoints) para la gestión de comunidades,
 * incluyendo la creación, consulta, actualización y reactivación de las mismas.
 * Se encarga de validar la autenticación y los permisos de autoría mediante Guards.
 */
@ApiTags('Comunidades')
@Controller('comunidades')
export class ComunidadController {
  public constructor(private readonly comunidadService: ComunidadService) {}

  /**
   * Crea una nueva comunidad.
   * Requiere que el usuario esté autenticado. El usuario que crea la comunidad
   * se asigna automáticamente como miembro con el rol de CREADOR.
   *
   * @param dto - Datos de la comunidad a crear (nombre, descripción, categoría, etc.).
   * @param req - Objeto de petición que contiene el usuario autenticado.
   * @returns Los datos de la comunidad recién creada.
   */
  @ApiOperation({ summary: 'Crea una nueva comunidad' })
  @ApiResponse({
    status: 201,
    description: 'La comunidad ha sido creada exitosamente.',
    type: Comunidad,
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async crearComunidad(
    @Body() dto: CrearComunidadDto,
    @Req() req: { user: IUsuario },
  ): Promise<Comunidad> {
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
   * Obtiene la lista de todas las comunidades que están activas en el sistema.
   *
   * @returns Un arreglo con todas las comunidades activas.
   */
  @ApiOperation({ summary: 'Obtiene todas las comunidades activas' })
  @ApiResponse({
    status: 200,
    description: 'Listado de comunidades.',
    type: [Comunidad],
  })
  @Get()
  public async getComunidades(): Promise<Comunidad[]> {
    return this.comunidadService.getComunidades();
  }

  /**
   * Obtiene las comunidades creadas por el usuario autenticado.
   *
   * @param req - Objeto de petición que contiene el usuario autenticado.
   * @returns Un arreglo con las comunidades donde el usuario es el Creador.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('mis-comunidades')
  public async getMisComunidades(
    @Req() req: { user: IUsuario },
  ): Promise<Comunidad[]> {
    return this.comunidadService.getMisComunidades(
      req.user.id_usuario.toString(),
    );
  }

  /**
   * Obtiene el detalle de una comunidad específica buscando por su slug.
   *
   * @param slug - El identificador amigable de la comunidad.
   * @returns Los datos de la comunidad encontrada.
   * @throws {NotFoundException} Si la comunidad no existe.
   */
  @Get('s/:slug')
  public async getComunidadPorSlug(
    @Param('slug') slug: string,
  ): Promise<Comunidad> {
    return this.comunidadService.getComunidadPorSlug(slug);
  }

  /**
   * Obtiene el detalle de una comunidad específica buscando por su ID único.
   *
   * @param id - Identificador único de la comunidad.
   * @returns Los datos de la comunidad encontrada.
   * @throws {NotFoundException} Si la comunidad no existe.
   */
  @Get(':id')
  public async getComunidad(@Param('id') id: string): Promise<Comunidad> {
    return this.comunidadService.getComunidad(id);
  }

  /**
   * Actualiza los datos de una comunidad existente.
   * Solo el usuario que creó la comunidad (o con permisos suficientes) puede realizar esta acción.
   *
   * @param id - Identificador único de la comunidad a modificar.
   * @param dto - Datos parciales o totales a actualizar.
   * @returns Los datos de la comunidad actualizada.
   * @throws {ForbiddenException} Si el usuario no es el dueño de la comunidad.
   * @throws {NotFoundException} Si la comunidad no existe.
   */
  @UseGuards(AuthGuard('jwt'), ComunidadOwnerGuard)
  @Patch(':id')
  public async actualizarComunidad(
    @Param('id') id: string,
    @Body() dto: ActualizarComunidadDto,
  ): Promise<Comunidad> {
    return this.comunidadService.actualizarComunidad(id, {
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      portada_url: dto.portada_url,
      id_categoria_comunidad: dto.id_categoria_comunidad,
    });
  }

  /**
   * Realiza una desactivación lógica de la comunidad (baja lógica).
   * Solo el creador de la comunidad puede realizar esta acción.
   *
   * @param id - Identificador único de la comunidad a desactivar.
   * @returns Un mensaje confirmando la desactivación.
   * @throws {ForbiddenException} Si el usuario no es el dueño de la comunidad.
   */
  @UseGuards(AuthGuard('jwt'), ComunidadOwnerGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async desactivarComunidad(
    @Param('id') id: string,
  ): Promise<{ mensaje: string }> {
    return this.comunidadService.desactivarComunidad(id);
  }

  /**
   * Reactiva una comunidad que fue previamente desactivada.
   * Solo el creador de la comunidad puede realizar esta acción.
   *
   * @param id - Identificador único de la comunidad a reactivar.
   * @returns Un mensaje confirmando la reactivación.
   * @throws {ForbiddenException} Si el usuario no es el dueño de la comunidad.
   */
  @UseGuards(AuthGuard('jwt'), ComunidadOwnerGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':id/reactivar')
  public async reactivarComunidad(
    @Param('id') id: string,
  ): Promise<{ mensaje: string }> {
    return this.comunidadService.reactivarComunidad(id);
  }
}
