# Design tokens

## Objetivo

Definir los valores visuales reutilizables (color, tipografía, espacio, radio, elevación) que alimentan Tailwind y los componentes.

- **Objetivo (aceptado):** tokens del mockup Soft Liquid Glass — [stitch/DESIGN.md](./stitch/DESIGN.md)
- **Código actual (aún no migrado):** `tailwind.config.js`, `src/index.css`

Este documento se actualiza cuando cambia la dirección en [VISUAL_DIRECTION.md](./VISUAL_DIRECTION.md).

---

## Estado

**Objetivo aceptado (Stitch).** Código de producción pendiente de migración en la rama de estilo.

---

## Color (objetivo Stitch)

### Superficie y fondo

| Token | Hex | Uso |
| ----- | --- | --- |
| `background` / `surface` | `#fff8f7` | Base |
| `surface-container-low` | `#fff0f0` | Gradiente / blush |
| `surface-container` | `#fceae9` | Capas |
| `surface-container-highest` | `#f0dede` | Círculos de icono |
| `on-surface` | `#221919` | Texto principal |
| `on-surface-variant` | `#524343` | Texto secundario |
| `outline` / `outline-variant` | `#847373` / `#d6c2c1` | Bordes suaves |

### Primary / acento

| Token | Hex | Uso |
| ----- | --- | --- |
| `primary` | `#874f4f` | Marca, iconos, énfasis |
| `on-primary` | `#ffffff` | Texto sobre primary sólido |
| `primary-container` | `#e8a2a2` | Acento rosa / chips |
| `on-primary-container` | `#6a3738` | Texto sobre container |

### Semánticos

| Rol | Token | Hex | Nota |
| ---- | ----- | --- | ---- |
| Error / urgencia | `error` | `#ba1a1a` | Sólido; **no glass** en Emergency |
| Error container | `error-container` | `#ffdad6` | Fondos de alerta |

### Material glass (CSS)

| Token conceptual | Valor | Uso |
| ---------------- | ----- | --- |
| `glass-panel` fill | `rgba(255, 255, 255, 0.4)` | Cards de navegación |
| `glass-panel` blur | `16px` | `backdrop-filter` |
| `glass-banner` fill | `rgba(255, 255, 255, 0.5)` | Banner informativo |
| `glass-banner` blur | `24px` | Banner |
| Borde glass | `1px solid rgba(255, 255, 255, 0.3–0.4)` | Specular edge |
| Sombra flotante | `0 40px 40px -15px rgba(135, 79, 79, 0.04)` | Elevación suave |

**Fallback offline / sin blur:** mismo layout con fondo `surface-container-lowest` (`#ffffff`) u opacidad ≥ 0.85, sin `backdrop-filter`.

### Gradiente de página

```text
linear-gradient(135deg, #fff0f0 0%, #fff8f7 50%, #fceae9 100%)
```

Orbes ambient (decorativos, `pointer-events: none`): blurs grandes con `primary-container` / `secondary-container` a baja opacidad.

---

## Color (código actual — legado)

Hasta migrar, la app sigue con `primary-50`…`900` y `accent-*` en `tailwind.config.js` (rosa más saturado tipo `#d4899a`). No mezclar ambos sistemas en la misma pantalla durante la migración.

---

## Tipografía (objetivo)

| Rol | Familia | Notas de implementación |
| ----- | -------- | --------------------- |
| Display / headlines | Playfair Display | Solo títulos; self-host woff2 |
| Body / labels | Outfit | UI y formularios; self-host woff2 |

Escalas: ver [stitch/DESIGN.md](./stitch/DESIGN.md) (`display-lg`, `headline-*`, `body-*`, `label-*`).

**Prohibido en producción PWA:** cargar estas fuentes solo desde `fonts.googleapis.com` (rompe Offline First). Usar archivos locales en `public/fonts/` o equivalente.

---

## Espaciado

| Token | Valor |
| ----- | ----- |
| unit | 4px |
| xs / sm / md / lg / xl / xxl | 4 / 8 / 16 / 24 / 32 / 48 |
| margin-mobile | 20px |
| gutter | 16px |

Ritmo: entre secciones no relacionadas preferir `xl`–`xxl`.

---

## Radios

| Uso | Valor |
| ---- | ----- |
| Cards / banners | `1.5rem` (24px, `rounded-2xl`) |
| Botones / inputs | `1rem` (16px) |
| Chips / pills | `full` |

---

## Interacción y foco

| Concepto | Convención |
| -------- | ---------- |
| Targets táctiles | ≥ 44px; cards con padding `lg` (24px) |
| Foco visible | Anillo visible sobre glass (primary / outline); no reducir contraste |
| Motion | Hover suave; `prefers-reduced-motion`: sin pulse del badge si molesta |
| Capas glass | Máximo 2 capas apiladas |

---

## Historial

| Fecha | Cambio |
| ----- | ------ |
| 2026-08-16 | Inventario de tokens actuales (legado) |
| 2026-08-16 | Tokens objetivo Soft Liquid Glass desde Stitch |
