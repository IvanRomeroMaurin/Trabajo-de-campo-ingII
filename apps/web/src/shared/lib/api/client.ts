import { cookies } from 'next/headers';

/**
 * Cliente HTTP Base para Next.js (Servidor + Cliente seguro)
 * Este cliente envuelve `fetch` para inyectar automáticamente configuraciones globales,
 * particularmente el token de acceso JWT recolectado desde cookies HTTP-Only de manera segura.
 */
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Preparar cabeceras. En entornos de Server Action, cookies() es seguro.
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers as Record<string, string> || {}),
    };

    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('access_token');
      if (token?.value) {
        headers['Authorization'] = `Bearer ${token.value}`;
      }
    } catch {
      // Ignoramos errores sincrónicos o si cookies() falla, asumimos falta de token
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Para un manejo robusto, tiramos un error que el Action Server debe atrapar
      throw new Error(`API request failed with status: ${response.status}`);
    }

    // A veces una petición puede ser exitosa pero no devolver un JSON (como un HTTP 204 No Content)
    const text = await response.text();
    return text ? JSON.parse(text) : (undefined as T);
  }

  get<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  post<T>(endpoint: string, body: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  put<T>(endpoint: string, body: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }
}

// Singleton global
export const api = new ApiClient();
