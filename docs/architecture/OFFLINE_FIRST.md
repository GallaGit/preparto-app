# Offline First

## Objetivo

PreParto debe ser completamente funcional sin conexión a Internet.

La aplicación debe seguir siendo útil incluso cuando el dispositivo no tenga acceso a la red.

---

## Principios

- La conexión a Internet no será un requisito para utilizar las funciones principales.
- Las evaluaciones deben realizarse localmente.
- La información necesaria para el funcionamiento estará disponible en el dispositivo.

---

## Alcance

La aplicación permite usar sin conexión las funcionalidades principales.

No depende de servicios externos para realizar una evaluación.

### Capa de datos

IndexedDB (`preparto`) guarda síntomas, contracciones, configuración y preferencias en el dispositivo.

### Capa de aplicación (PWA)

- Precache del shell con Workbox (`vite-plugin-pwa`).
- `navigateFallback` a `index.html` para rutas SPA offline.
- Runtime caching: `NetworkFirst` para navegación y `StaleWhileRevalidate` para assets.
- Indicador visible de estado sin conexión (`OfflineBanner`).
- Aviso de nueva versión con confirmación (`UpdateBanner` + `registerType: 'prompt'`).

---

## Beneficios

Esta estrategia permite:

- utilizar la aplicación en cualquier lugar;
- reducir la dependencia de la conectividad;
- mejorar la disponibilidad del producto;
- ofrecer una experiencia más consistente.

---

## Evolución

Si en el futuro se incorpora un backend, la aplicación deberá mantener su funcionamiento básico sin conexión siempre que sea posible.

El modo online deberá complementar la experiencia, no sustituirla.
