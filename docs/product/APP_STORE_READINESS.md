# Preparación para App Store / Play

Checklist del ciclo 1 (2026-09-06): qué necesita una PWA para publicarse en tiendas, contrastado con el repositorio. **No añade reglas clínicas, backend ni scaffolding nativo.**

Estados:

| Marca | Significado |
| ----- | ----------- |
| **Hecho** | Evidencia en el repo (código, assets o docs). |
| **Parcial** | Existe una base, pero no cubre el requisito de tienda. |
| **Hueco** | No hay evidencia; bloquea o retrasa una ficha de tienda. |

---

## Decisión de este ciclo: sin wrapper nativo

**No hay Capacitor, Cordova, TWA ni carpetas `ios/` / `android/`.** `package.json` no declara `@capacitor/*`. Fase 3 dejó explícitamente fuera la app nativa (`docs/roadmap/fase_3.md`).

**Decisión (ciclo 1):** PreParto sigue siendo **PWA** (Vite + `vite-plugin-pwa`) desplegada en GitHub Pages. No se añade scaffolding nativo hasta un ciclo posterior con alcance propio.

| Opción | Cubierta | Encaje con este repo | Riesgo |
| ------ | -------- | -------------------- | ------ |
| **Solo PWA** (hoy) | Instalación web / «Añadir a pantalla de inicio». No es ficha de App Store ni de Play. | Ya implementado. | iOS Safari limita notificaciones y UX de instalación. |
| **TWA** (Trusted Web Activity, p. ej. PWABuilder / Bubblewrap) | **Play Store** envolviendo la PWA publicada. | Reutiliza el host HTTPS actual. Requiere Digital Asset Links y dominio estable. | No cubre App Store. |
| **Capacitor** | **iOS + Android** (WebView + iconos/splash nativos). | Encajaría el mismo frontend. Implica proyecto nativo, certificados y mantenimiento. | Apple **4.2 Minimum Functionality**: un wrapper que solo abre el sitio web suele rechazarse. |

Recomendación documental (no implementada): **TWA primero** si el objetivo próximo es Play; **Capacitor más tarde** solo si se decide App Store y se puede justificar valor nativo más allá de la URL web.

---

## Checklist

### Empaquetado y presencia en tienda

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| PWA instalable (`display: standalone`, SW, manifest) | **Hecho** | `vite.config.ts` (`VitePWA`, `registerType: 'prompt'`), `UpdateBanner` con `virtual:pwa-register/react`. |
| Hosting HTTPS de la PWA | **Hecho** | `.github/workflows/deploy-github-pages.yml` → `gh-pages`. |
| Wrapper TWA (Play) | **Hueco** | Sin Bubblewrap, `assetlinks.json` ni proyecto Android. |
| Wrapper Capacitor (iOS/Android) | **Hueco** | Sin `@capacitor/*`, `capacitor.config.*` ni proyectos nativos. **Decisión: no scaffolding en este ciclo.** |
| Cuenta / ficha App Store Connect | **Hueco** | Fuera del repo (legal, acuerdos, categoría Salud). |
| Cuenta / ficha Google Play Console | **Hueco** | Fuera del repo (Data safety, categoría). |
| Dominio / URL canónica estable para TWA | **Parcial** | Pages en `https://gallagit.github.io/preparto-app/` (base `/preparto-app/`). Un TWA suele pedir dominio propio y Digital Asset Links. |

### Iconos

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Favicon + mask icon | **Hecho** | `public/favicon.svg`, `public/mask-icon.svg`. |
| Iconos PWA 192 / 512 / maskable | **Hecho** | `public/pwa-192x192.png` (192×192), `pwa-512x512.png`, `pwa-512x512-maskable.png` (512×512); declarados en `vite.config.ts`. |
| Apple touch icon | **Hecho** | `public/apple-touch-icon.png` (180×180), `includeAssets` en VitePWA. |
| Juego de iconos nativos (iOS 1024, Adaptive Android, etc.) | **Hueco** | Los PNG actuales cubren PWA, no el set de Xcode / Play. |
| Enlaces `apple-touch-icon` en `index.html` fuente | **Parcial** | `index.html` no los declara; VitePWA los inyecta en el build. |

### Splash / pantalla de lanzamiento

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| `theme_color` / `background_color` del manifest | **Hecho** | `#874f4f` / `#fff8f7` en `vite.config.ts`; `theme-color` en `index.html`. |
| Splash nativo Capacitor / Android 12 | **Hueco** | No hay proyecto nativo. |
| Splash Apple (`apple-touch-startup-image`, varios tamaños) | **Hueco** | No hay imágenes ni metas de splash en `index.html`. |
| `apple-mobile-web-app-capable` / título | **Hueco** | No están en `index.html` fuente. |

### Privacidad

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Datos solo en el dispositivo | **Hecho** | IndexedDB local (`docs/architecture/STORAGE.md`). Sin backend ni analytics de terceros en `src/`. |
| Exportar / borrar historial en la app | **Parcial** | Compartir/PDF y limpiar historial en `/history`. No hay flujo «eliminar todos mis datos» (perfil, preferencias, maleta) ni texto legal de retención. |
| Política de privacidad **pública (URL)** | **Hueco** | No hay ruta `/privacy`, ni `docs/legal/`, ni URL para el listing. **App Store y Play la exigen.** |
| Privacy Nutrition Labels / Data safety | **Hueco** | Hay que declararlos en las consolas (notificaciones locales, datos de salud en dispositivo). |
| Licencia en el repo | **Hueco** | El README afirma MIT; **no existe `LICENSE` en la raíz**. |

### Disclaimer médico

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Descargo en documentación | **Hecho** | `docs/medical/DISCLAIMER.md` (no es dispositivo médico; no diagnostica). |
| Descargo en la UI | **Hecho** | Home (`home.disclaimer`), recomendaciones / Assessment Engine, Emergencia, export de historial. |
| Sin reglas clínicas nuevas en este ciclo | **Hecho** | Este documento no cambia `MEDICAL_RULES.md` ni el motor. |
| Página legal pública / URL para el listing | **Hueco** | El disclaimer vive en docs e in-app, no en una URL estable aparte de GitHub. |
| Copy de tienda no terapéutico | **Hueco** | Aún no hay ficha. Debe repetir que es apoyo orientativo, no diagnóstico. |

### Offline

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Precache + runtime Workbox | **Hecho** | `vite.config.ts` (`navigateFallback`, NetworkFirst / SWR). |
| Persistencia local | **Hecho** | IndexedDB `preparto` v4 (contracciones, síntomas, settings, preferencias, hospital bag). |
| Indicadores offline / update | **Hecho** | `OfflineBanner`, `UpdateBanner`. |
| Comprobado E2E «recargar sin red» | **Parcial** | `e2e/critical-flows.spec.ts` cubre flujos con red; no hay caso offline documentado en ese spec. |

### Capturas de revisión (review screenshots)

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Mockup de diseño | **Parcial** | `docs/design/stitch/screen.png` (Home de diseño, no captura de la app en dispositivo). |
| Set App Store (6,7" / 6,5" / 5,5", iPad si aplica) | **Hueco** | No hay carpeta de store screenshots. |
| Set Play (teléfono, 7" / 10" si se declara tablet) | **Hueco** | Idem. |
| Capturas localizadas ES/EN | **Hueco** | La app sí tiene i18n; faltan capturas por idioma. |

### Otros requisitos de revisión

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Idioma del documento HTML | **Parcial** | `index.html` tiene `lang="en"`; el producto por defecto es español (`manifest.lang: 'es'`). |
| Notificaciones: permiso y toggles | **Hecho** | Notification API local (no Web Push); Settings. Declarar en Data safety. |
| Llamadas de emergencia (`tel:`) | **Hecho** | `/emergency` + SOS en bottom nav. Revisar copy para no parecer servicio de emergencias. |
| Edad / categoría salud y embarazo | **Hueco** | Decisión de consola (p. ej. 17+ / Medical / Pregnancy). |
| Guideline Apple 4.2 (no «solo un sitio web») | **Hueco** | Riesgo alto si se envuelve la PWA sin APIs nativas ni offline empaquetado de forma nativa. |
| Cuenta de usuario / login | N/A (hecho por ausencia) | No hay auth; no aplica borrado de cuenta App Store 5.1.1(v). |

---

## Qué no entra en este ciclo

- Backend, sincronización o cuentas.
- Nuevas reglas del Assessment Engine / `MEDICAL_RULES.md`.
- Marketing Business ni ficha comercial redactada.
- Scaffolding Capacitor o TWA.

---

## Orden sugerido (ciclos siguientes)

1. Redactar y publicar **política de privacidad + disclaimer** en una URL HTTPS estable.
2. Añadir `LICENSE` si se confirma MIT.
3. Decidir **Play vía TWA** vs **Capacitor para ambas tiendas**.
4. Iconos/splash del wrapper elegido y capturas de dispositivo reales.
5. Ficha de tienda con copy no diagnóstico.

---

## Relación

- Estado del producto: [README.md](../../README.md)
- Roadmap Fase 4: [ROADMAP.md](./ROADMAP.md)
- Offline: [OFFLINE_FIRST.md](../architecture/OFFLINE_FIRST.md)
- Disclaimer: [DISCLAIMER.md](../medical/DISCLAIMER.md)
- Bitácora: [DEVELOPMENT_LOG.md](../development/DEVELOPMENT_LOG.md)
