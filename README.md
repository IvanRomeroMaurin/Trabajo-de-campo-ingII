# Proyecto de Ingeniería de Software II

Este repositorio contiene el código fuente para el proyecto de la materia **Ingeniería de Software II**.
Está estructurado como un monorepo utilizando [Turborepo](https://turborepo.org/) para separar las diferentes partes de la aplicación de manera limpia y modular.

## 🚀 Tecnologías Utilizadas

El proyecto está desarrollado utilizando herramientas modernas para garantizar escalabilidad y rendimiento:

**Arquitectura & Herramientas Core:**
- **Turborepo** - Arquitectura de monorepo y sistema de compilación de alta eficiencia.
- **pnpm** - Gestor de paquetes rápido.
- **TypeScript** - Garantizando un tipado fuerte y seguro a lo largo de todo el proyecto (100% tipado).

**Aplicación Frontend:**
- **Next.js** - Múltiples aplicaciones frontend potenciadas con el framework de React.
- **React** - Construcción de interfaces de usuario robustas.

**Servicios Backend (API):**
- **NestJS** - Framework progresivo y robusto para Node.js.
- **Fastify** - Motor web detrás de NestJS de ultra alto rendimiento.
- **Prisma ORM** - Modelado moderno de base de datos y tipado seguro en las consultas.
- **JWT** - Estrategias de autenticación seguras mediante tokens.

## 🛠 Instalación y Configuración Local

Sigue estos pasos para instalar y ejecutar todos los componentes del sistema de forma local.

### Prerrequisitos

Debes asegurarte de tener en tu equipo local:
- [Node.js](https://nodejs.org/) (Versión 18 o superior)
- [pnpm](https://pnpm.io/installation) (Preferentemente en versión 9.x)

### Instalación en 3 Pasos

1. **Clonar el proyecto**
   ```bash
   git clone <URL_DEL_GITHUB>
   cd subscriptions-monorepo
   ```

2. **Instalar dependencias del monorepo**
   ```bash
   # En la raíz del proyecto
   pnpm install
   ```

3. **Configurar el entorno (`.env`) y la Base de Datos**
   
   Asegúrate de preparar y colocar los archivos ambientales `.env`. Esto es especialmente importante para la `api` en `apps/api` (por ejemplo, definir las variables `DATABASE_URL` y `JWT_SECRET`).

   Una vez definidos los accesos, genera y sincroniza la estructura de la base de datos con Prisma:
   ```bash
   cd apps/api
   npx prisma generate
   npx prisma db push   # Aplicar los schemas a la base de datos de desarrollo
   cd ../..
   ```

## 💻 Desarrollo y Compilación

Las utilidades de `Turborepo` permiten levantar todos los entornos con un solo comando centralizado:

```bash
# Iniciar frontend, backend y todos los paquetes en modo desarrollo
pnpm run dev
```

### Otros comandos útiles

- `pnpm run build`: Compila todas las aplicaciones y paquetes a su versión de producción de forma concurrente, aprovechando el caché de Turbo.
- `pnpm run lint`: Ejecuta las validaciones de linteo sobre la base de datos completa de código.
- `pnpm run format`: Aplica Prettier para formatear todos los archivos que lo soporten en base a las reglas configuradas.

## 📦 Estructura de Directorios

- `apps/api`: Servidor Backend estructurado bajo NestJS y conectado vía Prisma.
- `apps/web`: Aplicación cliente basada en Next.js.
- `apps/docs`: Documentación o sistema suplementario en Next.js.
- `packages/*`: Diversos paquetes TypeScript compartidos transversalmente (componentes UI, configuradores TS/ESLint, etc).
