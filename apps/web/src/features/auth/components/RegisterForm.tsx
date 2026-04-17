'use client';

import { useActionState } from 'react';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { registerAction } from '@/features/auth/actions/registerAction';
import { FormInput } from '@/components/ui/FormInput';
import { Button } from '@/components/ui/Button';
import { AlertMessage } from '@/components/ui/AlertMessage';

const initialState = { success: false, message: '' };

export function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-5">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Nombre"
          name="nombre"
          type="text"
          placeholder="Juan"
          autoComplete="given-name"
          required
          icon={<User size={15} />}
        />
        <FormInput
          label="Apellido"
          name="apellido"
          type="text"
          placeholder="Pérez"
          autoComplete="family-name"
          required
          icon={<User size={15} />}
        />
      </div>

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
        placeholder="Mínimo 6 caracteres"
        autoComplete="new-password"
        required
        icon={<Lock size={15} />}
      />

      <FormInput
        label="Confirmar contraseña"
        name="confirmarPassword"
        type="password"
        placeholder="Repetí tu contraseña"
        autoComplete="new-password"
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
        icon={<UserPlus size={18} />}
        className="mt-4 py-4 text-lg"
      >
        Crear mi cuenta
      </Button>

    </form>
  );
}
