'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Acción de servidor reusable para cerrar sesión.
 * Borra la cookie de acceso y redirige al usuario.
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  
  // Opcional: Redirigir siempre al home al cerrar sesión
  redirect('/');
}
