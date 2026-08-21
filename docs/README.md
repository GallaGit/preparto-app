# Documentación de PreParto

Índice de la documentación técnica y de producto del proyecto.

La documentación está redactada en **español**. El código fuente se escribe en **inglés**.

> **Aviso:** PreParto no sustituye la valoración de profesionales sanitarios. Consulta el [descargo de responsabilidad](./medical/DISCLAIMER.md).

---

## Cómo leer esta carpeta

| Si necesitas… | Empieza por… |
| --------------- | -------------- |
| Entender qué es el producto | [product/PRODUCT.md](./product/PRODUCT.md) |
| Ver el plan por fases | [product/ROADMAP.md](./product/ROADMAP.md) · [roadmap/fase_3.md](./roadmap/fase_3.md) · [roadmap/fase_extra_hospital_bag.md](./roadmap/fase_extra_hospital_bag.md) |
| Definir o cambiar el aspecto visual | [design/README.md](./design/README.md) |
| Comprender la arquitectura | [architecture/ARCHITECTURE.md](./architecture/ARCHITECTURE.md) |
| Conocer límites sanitarios | [medical/DISCLAIMER.md](./medical/DISCLAIMER.md) |
| Contribuir al código | [development/CONTRIBUTING.md](./development/CONTRIBUTING.md) |
| Ver qué se ha hecho | [development/DEVELOPMENT_LOG.md](./development/DEVELOPMENT_LOG.md) |
| Revisar decisiones técnicas | [adr/](./adr/) |

---

## Estructura

```text
docs/
├── README.md                 ← este índice
├── product/                  ← visión y roadmap de producto
├── design/                   ← dirección visual, tokens y UI
├── roadmap/                  ← detalle por fases
├── architecture/             ← arquitectura y diseño técnico
├── adr/                      ← Architecture Decision Records
├── medical/                  ← reglas, fuentes y disclaimer sanitario
└── development/              ← contribución, estilo de código, tests y bitácora
```

---

## Producto

Visión del producto, roadmap y principios de experiencia de usuario.

| Documento | Descripción |
| ----------- | ------------- |
| [PRODUCT.md](./product/PRODUCT.md) | Visión, problema, público objetivo y alcance |
| [ROADMAP.md](./product/ROADMAP.md) | Evolución incremental por fases |
| [roadmap/fase_2.md](./roadmap/fase_2.md) | Detalle de la Fase 2 (MVP funcional, cerrada) |
| [roadmap/fase_3.md](./roadmap/fase_3.md) | Detalle de la Fase 3 (experiencia avanzada) |
| [roadmap/fase_extra_hospital_bag.md](./roadmap/fase_extra_hospital_bag.md) | Fase extra: checklist «Qué llevar al hospital» |
| [DECISION_ENGINE.md](./product/DECISION_ENGINE.md) | Responsabilidad del motor de decisión (producto) |
| [UX_PRINCIPLES.md](./product/UX_PRINCIPLES.md) | Principios de experiencia de usuario |
| [FAQ.md](./product/FAQ.md) | Preguntas frecuentes (contenido offline) |
| [VERSION_2030.md](./product/VERSION_2030.md) | Visión a largo plazo (no es compromiso de implementación) |

---

## Diseño visual

Dirección estética, tokens y contrato de componentes UI. Complementa [UX_PRINCIPLES.md](./product/UX_PRINCIPLES.md) sin sustituirlo.

| Documento | Descripción |
| ----------- | ------------- |
| [design/README.md](./design/README.md) | Índice del sistema visual |
| [PWA_V1_DECISION.md](./design/PWA_V1_DECISION.md) | **Decisión final visual PWA v1** |
| [MOBILE_NAV.md](./design/MOBILE_NAV.md) | Bottom nav móvil — **v2** (no v1) |
| [VISUAL_DIRECTION.md](./design/VISUAL_DIRECTION.md) | Soft Liquid Glass + diferidos |
| [stitch/](./design/stitch/) | Mockup Stitch Home (png + DESIGN.md) |
| [DESIGN_TOKENS.md](./design/DESIGN_TOKENS.md) | Color, tipografía, espacio, foco |
| [COMPONENTS.md](./design/COMPONENTS.md) | Contrato visual de primitivos |
| [ICONS.md](./design/ICONS.md) | Hugeicons + círculo con contraste |
| [UI_CONSTRAINTS.md](./design/UI_CONSTRAINTS.md) | Límites del rediseño (qué no romper) |

---

## Arquitectura

Diseño técnico de la aplicación: capas, flujo de datos, estado, almacenamiento y Offline.

| Documento | Descripción |
| ----------- | ------------- |
| [ARCHITECTURE.md](./architecture/ARCHITECTURE.md) | Principios y visión general de la arquitectura |
| [PROJECT_STRUCTURE.md](./architecture/PROJECT_STRUCTURE.md) | Estructura de carpetas objetivo |
| [DATA_FLOW.md](./architecture/DATA_FLOW.md) | Flujo de datos entre capas |
| [ASSESSMENT_ENGINE.md](./architecture/ASSESSMENT_ENGINE.md) | Motor de evaluación (núcleo del dominio) |
| [STATE_MANAGEMENT.md](./architecture/STATE_MANAGEMENT.md) | Gestión del estado con React |
| [STORAGE.md](./architecture/STORAGE.md) | Persistencia local |
| [OFFLINE_FIRST.md](./architecture/OFFLINE_FIRST.md) | Estrategia Offline First |
| [FUTURE_EVOLUTION.md](./architecture/FUTURE_EVOLUTION.md) | Criterios para evolucionar la arquitectura |

> **Nota:** En arquitectura se usa el término **Assessment Engine**. En producto, [DECISION_ENGINE.md](./product/DECISION_ENGINE.md) mantiene el nombre Decision Engine por coherencia documental. Ambos se refieren al mismo núcleo de evaluación.

---

## ADR (Architecture Decision Records)

Decisiones técnicas aceptadas y su justificación.

| Documento | Decisión |
| ----------- | ---------- |
| [ADR-001](./adr/ADR-001-use-react.md) | Uso de React como framework principal |
| [ADR-002](./adr/ADR-002-offline-first.md) | Estrategia Offline First |
| [ADR-003](./adr/ADR-003-feature-based-architecture.md) | Arquitectura modular por funcionalidades |
| [ADR-004](./adr/ADR-004-assessment-engine.md) | Assessment Engine como núcleo del dominio |

---

## Médico / sanitario

Límites legales y sanitarios, reglas del dominio y fuentes de evidencia.

| Documento | Descripción |
| ----------- | ------------- |
| [DISCLAIMER.md](./medical/DISCLAIMER.md) | Descargo de responsabilidad y límites de la app |
| [MEDICAL_RULES.md](./medical/MEDICAL_RULES.md) | Principios de las reglas médicas orientativas |
| [SOURCES.md](./medical/SOURCES.md) | Criterios y fuentes de evidencia |

---

## Desarrollo

Guías para contribuir, estilo de código, testing y bitácora del proyecto.

| Documento | Descripción |
| ----------- | ------------- |
| [CONTRIBUTING.md](./development/CONTRIBUTING.md) | Cómo contribuir al proyecto |
| [CODE_OF_CONDUCT.md](./development/CODE_OF_CONDUCT.md) | Código de conducta |
| [CODE_STYLE.md](./development/CODE_STYLE.md) | Estilo y convenciones de código |
| [TESTING.md](./development/TESTING.md) | Estrategia y prioridades de testing |
| [DEVELOPMENT_LOG.md](./development/DEVELOPMENT_LOG.md) | Bitácora de desarrollo por fases |

---

## Principios transversales

Documentos de distintas carpetas que conviene tener presentes en cualquier cambio:

1. **Simplicidad antes que sobrearquitectura** — [ARCHITECTURE.md](./architecture/ARCHITECTURE.md)
2. **Offline First** — [OFFLINE_FIRST.md](./architecture/OFFLINE_FIRST.md) · [ADR-002](./adr/ADR-002-offline-first.md)
3. **Dominio independiente de la UI** — [ASSESSMENT_ENGINE.md](./architecture/ASSESSMENT_ENGINE.md) · [ADR-004](./adr/ADR-004-assessment-engine.md)
4. **Recomendaciones explicables, no diagnósticos** — [DISCLAIMER.md](./medical/DISCLAIMER.md) · [MEDICAL_RULES.md](./medical/MEDICAL_RULES.md)
5. **UX clara y sin alarmismo** — [UX_PRINCIPLES.md](./product/UX_PRINCIPLES.md)
6. **Rediseño visual sin romper lógica ni accesibilidad** — [design/UI_CONSTRAINTS.md](./design/UI_CONSTRAINTS.md)

---

## Relación con el repositorio

El [README.md](../README.md) de la raíz resume el producto, la instalación y el estado actual.

Esta carpeta `docs/` es la fuente de verdad para:

- producto y roadmap;
- diseño visual (UI / estilo);
- arquitectura y ADRs;
- criterios médicos;
- normas de desarrollo.
