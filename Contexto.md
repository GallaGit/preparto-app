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
- IndexedDB (persistencia local offline-first)

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
- Sin persistencia de datos en el cierre de Fase 1 (añadida después).

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

## Fase 2 — Funcionalidad MVP ⏳

**Estado:** En progreso  
**Roadmap:** `docs/roadmap/fase_2.md`

### Objetivo

Construir las funcionalidades para registrar síntomas, consultar historial y obtener orientación segura (sin sustituir valoración médica).

### Épicas

| Épica | Nombre | Estado |
|-------|--------|--------|
| 2.1 | Registro de síntomas | ✅ Completada (2026-08-05) |
| 2.2 | Historial | Pendiente |
| 2.3 | Motor de evaluación | Pendiente (no tocar en 2.1) |
| 2.4 | Sistema de recomendaciones | Pendiente |
| 2.5 | Configuración del embarazo | Pendiente |
| 2.6 | Persistencia (ampliación) | Parcial — IndexedDB ya en uso |
| 2.7 | Validaciones clínicas | Pendiente |
| 2.8 | Accesibilidad | Pendiente |
| 2.9 | Testing ampliado | Parcial — tests de dominio 2.1 |

---

### Épica 2.1 — Registro de síntomas ✅

**Fecha:** 5 de agosto de 2026  
**Rama:** `feature/configure-environment`

#### Qué se entregó

| Área | Detalle |
|------|---------|
| **Modelo** | Unión discriminada `SymptomRecord` (`id`, `type`, `recordedAt`, `notes` + campos por tipo) |
| **Síntomas** | Tapón mucoso, rotura de bolsa, sangrado, movimiento fetal, dolor lumbar, presión pélvica, náuseas, diarrea, escalofríos |
| **Contracciones** | Timer reutilizado; al finalizar se guarda `notes` en el store de contracciones |
| **Persistencia** | IndexedDB `preparto` v2 — stores `contractions` + `symptoms` (`prepartoDb.ts`) |
| **UI** | Hub `/symptoms`, formularios por tipo, `/water-break` con formulario real |
| **Validación** | Solo entrada (obligatorios, rangos, fechas); sin reglas clínicas |
| **Tests** | Validación, `createSymptom`, storage, `buildContraction` (24 tests) |
| **Docs** | `STORAGE.md`, `SYMPTOM_MODEL.md`, entrada en `DEVELOPMENT_LOG.md` |

#### Rutas añadidas / actualizadas

| Ruta | Uso |
|------|-----|
| `/symptoms` | Hub de tipos de síntoma |
| `/symptoms/:symptomType` | Formulario por tipo |
| `/water-break` | Formulario de rotura de bolsa |
| `/contractions` | Observaciones al finalizar |

#### Decisiones técnicas

- Código de dominio en inglés; UI en español.
- Contracciones **no** migradas al store `symptoms` (historial unificado = Épica 2.2).
- Assessment Engine / `contractionAnalyzer` **sin cambios**.
- Navegación principal del Home (`NAV_ITEMS`) **sin cambios**.
- Validaciones clínicas y recomendaciones fuera de alcance.

#### Comandos verificados

```bash
npm run test
npm run lint
npm run build
```

---

## Fase 3 — Experiencia avanzada ⏳

**Estado:** Pendiente

### Objetivo previsto

Mejorar la experiencia offline, notificaciones y calidad del producto.

### Tareas planificadas

- [ ] Estrategias de caché offline más granulares
- [ ] Notificaciones push
- [ ] Exportación o compartir historial
- [ ] Tests E2E de flujos críticos
- [ ] Internacionalización (i18n)

---

## Registro de cambios

| Fecha | Fase | Cambio |
|-------|------|--------|
| 2026-06-29 | 1 | Creación del proyecto MVP: estructura, componentes, rutas, cronómetro y PWA |
| 2026-06-29 | 1 | Verificación de build, lint y servidor de desarrollo |
| 2026-07-03 | 2 | Historial y persistencia de contracciones (IndexedDB) |
| 2026-07-09 | 2 | Timer global + motor de reglas de contracciones |
| 2026-07-31 | 1–2 | PWA: iconos correctos y manifest reforzado |
| 2026-08-05 | 2 | Épica 2.1: registro de síntomas + rotura de bolsa + notes en contracciones |

---

## Próximo paso

**Épica 2.2 — Historial:** línea temporal unificada (síntomas + contracciones), filtros, detalle, edición/eliminación.
