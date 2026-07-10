# PreParto

---

## Descripción

Progressive Web App (PWA) de apoyo para mujeres embarazadas durante el preparto mediante herramientas de seguimiento e información basada en protocolos, sin sustituir la valoración médica.

> Esta aplicación no sustituye el consejo médico profesional.

---

### Características

**Implementadas**

- PWA instalable: manifest, service worker, iconos y `display: standalone`
- Diseño mobile-first con layout reutilizable (`max-w-md`, padding consistente)
- Pantalla Home con tarjetas de navegación y aviso legal
- Cronómetro de contracciones: Iniciar → Finalizar → Nueva contracción
- Cronómetro global que persiste al navegar entre páginas (`TimerProvider`)
- Banner global de contracción activa con botón "Finalizar" (`ActiveContractionBanner`)
- Indicador "En curso" en la tarjeta de Contracciones desde Home
- Advertencia `beforeunload` al cerrar o recargar con contracción activa
- Historial de contracciones persistido en IndexedDB
- Cálculo automático de duración e intervalo entre contracciones
- Estadísticas: última duración, promedios de duración e intervalo, total
- Eliminación individual de registros y borrado total con confirmación
- Motor de reglas `contractionAnalyzer` con niveles orientativos 0–4 (patrón 5-1-1 y otros criterios)
- Recomendaciones orientativas con aviso legal (`RecommendationBanner`)

**Páginas placeholder** (solo título)

- He roto la bolsa (`/water-break`)
- Síntomas (`/symptoms`)
- Emergencia (`/emergency`)
- Configuración (`/settings`)

### Tecnologías

| Categoría | Herramienta |
|-----------|-------------|
| Lenguaje | TypeScript (modo estricto) |
| UI | React 19 |
| Build | Vite 6 |
| Estilos | Tailwind CSS, PostCSS, Autoprefixer |
| Enrutamiento | React Router DOM 7 |
| PWA | Vite Plugin PWA |
| Calidad de código | ESLint, Prettier |
| Tests | Vitest |

### Arquitectura

```
App
└── BrowserRouter
    └── TimerProvider          ← isRunning, startedAt, duration (Date.now() - startedAt)
        └── ContractionsProvider   ← finishActiveContraction(), historial, stats, análisis
            └── Routes (páginas consumen hooks)
```

**Capas en `src/`**

- `pages/` — vistas por ruta
- `components/` — UI reutilizable
- `hooks/` — lógica consumible por componentes
- `providers/` y `contexts/` — estado global (timer y contracciones)
- `services/` — almacenamiento IndexedDB y motor de reglas (sin dependencias de React)
- `utils/` — funciones puras (estadísticas, formateo)
- `types/` — tipado estricto
- `data/` — datos estáticos (navegación)

**Rutas**

| Ruta | Página |
|------|--------|
| `/` | Home |
| `/contractions` | Contracciones |
| `/water-break` | He roto la bolsa |
| `/symptoms` | Síntomas |
| `/emergency` | Emergencia |
| `/settings` | Configuración |

---

## Instalación

```bash

```

```bash
npm install
```

Si `npm install` falla por certificado SSL (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`):

```bash
npm install --strict-ssl=false
```

## Configuración



## Uso

```bash
npm run dev
```

Servidor de desarrollo local con Vite.

```bash
npm run build
npm run preview
```

Build de producción y vista previa del resultado en `dist/`.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo (Vite) |
| `npm run build` | Compila TypeScript (`tsc -b`) y genera el build (`vite build`) |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |
| `npm run format` | Formatea `src/**/*.{ts,tsx,css}` con Prettier |
| `npm run test` | Ejecuta las pruebas con Vitest |
| `npm run test:watch` | Ejecuta Vitest en modo observación |

## Estructura del proyecto

```
PWA Pre-parto/
├── docs/
│   ├── DEVELOPMENT_LOG.md
│   └── ROADMAP.md
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── mask-icon.svg
│   ├── pwa-192x192.png
│   └── pwa-512x512.png
├── src/
│   ├── components/
│   │   ├── ActiveContractionBanner/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── ContractionCard/
│   │   ├── HistoryList/
│   │   ├── Layout/
│   │   ├── PageHeader/
│   │   ├── RecommendationBanner/
│   │   ├── StatisticsCard/
│   │   └── Timer/
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── providers/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── resume.md
```

## Testing

```bash
npm run test
```

Pruebas unitarias con Vitest. Archivo actual: `src/services/contractionAnalyzer.test.ts` (motor de reglas de contracciones).

```bash
npm run test:watch
```

## Deployment



## Contribución

Convención de commits: Conventional Commits.

Estándares del proyecto (según `docs/DEVELOPMENT_LOG.md`):

- Componentes pequeños y reutilizables
- Lógica desacoplada de la interfaz
- Tipado estricto con TypeScript
- Mobile First
- Accesibilidad
- Funcionar sin conexión
- Código mantenible y escalable

## Roadmap

Ver `docs/ROADMAP.md` para el detalle completo.

**Fase 3 — Funcionalidades ampliadas** (pendiente)

- Cronómetro de ruptura de bolsa
- Checklist de síntomas con severidad
- Página de emergencia con contactos rápidos
- Configuración (semana de gestación, preferencias)
- Exportación o compartir historial

**Fase 4 — Experiencia avanzada** (pendiente)

- Estrategias de caché offline más granulares
- Notificaciones push
- Tests unitarios (hooks, utilidades)
- Tests E2E de flujos críticos
- Internacionalización (i18n)

## Licencia



## Autores / Créditos


