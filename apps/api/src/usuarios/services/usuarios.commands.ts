/**
 * Comando para la creación de un nuevo usuario.
 * Desacopla la lógica de negocio de los DTOs de la capa de transporte (HTTP).
 */
export interface CrearUsuarioCommand {
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly password_hash: string;
}

