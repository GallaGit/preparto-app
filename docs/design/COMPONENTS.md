# Componentes UI (contrato visual)

## Objetivo

Describir el contrato visual de los primitivos compartidos. La implementación cambia clases/tokens; **no** la API ni el comportamiento.

Referencia visual Home: [stitch/screen.png](./stitch/screen.png).

---

## Estado

**Borrador alineado a Soft Liquid Glass** — listo para guiar la migración de presentación. Pendiente de aplicar en código.

---

## Alcance del rediseño visual

### Incluido (presentación)

| Componente | Ruta | Qué se puede cambiar |
| ---------- | ---- | -------------------- |
| `Button` | `src/components/Button` | variantes, tipografía, radio, color |
| `Card` | `src/components/Card` | glass suave, borde, padding, icon circle |
| `Layout` | `src/components/Layout` | gradiente, orbes, márgenes |
| `PageHeader` | `src/components/PageHeader` | Playfair + Outfit, espaciado |
| `Form/*` | `src/components/Form` | campos glass-light / sólido legible |
| Banners | Offline, Update, Recommendation, ActiveContraction | look glass/semi-opaco; copy y lógica intactos |

### Excluido (lógica)

Hooks, services, providers, assessment engine, storage, validaciones de dominio, i18n (salvo layout por longitud).

Detalle: [UI_CONSTRAINTS.md](./UI_CONSTRAINTS.md) · diferidos: [VISUAL_DIRECTION.md](./VISUAL_DIRECTION.md).

---

## Contrato desde el mockup Home

| Elemento | Look |
| -------- | ---- |
| Card nav (lista) | `glass-panel`, `rounded-2xl`, icono en círculo `surface-container-highest`, chevron o badge |
| Badge activo | Pill rosa suave + texto `label-sm` (ej. En curso · tiempo) |
| Banner consejo | `glass-banner`, icono en círculo, texto body; **contenido real = assessment**, no tip hardcodeado |
| Orientación / Ajustes | Opcional grid 2 columnas (solo layout visual; mismas rutas) |
| Iconos | Hugeicons Stroke Rounded en **círculo** con contraste — [ICONS.md](./ICONS.md) |
| Bottom nav | **v2** — [MOBILE_NAV.md](./MOBILE_NAV.md) |
| Top notifications | **No** en v1 |

---

## Inventario de primitivos

| Componente | Variantes | Estados | Notas Soft Glass |
| ---------- | --------- | ------- | ---------------- |
| Button | primary, secondary, danger, ghost | default, hover, active, focus, disabled | primary **sólido** `#874f4f`; danger sólido; no glass en danger |
| Card | nav list / compact | hover, focus | max 2 capas glass; fallback opaco |
| Layout | — | — | gradiente + orbes; bottom nav en **v2** |
| PageHeader | centered / default | — | display serif en título |
| TextField / Select / DateTime / TextArea | — | error, disabled | preferir superficie legible; focus primary |

---

## Páginas (orden sugerido de aplicación)

1. Tokens Tailwind + fuentes locales + utilidades `.glass-panel` / `.glass-banner`
2. `Layout` + `Button` + `Card` + `PageHeader`
3. Home (sin bottom nav; v2 → [MOBILE_NAV.md](./MOBILE_NAV.md))
4. Contractions (timer **opaco**/alta legibilidad)
5. Emergency (**sin glass**; error sólido)
6. Symptoms / forms, History, Settings, Hospital bag
7. Banners globales

---

## Checklist por componente

Antes de dar por cerrado un primitivo:

- [ ] Misma API de props
- [ ] Focus visible
- [ ] Targets táctiles ≥ convención documentada
- [ ] Contraste texto/fondo aceptable (también sobre glass)
- [ ] Variante `danger` / urgente sigue siendo inequívoca
- [ ] Fallback sin `backdrop-filter`
- [ ] Sin CDN de fuentes/iconos en el camino crítico offline
- [ ] Sin cambios en handlers ni effects

---

## Historial

| Fecha | Cambio |
| ----- | ------ |
| 2026-08-16 | Inventario y alcance; sin estilos nuevos |
| 2026-08-16 | Contrato alineado a mockup Soft Liquid Glass |
