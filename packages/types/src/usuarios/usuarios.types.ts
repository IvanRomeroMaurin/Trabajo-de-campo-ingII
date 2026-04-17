export interface IUsuario {
  id_usuario: string;
  nombre: string;
  apellido: string;
  email: string;
  fecha_alta: string | Date;
  activa: boolean;
}
