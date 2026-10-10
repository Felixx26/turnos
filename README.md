# Turnos

> 🚧 En desarrollo.

Sistema de reservas para pequeños negocios (barberías, consultorios, estudios) que hoy gestionan sus citas por WhatsApp y acaban con citas solapadas. Ofrece una página pública donde el cliente reserva sin crear cuenta y un panel para que el negocio gestione su agenda.

## Qué incluye el MVP

- Servicios con duración y precio, horario semanal y días bloqueados.
- Página pública con huecos libres y reserva sin cuenta.
- Bloqueo contra doble reserva garantizado por la base de datos.
- Email de confirmación con enlace para cancelar.
- Panel con login: agenda del día y de la semana, cancelar citas.

## Stack

| Parte | Tecnología |
| --- | --- |
| Monorepo | pnpm workspaces |
| API | Node.js, TypeScript, Fastify |
| Base de datos | PostgreSQL 16, Drizzle |
| Frontend | React, Vite, TanStack Query |
| Tipos y validación compartidos | Zod (`packages/shared`) |
| Emails | Resend (producción), Mailpit (local) |
| Tests | Vitest, Testcontainers |
| CI | GitHub Actions (lint, typecheck, tests, build) |

## Estructura

```
apps/
  api/       API en Fastify
  web/       frontend en React + Vite
packages/
  shared/    esquemas Zod y lógica pura compartida (p. ej. el cálculo de huecos)
```

## Cómo ejecutarlo en local

Requisitos: Node.js 24 (ver `.nvmrc`), pnpm y Docker.

```sh
cp .env.example .env
docker compose up -d     # Postgres en :5432 y Mailpit en :8025
pnpm install
pnpm dev                 # API en :3000 y web en :5173
```

En local, el frontend envía `/api/*` a la API a través del proxy de Vite. En producción lo hará un rewrite de Vercel. Así el navegador solo ve un origen y la cookie de sesión funciona sin `SameSite=None`.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Levanta todos los paquetes en modo desarrollo |
| `pnpm lint` | ESLint en todo el repo |
| `pnpm typecheck` | Comprobación de tipos en cada paquete |
| `pnpm test` | Tests con Vitest |
| `pnpm build` | Compila todos los paquetes |
