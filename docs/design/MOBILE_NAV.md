# Navegación móvil (bottom nav)

## Objetivo

Definir la barra de navegación inferior para **móvil**, porque PreParto es una PWA pensada para usarse en el teléfono a medio plazo.

Referencia visual: [stitch/screen.png](./stitch/screen.png) · [stitch/code.html](./stitch/code.html) (`BottomNavBar`, `md:hidden`).

**Documentación solamente.** Sin implementación en código todavía.

---

## Estado

**Aplazada a PWA v2** (o posterior).

**No forma parte de PWA v1.** En v1 la navegación móvil sigue siendo Home + cards (lista/grid), sin barra inferior fija.

Motivo del aplazamiento: v1 prioriza el rediseño visual (Soft Liquid Glass, tokens, iconos) **sin** cambiar el cromo de navegación global; el bottom nav implica Layout, padding, IA percibida y más superficie de prueba.

---

## Por qué existirá (v2+)

- Uso previsto en **móvil** (timer, síntomas, orientación con una mano).
- El mockup Stitch ya muestra bottom nav glass; se alineará producto y look en una fase dedicada.
- Destinos frecuentes a un toque, sin depender solo de la lista de cards de Home.
- Cumple [UX_PRINCIPLES.md](../product/UX_PRINCIPLES.md): rapidez y previsibilidad.

---

## Look objetivo (cuando se implemente en v2)

| Propiedad | Valor (mockup) |
| --------- | -------------- |
| Visibilidad | Solo móvil (`md:hidden` o equivalente) |
| Posición | `fixed` bottom, full width, `z` alto |
| Material | Glass: `bg-surface/80` + `backdrop-blur-xl`, borde superior claro |
| Forma | `rounded-t-xl`, sombra suave hacia arriba |
| Altura | ~80px + **safe area** (`env(safe-area-inset-bottom)`) |
| Contenido | 4 destinos; activo = pastilla/rosa suave (`primary-container`) |

Padding del `main`: reservar espacio inferior para que el contenido no quede bajo la barra.

---

## Los 4 tabs previstos (mapeo a rutas **existentes**)

Los nombres del mockup (Inicio / Registro / Guía / Ajustes) se mapearán a rutas que **ya existan** entonces. No inventar pantallas solo por el mockup.

| Tab (label UI) | Ruta prevista | Icono Hugeicons (previsto) | Notas |
| -------------- | ------------- | --------------------------- | ----- |
| Inicio | `/` (Home) | `Home01Icon` | Hub + cards |
| Registro | `/contractions` | `Timer02Icon` o `Activity01Icon` | Alternativa: `/symptoms` |
| Guía | `/emergency` | `Compass01Icon` o `BookOpen01Icon` | Orientación |
| Ajustes | `/settings` | `Settings01Icon` | Preferencias |

### Fuera de la barra (Home / cards)

Rotura de bolsa, Síntomas, Historial, Qué llevar al hospital, etc.

---

## Relación Home ↔ bottom nav (v2)

| Superficie | Rol |
| ---------- | --- |
| **Bottom nav** | Atajos globales en móvil (4 destinos) |
| **Cards Home** | Descubrimiento + catálogo amplio |

En **v1** solo aplica la columna de cards Home.

---

## Iconos en la bottom nav (v2)

Patrón del mockup: iconos de tab **sin** el círculo de feature cards.

| Estado | Tratamiento |
| ------- | ----------- |
| Inactivo | Stroke, `on-surface-variant` |
| Activo | Fill o pastilla `primary-container` + label |

En v1, los pictogramas de feature siguen con **círculo** ([ICONS.md](./ICONS.md)).

---

## Restricciones (v2)

- Solo rutas existentes; no crear rutas “porque el mockup lo diga”.
- Solo presentación + router; sin lógica de dominio en el nav.
- Targets táctiles ≥ ~44px y labels visibles.
- Campana de notificaciones del top bar: sigue fuera hasta haber producto.

Ver [UI_CONSTRAINTS.md](./UI_CONSTRAINTS.md) · [PWA_V1_DECISION.md](./PWA_V1_DECISION.md).

---

## Criterio de aceptación (v2, cuando se implemente)

1. Bottom nav visible en móvil; no tapa contenido crítico.
2. Safe area en iPhone / notch.
3. Tab activo claro; 4 rutas existentes.
4. Glass legible; fallback sólido sin blur.
5. Desktop/tablet: ocultar o adaptar sin romper la app.

---

## Historial

| Fecha | Cambio |
| ----- | ------ |
| 2026-08-16 | Bottom nav descrito (primero como v1) |
| 2026-08-16 | **Corrección:** aplazado a **PWA v2**; fuera de v1 |
