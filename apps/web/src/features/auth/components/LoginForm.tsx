'use client';

import { useActionState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { loginAction } from '@/features/auth/actions/loginAction';
import { FormInput } from '@/components/ui/FormInput';
import { Button } from '@/components/ui/Button';
import { AlertMessage } from '@/components/ui/AlertMessage';

const initialState = { success: false, message: '' };

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-6">

      <FormInput
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder="tu@email.com"
        autoComplete="email"
        required
        icon={<Mail size={15} />}
      />

      <FormInput
        label="Contraseña"
        name="password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        required
        icon={<Lock size={15} />}
      />

      {state.message && (
        <AlertMessage
          type={state.success ? 'success' : 'error'}
          message={state.message}
        />
      )}

      <Button
        type="submit"
        isLoading={isPending}
        fullWidth
        icon={<LogIn size={18} />}
        className="mt-4 py-4 text-lg"
      >
        Iniciar Sesión
      </Button>

    </form>
  );
}
