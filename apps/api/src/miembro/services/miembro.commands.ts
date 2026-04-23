export interface AgregarMiembroCommand {
  id_usuario: string;
  id_comunidad: string;
  id_rol: string;
}

export interface CambiarRolMiembroCommand {
  id_usuario: string;
  id_comunidad: string;
  id_rol_nuevo: string;
}
