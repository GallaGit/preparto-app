# Dirección visual

## Objetivo

Registrar la dirección estética elegida para PreParto y descartar alternativas, de forma que el rediseño sea coherente y revisable.

---

## Estado

**Aceptada (fase visual):** Soft Liquid Glass — mockup Stitch Home.

Hasta la implementación en código, este documento + [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) son la referencia. La app en producción aún usa tokens anteriores en `tailwind.config.js`.

---

## Criterios de decisión (producto)

La dirección elegida debe cumplir:

- [UX_PRINCIPLES.md](../product/UX_PRINCIPLES.md) — simplicidad, claridad, confianza, no alarmismo
- [UI_CONSTRAINTS.md](./UI_CONSTRAINTS.md) — accesibilidad, urgencia legible, offline
- Público: mujeres en preparto; lectura cómoda bajo estrés; mobile-first

---

## Candidatas

| ID | Nombre | Resumen (1–2 frases) | Pros | Contras | Decisión |
| -- | ------ | --------------------- | ---- | ------- | -------- |
| A | Soft Liquid Glass (Stitch) | Cristal suave: blur ligero, blanco translúcido, rosa cálido, tipografía editorial + sans legible. | Premium, calmada, legible en Home; no es neon/glass extremo. | Blur en móvil; fuentes del mockup vía CDN (hay que self-host); mockup añade chrome extra. | **Aceptada** |
| B | Calm solid (sin glass) | Superficies mate, sin blur ni frosted. | Máxima claridad y rendimiento. | Menos “diferenciación” visual respecto al mockup elegido. | Descartada por ahora |
| C | Liquid Glass fuerte (Apple-like) | Refracción intensa, capas brillantes. | Look de demo. | Contraste, urgencia y claridad en riesgo. | Rechazada |

---

## Dirección aceptada

| Campo | Valor |
| ----- | ----- |
| ID | A |
| Nombre | Soft Liquid Glass (Stitch) |
| Fecha | 2026-08-16 |
| Resumen | Home calmada con paneles glass suaves (`rgba(255,255,255,~0.4)`, blur ~16px), fondo gradiente blush/cream, cards `rounded-2xl`, tipografía Playfair (títulos) + Outfit (cuerpo), acento rosa `#e8a2a2` / primary `#874f4f`. |
| Qué no es | Glass agresivo, dark mode, purple neon, alarmismo visual, rediseño de rutas/IA en esta fase |

### Artefacto de referencia

| Archivo | Uso |
| ------- | --- |
| [stitch/screen.png](./stitch/screen.png) | Captura Home (fuente de verdad visual) |
| [stitch/DESIGN.md](./stitch/DESIGN.md) | Tokens y reglas exportadas desde Stitch |
| [stitch/code.html](./stitch/code.html) | HTML de referencia (no es código de producción) |
| [stitch_preparto_mobile_ui_mockup.zip](./stitch_preparto_mobile_ui_mockup.zip) | Export original |

---

## Alcance aceptado vs diferido

### Aceptado (se implementará en la rama de estilo, solo presentación)

- Paleta warm blush / cream / rose (`surface`, `primary`, `primary-container`, etc.)
- Material glass suave en cards y banners (con fallback sólido si no hay `backdrop-filter`)
- Radios 24px en cards; ~16px en botones/inputs
- Tipografía display serif + sans geométrica (self-hosted o stack local; **sin CDN en producción**)
- Badge “En curso” en Contracciones
- Banner informativo no alarmista
- Iconografía: [Hugeicons Stroke Rounded](./ICONS.md) **dentro de círculo** con contraste (como [stitch/screen.png](./stitch/screen.png))
- Decisión consolidada v1: [PWA_V1_DECISION.md](./PWA_V1_DECISION.md)

### Diferido / siguiente versión

| Elemento | Destino | Motivo |
| -------- | ------- | ------ |
| **Bottom tab bar** | **PWA v2** — [MOBILE_NAV.md](./MOBILE_NAV.md) | Fuera del alcance visual v1; nav actual = Home + cards |
| Top bar con notificaciones | Futuro (producto) | No hay flujo de notificaciones |
| Links Privacidad / Soporte / © en footer | Producto/legal | No bloquean el look |
| Tip estático “Mantente hidratada” | Solo look del banner en v1 | Banner real = assessment |
| Material Symbols / Google Fonts por CDN | Nunca en producción PWA | Offline First: self-host |

---

## Por qué no rompe la funcionalidad

- Misma tarea de Home: marca, mensaje corto, orientación, acceso a features existentes.
- No exige cambiar hooks, services, providers ni assessment.
- Glass acotado (opacidad alta, blur moderado) mantiene contraste razonable; Emergency/`danger` siguen fuera del look cristal (ver constraints).
- Documentar ≠ implementar: cero riesgo en runtime hasta tocar `className` / tokens.

---

## Notas de discusión

- Elegido el mockup Stitch “PreParto Liquid Glass” como referencia Home.
- Preferencia del producto: **cristal visible pero suave**, no app mate pura.
- Implementación v1: tokens → Layout/Card/Button → Home → resto (sin bottom nav).
- Bottom nav: **v2** ([MOBILE_NAV.md](./MOBILE_NAV.md)).

---

## Historial

| Fecha | Cambio |
| ----- | ------ |
| 2026-08-16 | Documento creado; sin dirección elegida |
| 2026-08-16 | Aceptada dirección A (Soft Liquid Glass) tras revisar export Stitch |
| 2026-08-16 | Iconografía fijada a Hugeicons Stroke Rounded ([ICONS.md](./ICONS.md)) |
| 2026-08-16 | Bottom nav móvil aceptado ([MOBILE_NAV.md](./MOBILE_NAV.md)) |
| 2026-08-16 | **Corrección:** bottom nav → PWA **v2**, no v1 |
