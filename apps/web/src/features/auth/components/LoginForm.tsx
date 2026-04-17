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
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

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
        icon={<LogIn size={16} />}
        style={{ marginTop: '0.5rem', padding: '0.85rem' }}
      >
        Iniciar Sesión
      </Button>

    </form>
  );
}
