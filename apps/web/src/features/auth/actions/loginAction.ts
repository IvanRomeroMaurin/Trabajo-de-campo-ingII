'use server';

import { authService } from '../services/authService';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { IUsuario } from '@repo/types';

export interface FormState {
  success: boolean;
  message?: string;
  user?: Partial<IUsuario>;
}

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'El correo y la contraseña son requeridos' };
  }

  try {
    const response = await authService.login({ email, password });

    const cookieStore = await cookies();
    cookieStore.set('access_token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  } catch {
    return { success: false, message: 'Credenciales inválidas o cuenta inactiva' };
  }

  // Redirigir al home (fuera del try/catch porque redirect lanza internamente)
  redirect('/');
}
