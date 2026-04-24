/**
 * Comandos para el servicio de autenticación.
 */
export interface RegistrarUsuarioCommand {
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly password: string;
}
