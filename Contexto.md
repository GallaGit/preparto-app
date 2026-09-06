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
- Vitest (tests de dominio)

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
| `/privacy` | Política de privacidad |

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

## Fase 2 — Funcionalidad MVP ✅

**Estado:** Completada  
**Fecha cierre:** 7 de agosto de 2026  
**Roadmap:** `docs/roadmap/fase_2.md`

### Objetivo

Construir las funcionalidades para registrar síntomas, consultar historial y obtener orientación segura (sin sustituir valoración médica).

### Épicas

| Épica | Nombre | Estado |
|-------|--------|--------|
| 2.1 | Registro de síntomas | ✅ Completada (2026-08-05) |
| 2.2 | Historial | ✅ Completada (2026-08-07) |
| 2.3 | Motor de evaluación | ✅ Completada (2026-08-07) |
| 2.4 | Sistema de recomendaciones | ✅ Completada (2026-08-07) |
| 2.5 | Configuración del embarazo | ✅ Completada (2026-08-07) |
| 2.6 | Persistencia | ✅ Completada (2026-08-07) |
| 2.7 | Validaciones clínicas | ✅ Completada (2026-08-07) |
| 2.8 | Accesibilidad | ✅ Completada (2026-08-07) |
| 2.9 | Testing ampliado | ✅ Completada (2026-08-07) |

---

### Épica 2.1 — Registro de síntomas ✅

**Fecha:** 5 de agosto de 2026

#### Qué se entregó

| Área | Detalle |
|------|---------|
| **Modelo** | Unión discriminada `SymptomRecord` |
| **Síntomas** | Tapón mucoso, rotura de bolsa, sangrado, movimiento fetal, dolor lumbar, presión pélvica, náuseas, diarrea, escalofríos |
| **Contracciones** | Timer + `notes` |
| **Persistencia** | IndexedDB stores `contractions` + `symptoms` |
| **Validación** | Entrada de formulario |
| **Tests** | Dominio 2.1 |

---

### Épicas 2.2–2.9 — Cierre de Fase 2 ✅

**Fecha:** 7 de agosto de 2026

#### Qué se entregó

| Área | Detalle |
|------|---------|
| **2.5 Config** | `PregnancyProfile`, formulario en `/settings`, semana gestacional derivable |
| **2.6 Persistencia** | IndexedDB `preparto` **v3**: `settings`, `preferences` (app + timer restaurable) |
| **2.2 Historial** | `/history` unificado (síntomas + contracciones), filtros día/tipo, detalle, edición y borrado |
| **2.3 Motor** | `assessmentEngine.evaluate()` puro; catálogo MVP en `MEDICAL_RULES.md`; reutiliza `contractionAnalyzer` |
| **2.4 Recomendaciones** | Banner generalizado; visible en Home, Historial y Contracciones; `/emergency` con orientación + disclaimer |
| **2.7 Validaciones** | Fechas futuras, doble rotura de bolsa bloqueada, duraciones absurdas, tiempos de contracción imposibles |
| **2.8 A11y** | Skip link, landmarks, targets táctiles, `aria-live` en recomendaciones, contraste urgente reforzado |
| **2.9 Tests** | 45 tests de dominio (engine, historial, embarazo, validaciones clínicas) |

#### Rutas añadidas / actualizadas

| Ruta | Uso |
|------|-----|
| `/history` | Línea temporal unificada |
| `/history/:kind/:id` | Detalle / edición / borrado |
| `/settings` | Configuración del embarazo |
| `/emergency` | Orientación de urgencia (estática) |
| `/` | Incluye recomendación del Assessment Engine |

#### Decisiones técnicas

- Historial unifica en vista (`HistoryItem`); stores IndexedDB siguen separados.
- Assessment Engine independiente de React/storage; salida con clasificación, explicación, recomendación y `matchedRules`.
- Reglas MVP conservadoras documentadas; siempre con disclaimer no diagnóstico.
- Estructura actual `pages/services/hooks` (sin migración a `features/` en esta fase).

#### Comandos verificados

```bash
npm run test
npm run lint
npm run build
```

#### Checklist a11y (pasada práctica)

- [x] Skip link al contenido principal
- [x] `main` landmark
- [x] Labels / `aria-*` en formularios y filtros
- [x] Targets táctiles ≥44px en filtros e ítems de historial
- [x] `aria-live="polite"` en banner de recomendación
- [x] Contraste reforzado en estados warning/urgent

---

## Fase 3 — Experiencia avanzada ✅

**Estado:** Completada  
**Fecha cierre:** 14 de agosto de 2026  
**Roadmap:** `docs/roadmap/fase_3.md`

### Objetivo

Mejorar la experiencia del MVP (offline, exportar historial, calidad) sin nuevo dominio clínico ni backend.

### Épicas

| Épica | Nombre | Estado |
|-------|--------|--------|
| 3.1 | Offline granular | ✅ Completada |
| 3.2 | Exportar / compartir historial | ✅ Completada |
| 3.3 | Notificaciones locales | ✅ Completada |
| 3.4 | Tests E2E | ✅ Completada |
| 3.5 | Internacionalización (i18n) | ✅ Completada |

#### Qué se entregó

| Área | Detalle |
|------|---------|
| **3.1 Offline** | Workbox runtime + navigateFallback; banners offline/update; SW con `prompt` |
| **3.2 Export** | JSON + texto + Web Share en `/history`; disclaimer incluido |
| **3.3 Notificaciones** | Notification API local; recordatorio y timer activo; toggles en Settings |
| **3.4 E2E** | Playwright (`npm run test:e2e`) — Home, síntoma→historial, timer, settings |
| **3.5 i18n** | Catálogo ES/EN; locale en preferencias; selector en Settings |

Fuera de alcance (sin cambios): Web Push, backend, sync, IA, app nativa.

---

## Fase extra — Checklist «Qué llevar al hospital» ✅

**Estado:** Completada  
**Fecha:** 14 de agosto de 2026  
**Roadmap:** `docs/roadmap/fase_extra_hospital_bag.md`

### Objetivo

Añadir una lista editable offline-first de objetos/tareas para preparar la maleta del hospital, sin dominio clínico nuevo.

### Qué se entregó

| Área | Detalle |
|------|---------|
| **Página** | `/hospital-bag` con mensaje de ayuda, alta, edición inline, prioridad y sección «Hechos» |
| **UI** | `HospitalBagChecklist` + filas con selección múltiple y borrado confirmado |
| **Persistencia** | IndexedDB `preparto` **v4**: store `hospitalBag` + seed si vacío |
| **i18n** | Claves ES/EN para chrome de la página y nav |
| **Tests** | Ordenación active/done y prioridad |

#### Rutas añadidas

| Ruta | Uso |
|------|-----|
| `/hospital-bag` | Checklist «Qué llevar al hospital» |

#### Decisiones técnicas

- Store dedicado (no mezclar con `preferences`); upgrade a DB v4.
- Ítems hechos fuera de la lista activa para reducir ruido visual.
- Labels de usuario (y seed en español); chrome de UI vía i18n.

#### Comandos verificados

```bash
npm run test
npm run lint
npm run build
```

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
| 2026-08-07 | 2 | Cierre Fase 2: historial, config, Assessment Engine, recomendaciones, validaciones, a11y, tests |
| 2026-08-14 | 3 | Definición de Fase 3: `docs/roadmap/fase_3.md` (sin implementación) |
| 2026-08-14 | 3 | Cierre Fase 3: offline granular, export historial, notificaciones locales, E2E, i18n ES/EN |
| 2026-08-14 | Extra | Checklist hospital: `/hospital-bag`, IndexedDB v4, docs de fase extra |
| 2026-09-06 | Store | LICENSE MIT, `/privacy` ES/EN, scaffold Capacitor iOS/Android (no envío a tiendas) |

---

## Próximo paso

**Store readiness** — Capacitor está scaffolded y hay `/privacy` + `LICENSE`. No publicar en tiendas; ver `docs/product/APP_STORE_READINESS.md`.
