# Diseño visual (UI / estilo)

Índice del sistema visual de PreParto.

Esta carpeta documenta **cómo se ve** la app. No define lógica de dominio ni flujos de producto: esos viven en `product/`, `architecture/` y `medical/`.

Los principios de experiencia (simplicidad, claridad, no alarmismo) siguen en [UX_PRINCIPLES.md](../product/UX_PRINCIPLES.md). Aquí se concreta la dirección estética y los tokens.

---

## Estado

| Documento | Estado |
| --------- | ------ |
| [PWA_V1_DECISION.md](./PWA_V1_DECISION.md) | **Aceptada** — resumen decisión visual v1 |
| [MOBILE_NAV.md](./MOBILE_NAV.md) | Bottom nav móvil — **PWA v2** (no v1) |
| [VISUAL_DIRECTION.md](./VISUAL_DIRECTION.md) | Soft Liquid Glass (Stitch) |
| [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) | Objetivo Stitch; código aún legado |
| [COMPONENTS.md](./COMPONENTS.md) | Contrato visual borrador |
| [ICONS.md](./ICONS.md) | Hugeicons Stroke Rounded + **círculo obligatorio** |
| [UI_CONSTRAINTS.md](./UI_CONSTRAINTS.md) | Límites del rediseño |
| [stitch/](./stitch/) | Export Home (png, DESIGN.md, code.html) |

---

## Cómo usar esta carpeta

1. Empezar por [PWA_V1_DECISION.md](./PWA_V1_DECISION.md) (resumen cerrado).
2. Dirección detallada en `VISUAL_DIRECTION.md`.
3. Tokens en `DESIGN_TOKENS.md`.
4. Primitivos según `COMPONENTS.md`.
5. Iconos + círculos según `ICONS.md`.
6. Bottom nav: documentado para **v2** (`MOBILE_NAV.md`); no implementar en v1.
7. Respetar `UI_CONSTRAINTS.md` y diferidos.

---

## Relación con el código

| Concepto | Código (referencia) |
| --------- | -------------------- |
| Tokens de color / tipografía | `tailwind.config.js`, `src/index.css` (pendiente migrar a tokens Stitch) |
| Primitivos UI | `src/components/Button`, `Card`, `Modal`, `Layout`, `Form`, `PageHeader` |
| Lógica (no tocar en rediseño visual) | `src/hooks`, `src/services`, `src/providers`, `src/utils` de dominio |
