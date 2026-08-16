# Restricciones del rediseño de UI

## Objetivo

Definir qué **no** puede romperse al cambiar el estilo visual de PreParto.

Documento aceptado desde su creación. Aplica a cualquier trabajo en la rama de estilo (p. ej. `style/ui-redesign`).

---

## Regla de oro

**UI = presentación.** Si un cambio exige editar lógica de dominio, storage, providers o validaciones, está fuera de alcance del rediseño visual.

---

## No tocar (salvo bug bloqueante ajeno al diseño)

- `src/hooks/**`
- `src/services/**`
- `src/providers/**`
- `src/contexts/**`
- Motor de evaluación y tipos de dominio
- Persistencia IndexedDB / preferencias
- Mensajes i18n (contenido); solo layout si un idioma desborda
- Tests de dominio (sí pueden fallar si se cambia semántica visual de forma incorrecta; no reescribir asserts de negocio por estética)

---

## Sí se puede tocar

- `tailwind.config.js`, `src/index.css`
- `className` y markup visual en componentes/páginas
- Assets estáticos locales (iconos, tipografías locales)
- Documentación en `docs/design/`

---

## Accesibilidad (no negociable)

- Mantener o mejorar contraste de texto y controles
- Conservar foco visible (`focus-visible`)
- Conservar alturas mínimas táctiles (`min-h-11` / `min-h-14` o equivalente documentado)
- No eliminar `aria-*`, `role`, labels asociados a controles
- Preferir `prefers-reduced-motion` si se añaden animaciones

---

## Semántica de urgencia y confianza

- El estado urgente / `danger` / pantalla Emergency debe seguir siendo inequívoco
- No usar color de marca o decoración para mensajes que requieren acción inmediata
- Cumplir [UX_PRINCIPLES.md](../product/UX_PRINCIPLES.md): sin lenguaje ni estética alarmista
- No sustituir copy médico ni disclaimers por “microcopy creativo”

---

## Offline / PWA

- No depender de fuentes o CSS de CDN externos para la experiencia principal
- No asumir conexión para estilos críticos
- Comprobar que banners Offline / Update siguen visibles y usables

---

## Navegación y estructura

- **PWA v1:** navegación = Home + cards; **sin** bottom nav
- **PWA v2:** bottom nav móvil según [MOBILE_NAV.md](./MOBILE_NAV.md); solo rutas existentes
- No crear pantallas nuevas “por diseño” en la pasada visual v1
- Una tarea principal por pantalla (principio de simplicidad)

---

## Forma de trabajo recomendada

1. Documentar dirección → tokens → primitivos → páginas
2. Commits pequeños por capa
3. Verificar manualmente rutas críticas: Home, Contracciones (timer), Emergency, Symptoms, History
4. No mezclar refactors de lógica en el mismo PR/commit de estilo

---

## Notas Soft Liquid Glass (Stitch)

Dirección aceptada: [VISUAL_DIRECTION.md](./VISUAL_DIRECTION.md).

- Glass solo en cromo/cards/banners informativos; **timer y Emergency opacos / solid danger**.
- Bottom nav: **no en v1**; previsto en **v2** ([MOBILE_NAV.md](./MOBILE_NAV.md)). Campana de notificaciones: no.
- Fuentes: **self-host**; el HTML de Stitch usa CDN solo como referencia.
- Iconos: Hugeicons Stroke Rounded empaquetados ([ICONS.md](./ICONS.md)); sin icon font CDN.
- Máximo dos capas glass; ofrecer fallback sin `backdrop-filter`.

---

## Historial

| Fecha | Cambio |
| ----- | ------ |
| 2026-08-16 | Restricciones iniciales del rediseño visual |
| 2026-08-16 | Notas Soft Liquid Glass tras aceptar mockup Stitch |
| 2026-08-16 | Bottom nav como v1; **corregido a v2** |
