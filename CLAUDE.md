# CLAUDE.md — Turnos

## Propósito del proyecto

**Turnos** es un sistema de reservas para pequeños negocios (barberías, consultorios, estudios) que hoy gestionan sus citas por WhatsApp y se les solapan. Ofrece una página pública de reservas y un panel para el negocio.

Forma parte del portafolio de **Felix Rafael Garcia Martinez** (proyecto #1 de `docs/PROJECT_IDEAS.md`). Su objetivo es demostrar, ante reclutadores y engineering managers, dominio full-stack en un problema real: modelado de datos con reglas de negocio, zonas horarias, concurrencia (evitar doble reserva), autenticación por roles y notificaciones.

## Documentos de referencia

- `plan.txt` → plan acordado: alcance del MVP, stack, modelo de datos, API, plan por semanas y **decisiones pendientes**. Léelo al empezar cada sesión.
- `docs/PROJECT_IDEAS.md` → criterios que debe cumplir todo proyecto del portafolio y contexto de los demás proyectos.

## Alcance

**Dentro del MVP**
- Un negocio con un solo empleado y una sola agenda.
- Servicios (nombre, duración, precio), horario semanal y días bloqueados.
- Página pública con huecos libres y reserva sin cuenta.
- Bloqueo contra doble reserva garantizado por la base de datos.
- Email de confirmación con enlace para cancelar.
- Panel con login: agenda del día y de la semana, cancelar citas.

**Fuera del MVP (no hacer sin que Felix lo pida)**
- Varios empleados, recordatorios, exportar a `.ics`, pagos, varios negocios por cuenta.
- Funcionalidades no listadas en `plan.txt`. Un MVP terminado vale más que un proyecto ambicioso a medias.

## Stack (propuesto en `plan.txt`)

- **Monorepo con pnpm workspaces**: `apps/api`, `apps/web` y `packages/shared`.
- **API:** Node.js + TypeScript (estricto) + Fastify.
- **Base de datos:** PostgreSQL 16 + Drizzle (migraciones versionadas).
- **Frontend:** React + Vite + TanStack Query.
- **Validación y tipos compartidos:** esquemas Zod en `packages/shared`.
- **Emails:** Resend en producción y Mailpit en local.
- **Tests:** Vitest, con Testcontainers para los tests contra un Postgres real.
- **Entorno local:** docker-compose. **CI:** GitHub Actions (lint + tests + build).

## Reglas técnicas

1. **Doble reserva:** la restricción de exclusión de Postgres (`tstzrange` + `btree_gist`) es la fuente de verdad. La API traduce su violación a `409 Conflict`. No la sustituyas por comprobaciones solo en la aplicación.
2. **Zonas horarias:** todo se guarda en UTC (`timestamptz`). Los huecos se calculan y se muestran en la zona IANA del negocio, también los días de cambio de horario (DST).
3. **Cálculo de huecos:** es una función pura en `packages/shared`, con tests unitarios. Cualquier cambio en ella lleva su test.
4. **Seguridad:** las contraseñas se guardan con hash. La sesión va en una cookie httpOnly. De los tokens de cancelación solo se guarda el hash. No se suben secretos al repo: se usa `.env.example`.
5. **Tests y CI:** la lógica importante tiene tests. CI debe pasar antes de dar una tarea por terminada.
6. **Cambios pequeños:** modifica solo lo que se pide. No instales dependencias fuera del stack sin preguntar.
7. **No inventar:** no inventes decisiones pendientes (hosting, nombre del repo, idioma, demo). Si hacen falta, pregunta.

## Antes de dar una tarea por terminada

- Lint, tests y build pasan sin errores.
- El cambio respeta el alcance de `plan.txt` y las reglas de este archivo.
- Si cambió una decisión o se cerró una pendiente, actualiza `plan.txt`.
- Resume a Felix en pocas líneas qué cambiaste y en qué archivos.
