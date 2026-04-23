import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma, categoria_comunidad } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CrearComunidadDto } from './dto/crear-comunidad.dto';
import { ActualizarComunidadDto } from './dto/actualizar-comunidad.dto';
import { IComunidad } from '@repo/types';
import { ROLES } from '../common/constants/roles';

/**
 * Servicio de Comunidades
 * Contiene toda la lógica de negocio para la gestión de comunidades:
 * - Generación automática de slug único a partir del nombre
 * - Inserción del creador como miembro con rol "Creador" (id_rol = 1) vía agregarMiembro()
 * - Baja lógica (activa = false) en lugar de eliminación física
 * - Validación de autoría antes de modificar/eliminar
 */
@Injectable()
export class ComunidadService {
  private readonly logger = new Logger(ComunidadService.name);

  constructor(private readonly prisma: PrismaService) { }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  /**
   * Convierte un nombre en un slug URL-friendly.
   * Ej: "SpaceX Academy!!!" → "spacex-academy"
   */
  private generarSlug(nombre: string): string {
    return nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // elimina tildes
      .replace(/[^a-z0-9\s-]/g, '') // elimina caracteres especiales
      .trim()
      .replace(/\s+/g, '-'); // espacios → guiones
  }

  /**
   * Genera un slug único verificando contra la DB.
   * Si "spacex-academy" ya existe, prueba "spacex-academy-2", "spacex-academy-3", etc.
   */
  private async generarSlugUnico(nombre: string): Promise<string> {
    const base = this.generarSlug(nombre);
    let slug = base;
    let contador = 2;

    while (await this.prisma.comunidad.findUnique({ where: { slug } })) {
      slug = `${base}-${contador}`;
      contador++;
    }

    return slug;
  }

  // ─── CRUD Comunidad ───────────────────────────────────────────────────────────

  /**
   * Crea una nueva comunidad e inserta al creador como miembro con rol "Creador" (id_rol = 1).
   * Se ejecuta en una transacción para garantizar atomicidad:
   * si agregarMiembro() falla, se revierte automáticamente la creación de la comunidad.
   *
   * @param dto Datos de la comunidad a crear
   * @param idCreador ID del usuario autenticado que crea la comunidad
   */
  public async crearComunidad(
    dto: CrearComunidadDto,
    idCreador: string,
  ): Promise<IComunidad> {
    const slug = await this.generarSlugUnico(dto.nombre);
    const idCategoria = dto.id_categoria_comunidad;
    const idUsuario = idCreador;

    // Verificar que la categoría existe
    const categoria = await this.prisma.categoria_comunidad.findUnique({
      where: { id_categoria_comunidad: idCategoria },
    });
    if (!categoria) {
      throw new NotFoundException(
        `La categoría con id ${dto.id_categoria_comunidad} no existe`,
      );
    }

    // Transacción: crear comunidad → agregarMiembro (con cliente tx para atomicidad)
    const comunidad = await this.prisma.$transaction(async (tx) => {
      const nuevaComunidad = await tx.comunidad.create({
        data: {
          nombre: dto.nombre,
          slug,
          descripcion: dto.descripcion ?? null,
          portada_url: dto.portada_url ?? null,
          activa: false, // inactiva por defecto hasta que se cree el primer plan
          id_categoria_comunidad: idCategoria,
        },
      });

      // Usar la constante de rol "Creador"
      try {
        await this.agregarMiembro(
          idUsuario,
          nuevaComunidad.id_comunidad,
          ROLES.CREADOR,
          tx,
        );
      } catch {

        throw new InternalServerErrorException(
          'Error al configurar permisos, intentá de nuevo',
        );
      }

      return nuevaComunidad;
    });

    return comunidad as IComunidad;
  }

  /**
   * Lista todas las comunidades activas (endpoint público).
   * Nombre según documentación: getComunidades()
   */
  public async getComunidades(): Promise<IComunidad[]> {
    const comunidades = await this.prisma.comunidad.findMany({
      where: { activa: true },
      include: { categoria_comunidad: true },
      orderBy: { fecha_creacion: 'desc' },
    });

    return comunidades.map((c) => c as IComunidad);
  }

  /**
   * Obtiene todas las categorías de comunidades disponibles.
   * @route GET /comunidades/categorias
   */
  public async getCategorias(): Promise<categoria_comunidad[]> {
    const categorias = await this.prisma.categoria_comunidad.findMany({
      where: { activa: true },
    });

    return categorias;
  }

  /**
   * Lista todas las comunidades en las que el usuario autenticado es Creador (id_rol = 1).
   * @param idCreador ID del usuario autenticado
   */
  public async getMisComunidades(idCreador: string): Promise<IComunidad[]> {
    const miembros = await this.prisma.miembro_comunidad.findMany({
      where: {
        id_usuario: idCreador,
        id_rol_comunidad: ROLES.CREADOR, // solo las que creó
      },
      include: {
        comunidad: {
          include: { categoria_comunidad: true },
        },
      },
    });

    return miembros.map((m) => m.comunidad as IComunidad);
  }

  /**
   * Obtiene una comunidad por su ID (endpoint público).
   * Nombre según documentación: getComunidad(id_comunidad)
   *
   * @param id ID de la comunidad
   */
  public async getComunidad(id: string): Promise<IComunidad> {
    const comunidad = await this.prisma.comunidad.findUnique({
      where: { id_comunidad: id },
      include: { categoria_comunidad: true },
    });

    if (!comunidad) {
      throw new NotFoundException(`La comunidad no fue encontrada`);
    }

    return comunidad as IComunidad;
  }

  /**
   * Obtiene una comunidad por su slug (endpoint público).
   * Nombre según documentación: getComunidadPorSlug(slug)
   *
   * @param slug Slug de la comunidad
   */
  public async getComunidadPorSlug(slug: string): Promise<IComunidad> {
    const comunidad = await this.prisma.comunidad.findUnique({
      where: { slug: slug },
      include: { categoria_comunidad: true },
    });

    if (!comunidad) {
      throw new NotFoundException(`La comunidad no fue encontrada`);
    }

    return comunidad as IComunidad;
  }

  /**
   * Modifica los datos de una comunidad. Solo el creador puede hacerlo.
   * Si se cambia el nombre, regenera el slug.
   *
   * @param id ID de la comunidad a modificar
   * @param dto Campos a actualizar (todos opcionales)
   * @param idUsuario ID del usuario autenticado
   */
  public async actualizarComunidad(
    id: string,
    dto: ActualizarComunidadDto,
    idUsuario: string,
  ): Promise<IComunidad> {
    await this.verificarExistenciaYAutoria(id, idUsuario);

    const data: Prisma.comunidadUpdateInput = {};

    if (dto.nombre !== undefined) {
      data.nombre = dto.nombre;
      data.slug = await this.generarSlugUnico(dto.nombre);
    }
    if (dto.descripcion !== undefined) data.descripcion = dto.descripcion;
    if (dto.portada_url !== undefined) data.portada_url = dto.portada_url;
    if (dto.id_categoria_comunidad !== undefined) {
      const idCategoria = dto.id_categoria_comunidad;
      const categoria = await this.prisma.categoria_comunidad.findUnique({
        where: { id_categoria_comunidad: idCategoria },
      });
      if (!categoria) {
        throw new NotFoundException(
          `La categoría con id ${dto.id_categoria_comunidad} no existe`,
        );
      }
      data.categoria_comunidad = {
        connect: { id_categoria_comunidad: idCategoria },
      };
    }

    const comunidad = await this.prisma.comunidad.update({
      where: { id_comunidad: id },
      data,
    });

    return comunidad as IComunidad;
  }

  /**
   * Baja lógica de la comunidad: se cambia activa = false. Solo el creador puede hacerlo.
   * @param id ID de la comunidad a desactivar
   * @param idUsuario ID del usuario autenticado
   */
  public async desactivarComunidad(
    id: string,
    idUsuario: string,
  ): Promise<{ mensaje: string }> {
    await this.verificarExistenciaYAutoria(id, idUsuario);

    await this.prisma.comunidad.update({
      where: { id_comunidad: id },
      data: { activa: false },
    });

    return {
      mensaje: `La comunidad con id ${id} fue desactivada correctamente`,
    };
  }

  /**
   * Alta lógica de la comunidad: se cambia activa = true. Solo el creador puede hacerlo.
   * @param id ID de la comunidad a reactivar
   * @param idUsuario ID del usuario autenticado
   */
  public async reactivarComunidad(
    id: string,
    idUsuario: string,
  ): Promise<{ mensaje: string }> {
    await this.verificarExistenciaYAutoria(id, idUsuario);

    await this.prisma.comunidad.update({
      where: { id_comunidad: id },
      data: { activa: true },
    });

    return {
      mensaje: `La comunidad con id ${id} fue reactivada correctamente`,
    };
  }

  // ─── Gestión de Miembros ──────────────────────────────────────────────────────

  /**
   * Agrega un usuario como miembro de una comunidad con el rol indicado.
   *
   * Método público y reutilizable desde otros servicios (ej: SuscripcionService).
   * Acepta un cliente Prisma transaccional opcional (`tx`) para poder ejecutarse
   * dentro de una transacción existente y garantizar atomicidad con otras operaciones.
   *
   * Comportamiento:
   * - Si el usuario ya es miembro, actualiza fecha_actualizacion (no duplica el registro).
   * - Si el usuario o la comunidad no existen, lanza NotFoundException.
   *
   * @param id_usuario   ID del usuario a agregar
   * @param id_comunidad ID de la comunidad destino
   * @param id_rol       ID del rol a asignar (1=Creador, 2=Suscriptor, etc.)
   * @param tx           Cliente transaccional de Prisma (opcional)
   */
  public async agregarMiembro(
    id_usuario: string,
    id_comunidad: string,
    id_rol: string,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.prisma;

    // Validar que el usuario existe
    const usuario = await client.usuario.findUnique({
      where: { id_usuario: id_usuario },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario no encontrado`);
    }

    // Validar que la comunidad existe
    const comunidad = await client.comunidad.findUnique({
      where: { id_comunidad: id_comunidad },
    });
    if (!comunidad) {
      throw new NotFoundException(`Comunidad no encontrada`);
    }

    // Verificar si ya es miembro
    const miembroExistente = await client.miembro_comunidad.findFirst({
      where: {
        id_usuario: id_usuario,
        id_comunidad: id_comunidad,
      },
    });

    if (miembroExistente) {
      // Si ya existe → actualizar fecha_actualizacion
      await client.miembro_comunidad.update({
        where: {
          id_usuario_id_comunidad: {
            id_usuario: id_usuario,
            id_comunidad: id_comunidad,
          },
        },
        data: { fecha_actualizacion: new Date() },
      });
    } else {
      // Si no existe -> crear nuevo registro de miembro
      await client.miembro_comunidad.create({
        data: {
          id_usuario: id_usuario,
          id_comunidad: id_comunidad,
          id_rol_comunidad: id_rol,
          fecha_ingreso: new Date(),
        },
      });
    }
  }

  /**
   * Cambia el rol de un miembro dentro de una comunidad.
   *
   * @param id_usuario    ID del usuario cuyo rol se va a cambiar
   * @param id_comunidad  ID de la comunidad
   * @param id_rol_nuevo  ID del nuevo rol a asignar
   */
  public async cambiarRolMiembro(
    id_usuario: string,
    id_comunidad: string,
    id_rol_nuevo: string,
  ): Promise<void> {
    // Verificar que el miembro existe en la comunidad
    const miembro = await this.prisma.miembro_comunidad.findFirst({
      where: {
        id_usuario: id_usuario,
        id_comunidad: id_comunidad,
      },
    });

    if (!miembro) {
      throw new NotFoundException(
        `El usuario ${id_usuario} no es miembro de la comunidad ${id_comunidad}`,
      );
    }

    // Verificar que el nuevo rol existe
    const rol = await this.prisma.rol.findUnique({
      where: { id_rol: id_rol_nuevo },
    });
    if (!rol) {
      throw new NotFoundException(`El rol con id ${id_rol_nuevo} no existe`);
    }

    await this.prisma.miembro_comunidad.update({
      where: {
        id_usuario_id_comunidad: {
          id_usuario: id_usuario,
          id_comunidad: id_comunidad,
        },
      },
      data: {
        id_rol_comunidad: id_rol_nuevo,
        fecha_actualizacion: new Date(),
      },
    });
  }

  // ─── Guards de negocio ────────────────────────────────────────────────────────

  /**
   * Verifica que la comunidad exista y que el usuario sea su creador (id_rol = 1).
   * Lanza NotFoundException si no existe, ForbiddenException si no es el creador.
   */
  private async verificarExistenciaYAutoria(
    idComunidad: string,
    idUsuario: string,
  ): Promise<void> {
    const comunidad = await this.prisma.comunidad.findUnique({
      where: { id_comunidad: idComunidad },
    });

    if (!comunidad) {
      throw new NotFoundException(`La comunidad no fue encontrada`);
    }

    const esCreador = await this.prisma.miembro_comunidad.findFirst({
      where: {
        id_comunidad: idComunidad,
        id_usuario: idUsuario,
        id_rol_comunidad: ROLES.CREADOR, // Creador
      },
    });

    if (!esCreador) {
      throw new ForbiddenException(
        'No tenés permisos para modificar esta comunidad',
      );
    }
  }

  /**
   * Setea activa = true en la comunidad cuando se crea su primer plan.
   * Corresponde al paso activarComunidad del diagrama de secuencia.
   */
  public async activarComunidad(
    tx: Prisma.TransactionClient,
    id_comunidad: string,
  ): Promise<void> {
    try {
      await tx.comunidad.update({
        where: { id_comunidad: id_comunidad },
        data: { activa: true },
      });
    } catch {
      throw new InternalServerErrorException(
        'No se pudo activar la comunidad correctamente, intentá de nuevo',
      );
    }
  }
}
