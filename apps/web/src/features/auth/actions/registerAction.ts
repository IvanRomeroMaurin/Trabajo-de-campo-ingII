'use server';

import { authService } from '../services/authService';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { IUsuario } from '@repo/types';

export interface RegisterFormState {
  success: boolean;
  message?: string;
  user?: Partial<IUsuario>;
}

export async function registerAction(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const nombre = formData.get('nombre') as string;
  const apellido = formData.get('apellido') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmarPassword = formData.get('confirmarPassword') as string;

  if (!nombre || !apellido || !email || !password || !confirmarPassword) {
    return { success: false, message: 'Todos los campos son requeridos' };
  }

  if (password.length < 6) {
    return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
  }

  if (password !== confirmarPassword) {
    return { success: false, message: 'Las contraseñas no coinciden' };
  }

  try {
    // 1. Registrar el usuario en NestJS
    await authService.registro({ nombre, apellido, email, password });

    // 2. Loguearlo automáticamente obteniendo el token
    const authResponse = await authService.login({ email, password });

    // 3. Guardar el token en cookie HttpOnly (igual que el loginAction)
    const cookieStore = await cookies();
    cookieStore.set('access_token', authResponse.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });
  } catch {
    return { success: false, message: 'El correo ya está en uso o hubo un error. Intentá de nuevo.' };
  }

  // 4. Redirigir al home (fuera del try/catch porque redirect lanza internamente)
  redirect('/');
}
