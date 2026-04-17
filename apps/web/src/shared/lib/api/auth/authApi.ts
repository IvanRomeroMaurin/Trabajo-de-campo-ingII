'use server';

import { api } from '../client';
import { endpoints } from '../endpoints';
import type { IUsuario, IRespuestaAuth, IRegistrarUsuario } from '@repo/types';

export async function loginApi(credentials: { email: string; password: string }) {
  return api.post<IRespuestaAuth>(endpoints.auth.login, credentials);
}

export async function registerApi(data: IRegistrarUsuario & { password: string }) {
  return api.post<IUsuario>(endpoints.auth.register, data);
}

export async function getProfileApi() {
  return api.get<Partial<IUsuario>>(endpoints.auth.profile);
}
