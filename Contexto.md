# PreParto — Bitácora del proyecto

Aplicación PWA de apoyo para mujeres embarazadas en la gestión de síntomas previos al parto.

> **Aviso:** Esta aplicación no sustituye el consejo médico ni toma decisiones clínicas.

---

## Stack tecnológico

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Vite Plugin PWA
- ESLint 9 (+ `typescript-eslint`, plugins React)
- Prettier 3
- `eslint-config-prettier` (integración ESLint ↔ Prettier)


---

## Fase 1 — MVP ✅

**Estado:** Completada  
**Fecha:** 29 de junio de 2026

### Objetivo

Entregar una base funcional e instalable con navegación, diseño móvil y cronómetro de contracciones.

### Entregables

| Área | Detalle |
|------|---------|
| **Arquitectura** | Estructura escalable en `src/` con `components/`, `pages/`, `hooks/`, `utils/`, `types/`, `data/`, `services/` |
| **Layout** | Componente reutilizable con márgenes uniformes, `max-w-md` y padding consistente |
| **Componentes** | `Button`, `Card`, `Layout`, `TimerDisplay` |
| **Home** | Título, pregunta "¿Cómo te encuentras?" y tarjetas de navegación |
| **Contracciones** | Cronómetro funcional: Iniciar → Finalizar → Nueva contracción |
| **Páginas placeholder** | He roto la bolsa, Síntomas, Emergencia, Configuración (solo título) |
| **PWA** | Manifest, service worker, iconos, `display: standalone` |
| **Calidad** | TypeScript estricto, ESLint, Prettier, build sin errores |

### Rutas implementadas

| Ruta | Página |
|------|--------|
| `/` | Home |
| `/contractions` | Contracciones |
| `/water-break` | He roto la bolsa |
| `/symptoms` | Síntomas |
| `/emergency` | Emergencia |
| `/settings` | Configuración |

### Decisiones técnicas

- Paleta rosa suave (`primary`) orientada a apps de salud.
- Lógica del cronómetro aislada en el hook `useTimer`.
- Datos de navegación centralizados en `data/navigation.ts`.
- Sin persistencia de datos (sin LocalStorage, IndexedDB ni backend).

### Incidencias

- `npm install` falló inicialmente por certificado SSL (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`).
- **Solución:** `npm install --strict-ssl=false`

### Comandos verificados

```bash
npm install
npm run dev
npm run build
npm run lint
```

---

## Fase 2 — Persistencia y funcionalidad ⏳

**Estado:** Pendiente

### Objetivo previsto

Guardar datos localmente y ampliar las herramientas de seguimiento.

### Tareas planificadas

- [ ] Historial de contracciones (LocalStorage o IndexedDB)
- [ ] Cálculo de intervalos entre contracciones
- [ ] Indicador de patrón (regla 5-1-1)
- [ ] Cronómetro de ruptura de bolsa
- [ ] Checklist de síntomas con severidad
- [ ] Página de emergencia con contactos rápidos
- [ ] Configuración: semana de gestación, preferencias

---

## Fase 3 — Experiencia avanzada ⏳

**Estado:** Pendiente

### Objetivo previsto

Mejorar la experiencia offline, notificaciones y calidad del producto.

### Tareas planificadas

- [ ] Estrategias de caché offline más granulares
- [ ] Notificaciones push
- [ ] Exportación o compartir historial
- [ ] Tests unitarios (`useTimer`, utilidades)
- [ ] Tests E2E de flujos críticos
- [ ] Internacionalización (i18n)

---

## Registro de cambios

| Fecha | Fase | Cambio |
|-------|------|--------|
| 2026-06-29 | 1 | Creación del proyecto MVP: estructura, componentes, rutas, cronómetro y PWA |
| 2026-06-29 | 1 | Verificación de build, lint y servidor de desarrollo |

---

## Próximo paso

Iniciar **Fase 2** con persistencia del historial de contracciones.
