# PreParto

> Progressive Web App (PWA) diseñada para acompañar a mujeres embarazadas durante el preparto mediante herramientas de seguimiento de síntomas y recomendaciones orientativas basadas en evidencia.
> **⚠️ Aviso importante**
>
> PreParto **no sustituye la valoración de profesionales sanitarios**. La aplicación ofrece información y recomendaciones orientativas que deben utilizarse siempre junto con las indicaciones del equipo médico.

---

## Índice

- Descripción
- Objetivos
- Estado del proyecto
- Características
- Principios del proyecto
- Tecnologías
- Arquitectura
- Instalación
- Uso
- Scripts
- Documentación
- Roadmap
- Contribución
- Licencia
- Autor

---

## Descripción

El objetivo de **PreParto** es reducir la incertidumbre durante las últimas semanas del embarazo ofreciendo herramientas sencillas que ayuden a registrar acontecimientos importantes y comprender mejor cuándo puede ser necesario contactar con el hospital.

La aplicación está diseñada siguiendo un enfoque **Offline First**, **Mobile First** y basada en reglas documentadas, priorizando siempre la seguridad y la claridad de la información.

---

## Objetivos

PreParto pretende ayudar a las futuras madres y sus acompañantes a:

- Registrar contracciones.
- Registrar síntomas del preparto.
- Comprender la evolución de los síntomas.
- Recibir recomendaciones orientativas basadas en protocolos.
- Llevar un historial cronológico de los acontecimientos importantes.
- Reducir la incertidumbre antes del parto.

La aplicación **no realiza diagnósticos médicos** ni sustituye la atención sanitaria.

---

## Estado del proyecto

Fases **1–3** y la fase extra **checklist hospital** están **cerradas** (bitácora: [`docs/development/DEVELOPMENT_LOG.md`](./docs/development/DEVELOPMENT_LOG.md)). El producto es una PWA offline-first usable. El siguiente foco es **Fase 4 / preparación para tiendas**, no backend ni reglas clínicas nuevas.

Detalle de huecos frente a App Store / Play: [`docs/product/APP_STORE_READINESS.md`](./docs/product/APP_STORE_READINESS.md).

### Implementado (Fases 1–3 + hospital)

- Progressive Web App (Vite + `vite-plugin-pwa`): instalable, `display: standalone`
- Iconos PWA (192 / 512 / maskable) y `apple-touch-icon`
- Diseño Mobile First (UI Soft Liquid Glass, barra inferior Home / timer / historial / SOS)
- Cronómetro de contracciones global y persistente, con banner al navegar
- Historial y estadísticas de contracciones
- Motor de análisis 5-1-1 / Assessment Engine (recomendaciones orientativas + disclaimer)
- Registro de síntomas y rotura de bolsa
- Historial unificado (filtros, detalle, edición, borrado, limpiar)
- Exportar / compartir historial (WhatsApp, Gmail, PDF) con disclaimer
- Emergencia y llamadas SOS (`tel:` al 112 / teléfono del hospital)
- Configuración: perfil de embarazo, teléfono del hospital, idioma ES/EN, notificaciones locales
- Checklist «Qué llevar al hospital» (`/hospital-bag`, IndexedDB)
- Offline granular (Workbox, banners offline / nueva versión)
- Tests Vitest (dominio) y Playwright E2E
- Despliegue en GitHub Pages

### Siguiente (Fase 4 / store readiness)

- Decidir wrapper nativo (**TWA** para Play vs **Capacitor** para iOS+Android). **Sin scaffolding en este ciclo** — no hay Capacitor/TWA en el repo.
- Política de privacidad pública (URL) y página legal del disclaimer
- Splash / iconos nativos del wrapper
- Capturas de revisión para las consolas
- Material de ficha de tienda (copy no diagnóstico; sin marketing Business)

Fuera de alcance ahora: backend, sincronización entre dispositivos, autenticación, IA, nuevas reglas médicas.

---

## Principios del proyecto

PreParto se desarrolla siguiendo estos principios:

- 📱 Mobile First
- 📶 Offline First
- 🧩 Componentes pequeños y reutilizables
- ⚙️ Arquitectura sencilla y mantenible
- 📖 Basado en evidencia científica
- ❤️ Diseñado para reducir la incertidumbre durante el preparto
- 🩺 Nunca sustituir el criterio médico
- ♿ Accesibilidad como prioridad
- 🔒 Privacidad de los datos de la usuaria

---

## Tecnologías

| Categoría | Tecnología |
| ----------- | ------------ |
| Lenguaje | TypeScript |
| UI | React 19 |
| Build | Vite |
| Estilos | Tailwind CSS |
| Routing | React Router DOM |
| Persistencia | IndexedDB |
| PWA | Vite Plugin PWA |
| Calidad | ESLint + Prettier |
| Testing | Vitest |

---

## Arquitectura

```text
App
│
├── Providers
│
├── Pages
│
├── Components
│
├── Services
│
├── IndexedDB
│
└── Rule Engine
```

La arquitectura completa puede consultarse en **[`docs/architecture/ARCHITECTURE.md`](./docs/architecture/ARCHITECTURE.md)**.

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/GallaGit/preparto-app.git
```

Entrar en el proyecto:

```bash
cd preparto-app
```

Instalar dependencias:

```bash
npm install
```

Si aparece el error:

```text
UNABLE_TO_VERIFY_LEAF_SIGNATURE
```

Ejecutar:

```bash
npm install --strict-ssl=false
```

---

## Uso

Servidor de desarrollo:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Vista previa del build:

```bash
npm run preview
```

---

## Scripts

| Script | Descripción |
| --------- | ------------- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila TypeScript y genera el build |
| `npm run preview` | Sirve el build localmente |
| `npm run lint` | Ejecuta ESLint |
| `npm run format` | Formatea el código con Prettier |
| `npm run test` | Ejecuta Vitest |
| `npm run test:watch` | Ejecuta Vitest en modo observación |
| `npm run test:e2e` | Ejecuta Playwright (flujos críticos) |

---

## Testing

Hay pruebas unitarias de dominio (Assessment Engine, analizador de contracciones, persistencia, validaciones, i18n, export) y E2E Playwright de flujos críticos.

Guía: [`docs/development/TESTING.md`](./docs/development/TESTING.md).

---

## Documentación

Toda la documentación técnica se encuentra en la carpeta **`docs/`**.

| Documento | Descripción |
| ----------- | ------------- |
| [`docs/product/PRODUCT.md`](./docs/product/PRODUCT.md) | Visión del producto y objetivos |
| [`docs/product/ROADMAP.md`](./docs/product/ROADMAP.md) | Plan de desarrollo |
| [`docs/product/APP_STORE_READINESS.md`](./docs/product/APP_STORE_READINESS.md) | Checklist App Store / Play (ciclo 1) |
| [`docs/product/DECISION_ENGINE.md`](./docs/product/DECISION_ENGINE.md) | Motor de recomendaciones |
| [`docs/product/UX_PRINCIPLES.md`](./docs/product/UX_PRINCIPLES.md) | Principios de experiencia de usuario |
| [`docs/architecture/ARCHITECTURE.md`](./docs/architecture/ARCHITECTURE.md) | Arquitectura técnica |
| [`docs/medical/MEDICAL_RULES.md`](./docs/medical/MEDICAL_RULES.md) | Reglas médicas y referencias |
| [`docs/medical/DISCLAIMER.md`](./docs/medical/DISCLAIMER.md) | Descargo sanitario |
| [`docs/development/CONTRIBUTING.md`](./docs/development/CONTRIBUTING.md) | Guía para colaboradores |
| [`docs/development/CODE_OF_CONDUCT.md`](./docs/development/CODE_OF_CONDUCT.md) | Código de conducta |
| [`docs/development/DEVELOPMENT_LOG.md`](./docs/development/DEVELOPMENT_LOG.md) | Registro histórico del desarrollo |
| [`docs/README.md`](./docs/README.md) | Índice de toda la documentación |

---

## Roadmap

Fases 1–3 y el checklist hospital ya están hechas.

**Fase 4** es evolución técnica cuando el producto lo requiera. El trabajo inmediato documentado es la preparación para tiendas (wrapper, privacidad, splash, capturas), no sincronización ni backend.

Consulta [`docs/product/ROADMAP.md`](./docs/product/ROADMAP.md) y [`docs/product/APP_STORE_READINESS.md`](./docs/product/APP_STORE_READINESS.md).

---

## Contribución

Las contribuciones son bienvenidas.

Antes de colaborar, por favor consulta:

- [`docs/development/CONTRIBUTING.md`](./docs/development/CONTRIBUTING.md)
- [`docs/development/CODE_OF_CONDUCT.md`](./docs/development/CODE_OF_CONDUCT.md)

---

## Licencia

Este proyecto se declara con licencia **MIT**. El archivo `LICENSE` **aún no está en el repositorio** (hueco anotado en la checklist de tiendas).

---

## Autor

***Ociel Gallardo Estiven***

GitHub:

<https://github.com/GallaGit>

---

> PreParto nace con un objetivo sencillo: ofrecer una herramienta útil, clara y responsable que ayude a las futuras familias a afrontar el preparto con mayor tranquilidad, siempre complementando —y nunca sustituyendo— la atención de los profesionales sanitarios.
