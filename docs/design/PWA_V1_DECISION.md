# Decisión visual final — PreParto PWA v1

## Estado

**Aceptada** (2026-08-16). Guía la rama de estilo. **Aún no implementada en código.**

---

## Resumen en una frase

PreParto **v1** se ve como **Soft Liquid Glass** (mockup Stitch): cálida, calmada, cristal suave; iconos **Hugeicons Stroke Rounded** en **círculo** con contraste; navegación por **Home + cards** (sin bottom nav). El bottom nav queda para **v2** — [MOBILE_NAV.md](./MOBILE_NAV.md).

---

## Fuentes de verdad

| Qué | Documento / artefacto |
| --- | --------------------- |
| Look Home | [stitch/screen.png](./stitch/screen.png) · zip [stitch_preparto_mobile_ui_mockup.zip](./stitch_preparto_mobile_ui_mockup.zip) |
| Decisión consolidada v1 | este archivo |
| Dirección y diferidos | [VISUAL_DIRECTION.md](./VISUAL_DIRECTION.md) |
| Bottom nav (**v2**) | [MOBILE_NAV.md](./MOBILE_NAV.md) |
| Tokens color / tipo / glass | [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) · [stitch/DESIGN.md](./stitch/DESIGN.md) |
| Primitivos UI | [COMPONENTS.md](./COMPONENTS.md) |
| Iconos + círculos | [ICONS.md](./ICONS.md) |
| Qué no romper | [UI_CONSTRAINTS.md](./UI_CONSTRAINTS.md) |
| UX de producto | [UX_PRINCIPLES.md](../product/UX_PRINCIPLES.md) |

---

## Decisiones cerradas (v1)

| Tema | Decisión |
| ---- | -------- |
| Producto / dispositivo | Pensada para móvil; en v1 **sin** bottom nav (cards en Home) |
| Estética | Soft Liquid Glass (no glass agresivo, no dark mode, no purple neon) |
| Paleta | Warm blush / cream / rose (`#fff8f7`, `#e8a2a2`, primary `#874f4f`, …) |
| Tipografía objetivo | Playfair Display (títulos) + Outfit (UI); **self-host**, no CDN en producción |
| Cards / banners | Glass suave, `rounded-2xl` (24px), borde claro, sombra rosa muy suave |
| **Bottom nav** | **No en v1** → documentado para **v2** ([MOBILE_NAV.md](./MOBILE_NAV.md)) |
| Iconos (features) | Hugeicons Stroke Rounded en **círculo** con contraste |
| Alertas | `Alert01Icon` / `Alert02Icon` + color; sin emoji sirena |
| Emergency / danger / timer crítico | Superficies **sólidas** o alta opacidad; no glass fuerte |
| Offline | Sin fuentes/icon fonts por CDN en el camino crítico |
| Alcance de código (pasada visual) | Solo presentación (`className`, tokens, componentes visuales) |

---

## Explicitamente fuera de v1

- **Bottom tab bar** (previsto en v2; ver [MOBILE_NAV.md](./MOBILE_NAV.md))
- Campana de notificaciones en top bar
- Tip hardcodeado “Mantente hidratada” como sustituto del assessment
- Crear rutas o pantallas nuevas solo por el mockup
- Lógica de dominio / storage / assessment por estética

---

## Criterio de aceptación visual (v1)

1. Home reconocible frente a [stitch/screen.png](./stitch/screen.png) **sin** exigir bottom nav.
2. Cada feature icon = círculo + Hugeicons, legible sobre glass.
3. Contraste y legibilidad en glass.
4. Timer y Emergency claros bajo estrés.
5. Cero regresiones de dominio (tests de lógica en verde).

---

## Orden de implementación (rama de estilo v1)

1. Tokens Tailwind + utilidades glass + fuentes locales  
2. `IconCircle` / primitivos `Button`, `Card`, `Layout`, `PageHeader`  
3. Home → resto de páginas  
4. Sustituir emojis según [ICONS.md](./ICONS.md)  
5. *(v2)* Bottom nav — [MOBILE_NAV.md](./MOBILE_NAV.md)

---

## Historial

| Fecha | Cambio |
| ----- | ------ |
| 2026-08-16 | Decisión final PWA v1 consolidada (Stitch + Hugeicons + círculos) |
| 2026-08-16 | Bottom nav marcado v1 por error; **corregido: v2** |
