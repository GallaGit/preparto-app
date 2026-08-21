# FAQ (preguntas frecuentes)

## Objetivo

Definir el alcance, tono y contenido del FAQ de PreParto como **contenido embebido offline** (sin CMS ni fetch en runtime).

Implementación: ruta `/faq`, datos en `src/data/faq/`, chrome i18n en `src/i18n/messages/`.

---

## Principios

- **Offline First:** todo el texto viaja en el bundle PWA.
- **Confianza:** lenguaje claro, no alarmista ([UX_PRINCIPLES.md](./UX_PRINCIPLES.md)).
- **Límites sanitarios:** no diagnostica, no confirma inicio de parto, no sustituye valoración profesional ([DISCLAIMER.md](../medical/DISCLAIMER.md)).
- **Una sola fuente de urgencia:** señales de alarma detalladas viven en `/emergency`; el FAQ enlaza allí.
- **Coherencia:** respuestas de producto alineadas con assessment, storage local y features reales.

---

## Alcance v1

### Incluido

- Qué es PreParto y qué no es.
- Cómo interpretar el banner de recomendación (assessment).
- Uso orientativo de contracciones, síntomas, rotura de bolsa, historial, maleta, notificaciones.
- Privacidad / datos locales / offline / exportación.
- Enlace explícito a Orientación / Emergencia.

### Fuera de alcance (v1)

- Consejo clínico personalizado o protocolos por hospital.
- Dosificación, tratamientos, “estás de parto”.
- FAQ generado por IA o contenido remoto.
- Sustituir el tip del mockup Stitch por copy estático en el banner de Home (el banner sigue siendo assessment).

---

## Categorías

| Id | Uso |
| -- | --- |
| `about` | Producto y límites |
| `features` | Cómo usar funciones |
| `urgency` | Cuándo pedir ayuda (apunta a Emergency) |
| `privacy` | Datos y exportación |
| `offline` | PWA sin red y notificaciones locales |

---

## Contenido canónico (ES)

Las respuestas en inglés viven en el código (`src/data/faq/en.ts`). Esta tabla es la referencia de producto.

| Id | Categoría | Pregunta | Notas de coherencia |
| -- | --------- | -------- | ------------------- |
| `what-is` | about | ¿Qué es PreParto? | PRODUCT.md |
| `not-medical` | about | ¿Sustituye a mi matrona o al hospital? | DISCLAIMER.md |
| `assessment` | about | ¿Qué significa el mensaje de recomendación? | Assessment orientativo + disclaimer |
| `contractions` | features | ¿Para qué sirve el cronómetro de contracciones? | Timer + historial; no confirma parto |
| `symptoms` | features | ¿Por qué registrar síntomas? | Registro local + contexto del assessment |
| `water-break` | features | ¿Qué hago en la app si creo que he roto la bolsa? | Feature + mirar Emergencia si hay dudas |
| `when-to-call` | urgency | ¿Cuándo debo contactar o ir al hospital? | Remite a `/emergency` (no duplicar lista larga) |
| `data-local` | privacy | ¿Dónde se guardan mis datos? | Sin backend / dispositivo |
| `export` | privacy | ¿Puedo compartir o exportar el historial? | Compartir/PDF; no es informe médico |
| `offline` | offline | ¿Funciona sin Internet? | Offline First |
| `hospital-bag` | features | ¿Qué es «Qué llevar al hospital»? | Checklist editable |
| `notifications` | offline | ¿Cómo funcionan las notificaciones? | Locales; app abierta; Settings |

---

## UX

| Elemento | Comportamiento |
| -------- | -------------- |
| Entrada | Card en Home → `/faq` |
| Búsqueda | Filtro local por pregunta/respuesta/keywords |
| Lista | Acordeón (`details`/`summary`) agrupado por categoría |
| Pie | Disclaimer fijo |
| CTA | Enlace a `/emergency` |

---

## Fuentes

Criterios: [SOURCES.md](../medical/SOURCES.md). El FAQ v1 es mayoritariamente **de producto**; el bloque de urgencia no sustituye guías clínicas ni duplica reglas del Assessment Engine ([MEDICAL_RULES.md](../medical/MEDICAL_RULES.md)).

---

## Historial

| Fecha | Cambio |
| ----- | ------ |
| 2026-08-21 | Spec FAQ offline v1 + ruta `/faq` |
