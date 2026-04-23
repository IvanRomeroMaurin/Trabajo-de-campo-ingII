/**
 * Comando para la creación de un nuevo usuario.
 * Desacopla la lógica de negocio de los DTOs de la capa de transporte (HTTP).
 */
export interface CrearUsuarioCommand {
  nombre: string;
  apellido: string;
  email: string;
  password_hash: string;
  activa?: boolean;
}
