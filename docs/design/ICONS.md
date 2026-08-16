# Iconografía

## Objetivo

Definir el set de iconos de PreParto y el mapa sustituyendo los emojis actuales, alineado a Soft Liquid Glass y a [UI_CONSTRAINTS.md](./UI_CONSTRAINTS.md).

Referencia visual obligatoria: [stitch/screen.png](./stitch/screen.png) (export [stitch_preparto_mobile_ui_mockup.zip](./stitch_preparto_mobile_ui_mockup.zip)).

**Solo documentación.** No hay implementación en código todavía.

---

## Estado

**Aceptada para PWA v1** — Hugeicons **Stroke Rounded** + **siempre dentro de círculo** con contraste respecto al fondo.

Catálogo: [Stroke Rounded — Hugeicons](https://hugeicons.com/icons/stroke-rounded)

---

## Decisión de librería

| Campo | Valor |
| ----- | ----- |
| Librería | [Hugeicons](https://hugeicons.com/icons/stroke-rounded) |
| Estilo | **Stroke Rounded** (único estilo permitido en la app) |
| Paquetes previstos (cuando se implemente) | `@hugeicons/react` + `@hugeicons/core-free-icons` |
| API prevista | `<HugeiconsIcon icon={…Icon} size={24} strokeWidth={1.5} color="currentColor" />` |
| Exploración | Se puede buscar en Iconify u otras UIs, pero el **set canónico** es Hugeicons Stroke Rounded |
| Alternativas descartadas | Emojis (legado); Lucide como set único; Material Symbols por CDN; mezclar varios sets |

### Por qué

- Stroke redondeado y `strokeWidth` ~1.5 encajan con cards glass del mockup Stitch.
- Tree-shakeable → Offline First (SVG en el bundle; **sin** icon font CDN en el camino crítico).
- Mejor semántica de confianza que emojis alarmistas (`🚨`) en contextos clínicos orientativos.

### Qué no hacer

- No mezclar Stroke Rounded con Solid / Bulk / Duotone / Sharp.
- No usar CDN de icon font.
- No mostrar el glyph **suelto** sobre el fondo de página o de la card sin el círculo (salvo chevrons auxiliares; ver excepciones).

---

## Contenedor circular (obligatorio en v1)

Como en el mockup Stitch (`screen.png` / `code.html`): el icono **no** flota solo sobre el glass. Va **centrado en un círculo** que aporta contraste tonal frente al panel donde vive.

### Regla

```text
[ círculo de fondo ]  →  contraste con la superficie padre (card / banner / página)
[ glyph Hugeicons ]    →  color primary (o semántico), stroke 1.5
```

### Tokens de contraste (referencia Stitch)

| Capa | Token / valor | Rol |
| ----- | ------------- | --- |
| Fondo de página | gradiente `#fff0f0` → `#fff8f7` → `#fceae9` | Base |
| Card / banner glass | blanco ~40–50% + blur | Superficie padre |
| **Círculo del icono** | `surface-container-highest` `#f0dede` (rosa-gris más cerrado) | Contraste frente al glass blanco |
| Hover (cards) | puede pasar a `primary-container` `#e8a2a2` suave | Feedback |
| Glyph | `primary` `#874f4f` | Contraste frente al círculo |
| Banner (variante) | círculo `primary-container/40` + glyph `primary` | Como tip “Mantente hidratada” en el mockup |

El círculo debe verse **claramente más saturado / más “lleno”** que el glass claro detrás; no usar el mismo blanco translúcido del panel para el círculo (se pierde el icono).

### Medidas

| Contexto | Diámetro círculo | Icon size | strokeWidth |
| -------- | ---------------- | --------- | ----------- |
| Cards nav (lista) | 48px (`w-12 h-12`) | 24 | 1.5 |
| Cards compactas (grid 2 col.) | 40px (`w-10 h-10`) | 20–22 | 1.5 |
| Banner / tip | ~36–40px | 20–24 | 1.5 |
| Emergency / urgent | 48px, círculo **sólido** suave (`error-container` o primary según caso) | 24 | 1.5–1.75 |

Forma: `rounded-full`, flex center, sin sombra fuerte en el círculo (el mockup es plano/suave).

### Excepciones

| Elemento | ¿Círculo? | Motivo |
| -------- | --------- | ------ |
| Chevron derecho en cards | No | Acento de navegación, no pictograma de feature |
| **Iconos del bottom nav** | No | Solo en **v2** ([MOBILE_NAV.md](./MOBILE_NAV.md)); patrón barra del mockup |
| Texto/emoji legado | — | Hasta migrar; luego eliminar |

Todo pictograma de feature en **cards, síntomas, assessment, banners** **sí** lleva círculo.

---

## Convención de color del glyph

| Contexto | color del icono |
| -------- | ---------------- |
| Nav / cards / síntomas | `primary` (`#874f4f`) |
| Banner informativo | `primary` |
| Warning | tono warning / `Alert02` + color de estado |
| Urgent / Emergency | token `error` (`#ba1a1a`) sobre círculo sólido claro |

Accesibilidad: icono decorativo si hay texto; si solo icono, `aria-label` obligatorio.

---

## Mapas (exports previstos)

Nombres = `@hugeicons/core-free-icons` (confirmar `01`/`02` al implementar).

### Navegación (`NAV_ITEMS`)

| Feature | Emoji actual | Export previsto |
| -------- | ------------ | --------------- |
| Contracciones | ⏱️ | `Timer02Icon` |
| Rotura de bolsa | 💧 | `DropletIcon` |
| Síntomas | 📋 | `ClipboardIcon` |
| Historial | 🕘 | `HistoryIcon` (fallback: `Clock04Icon`) |
| Qué llevar al hospital | 🧳 | `Suitcase01Icon` (fallback: `LuggageIcon`) |
| Orientación / Emergency | 🚨 | `Alert01Icon` |
| Ajustes | ⚙️ | `Settings01Icon` |

### Síntomas (`SYMPTOM_CATALOG`)

| Tipo | Export previsto |
| ------ | --------------- |
| `mucus_plug` | `BubbleChatIcon` (fallback: `DropletIcon`) |
| `water_break` | `DropletIcon` |
| `bleeding` | `DropIcon` / `DropletIcon` |
| `fetal_movement` | `Baby01Icon` |
| `back_pain` | `BodyPartLegIcon` (fallback: `Bone01Icon`) |
| `pelvic_pressure` | `ArrowDown01Icon` |
| `nausea` | `SickIcon` (fallback: `FrowningIcon`) |
| `diarrhea` | `Toilet01Icon` |
| `chills` | `ThermometerColdIcon` (fallback: `SnowIcon`) |

### Assessment y contracciones

| Nivel | Assessment | Contracciones | Export |
| ----- | ---------- | ------------- | ------ |
| 0 | Info | Información | `InformationCircleIcon` |
| 1 | Seguimiento | Seguimiento | `ClipboardIcon` |
| 2 | Observación / patrón | Analytics | `ViewIcon` / `AnalyticsUpIcon` |
| 3 | Warning | Alert suave | `Alert02Icon` |
| 4 | Urgent | Alert | `Alert01Icon` |

Urgencia = **color + copy**, no sirena.

### Chrome auxiliar

| Uso | ¿Círculo? | Export |
| ---- | --------- | ------ |
| Chevron | No | `ArrowRight01Icon` |
| Bottom tabs | No (solo **v2**) | Ver [MOBILE_NAV.md](./MOBILE_NAV.md) |
| Offline / update en banner | Sí (si es pictograma de banner) | `WifiOff01Icon` / `Download01Icon` |

---

## Notas de implementación futura (no hacer aún)

1. Componente tipo `IconCircle` + `AppIcon`: círculo con token de fondo + Hugeicons dentro.
2. Sustituir `icon: string` emoji; actualizar tests.
3. Verificar exports en el paquete free; fallback de la misma fila sin cambiar estilo.
4. Comprobar contraste círculo↔glass y glyph↔círculo en móvil real.

---

## Historial

| Fecha | Cambio |
| ----- | ------ |
| 2026-08-16 | Decisión Hugeicons Stroke Rounded + mapas |
| 2026-08-16 | Regla obligatoria: icono en círculo con contraste (mockup Stitch); decisión v1 |
| 2026-08-16 | Bottom nav aceptado; tabs sin círculo (patrón barra) |
| 2026-08-16 | **Corrección:** bottom nav → **v2** |
