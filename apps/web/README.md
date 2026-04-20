# Komu – Web Application

Esta es la aplicación web de **Komu**, una plataforma diseñada para aprender, crear y crecer a través de comunidades educativas.

## Tecnologías

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Arquitectura**: Feature-based organization

## Estructura del Proyecto

- `src/app`: Rutas y layouts agrupados por dominio (auth, marketing, plataforma, legal).
- `src/features`: Lógica de negocio y componentes organizados por funcionalidad.
- `src/components`: Componentes UI genéricos y de layout global.
- `src/shared`: Utilidades, clientes de API y hooks compartidos.

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Producción

Para construir la aplicación para producción:

```bash
pnpm build
pnpm start
```
