# Preparación para App Store / Play

Checklist actualizado en el ciclo de implementación (2026-09-06). Contrasta requisitos de tienda con el repositorio. **No afirma que la app esté lista para enviar a App Store o Play.**

Estados:

| Marca | Significado |
| ----- | ----------- |
| **Hecho** | Evidencia en el repo (código, assets o docs). |
| **Parcial** | Existe una base, pero no cubre el requisito de tienda. |
| **Hueco** | No hay evidencia; bloquea o retrasa una ficha de tienda. |

---

## Decisión de este ciclo: Capacitor (scaffold), no envío a tiendas

PreParto sigue siendo una **PWA** (Vite + `vite-plugin-pwa`) en GitHub Pages. Este ciclo añade **scaffolding Capacitor** para iOS y Android que empaqueta el build Vite (`dist`) en un WebView. **No hay publicación** en App Store Connect ni Play Console.

| Opción | Cubierta | Estado en este repo | Riesgo |
| ------ | -------- | ------------------- | ------ |
| **PWA** | Instalación web / «Añadir a pantalla de inicio». | Hecho (Pages). | iOS Safari limita notificaciones y UX de instalación. |
| **Capacitor** | Proyectos nativos iOS + Android que sirven `dist`. | **Parcial:** `capacitor.config.ts`, `@capacitor/*`, carpetas `android/` e `ios/`. | Apple **4.2 Minimum Functionality**: un wrapper fino que solo muestra la web suele rechazarse. Capacitor empaqueta los assets (no abre solo una URL), pero **aún no hay APIs nativas de valor** más allá del splash. **No enviar a App Store en este estado.** |
| **TWA** (Play) | Envolver la PWA hospedada. | **Hueco.** No hay Bubblewrap / Digital Asset Links. Alternativa a Capacitor para Play. | No cubre App Store. |

---

## Cómo abrir los proyectos nativos

Requisitos: Node 22, Java 17+ (Android), Xcode (solo macOS, iOS), Android Studio.

```bash
npm install
npm run cap:sync    # build Vite → dist y `npx cap sync`
npm run cap:android # abre Android Studio (`npx cap open android`)
npm run cap:ios     # abre Xcode (`npx cap open ios`) — solo macOS
```

- App id: `com.gallagit.preparto`
- Nombre: `PreParto`
- `webDir`: `dist` (salida de Vite)

Tras cambiar el frontend: `npm run cap:sync` de nuevo. No uses `npx cap copy` sin un `dist` reciente.

`npx cap open ios` **no funciona en Linux**; el proyecto `ios/` se genera y se versiona para abrirlo en un Mac.

---

## Checklist

### Empaquetado y presencia en tienda

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| PWA instalable (`display: standalone`, SW, manifest) | **Hecho** | `vite.config.ts` (`VitePWA`, `registerType: 'prompt'`), `UpdateBanner`. |
| Hosting HTTPS de la PWA | **Hecho** | `.github/workflows/deploy-github-pages.yml` → `gh-pages`. |
| Wrapper TWA (Play) | **Hueco** | Sin Bubblewrap, `assetlinks.json` ni TWA. |
| Wrapper Capacitor (iOS/Android) | **Parcial** | `@capacitor/core`, `cli`, `ios`, `android`, `splash-screen`; `capacitor.config.ts` (`webDir: dist`); proyectos `android/` e `ios/`. Falta firmar, cuentas de consola y justificar 4.2. |
| Cuenta / ficha App Store Connect | **Hueco** | Fuera del repo (legal, acuerdos, categoría Salud). |
| Cuenta / ficha Google Play Console | **Hueco** | Fuera del repo (Data safety, categoría). |
| Dominio / URL canónica estable para TWA | **Parcial** | Pages en `https://gallagit.github.io/preparto-app/` (base `/preparto-app/`). Un TWA suele pedir dominio propio y Digital Asset Links. |

### Iconos

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Favicon + mask icon | **Hecho** | `public/favicon.svg`, `public/mask-icon.svg`. |
| Iconos PWA 192 / 512 / maskable | **Hecho** | `public/pwa-192x192.png`, `pwa-512x512.png`, `pwa-512x512-maskable.png`. |
| Apple touch icon | **Hecho** | `public/apple-touch-icon.png` (180×180); ahora también en `index.html`. |
| Juego de iconos nativos (iOS 1024, Adaptive Android, etc.) | **Parcial** | Generados desde `public/pwa-512x512.png` con `scripts/apply-native-icons.sh` (App Icon 1024 es un upscale). Falta un original 1024 y adaptive Android de diseño. |
| Enlaces `apple-touch-icon` en `index.html` fuente | **Hecho** | Declarado en `index.html`. |

### Splash / pantalla de lanzamiento

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| `theme_color` / `background_color` del manifest | **Hecho** | `#874f4f` / `#fff8f7` en `vite.config.ts`; `theme-color` en `index.html`. |
| Splash nativo Capacitor / Android 12 | **Parcial** | Plugin `@capacitor/splash-screen` + color `#fff8f7`. Recurso ligero desde `pwa-512x512.png`. No es un set de splash por densidad/dispositivo. |
| Splash Apple (`apple-touch-startup-image`) | **Parcial** | Una meta en `index.html` apunta a `pwa-512x512.png`. Faltan tamaños por dispositivo. |
| `apple-mobile-web-app-capable` / título | **Hecho** | En `index.html` fuente. |

### Privacidad

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Datos solo en el dispositivo | **Hecho** | IndexedDB local (`docs/architecture/STORAGE.md`). Sin backend ni analytics de terceros en `src/`. |
| Exportar / borrar historial en la app | **Parcial** | Compartir/PDF y limpiar historial en `/history`. No hay flujo «eliminar todos mis datos» (perfil, preferencias, maleta). |
| Política de privacidad **pública (URL)** | **Parcial** | Página in-app `/privacy` (ES/EN), enlace en Configuración e Inicio. Tras el deploy de Pages: `https://gallagit.github.io/preparto-app/privacy`. Aún no hay ficha de tienda que apunte a esa URL. |
| Privacy Nutrition Labels / Data safety | **Hueco** | Hay que declararlos en las consolas (notificaciones locales, datos de salud en dispositivo). |
| Licencia en el repo | **Hecho** | `LICENSE` MIT, autor Ociel Gallardo Estiven, 2026. |

### Disclaimer médico

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Descargo en documentación | **Hecho** | `docs/medical/DISCLAIMER.md`. |
| Descargo en la UI | **Hecho** | Home, recomendaciones, Emergencia, export, y enlace desde `/privacy`. |
| Sin reglas clínicas nuevas en este ciclo | **Hecho** | Este ciclo no cambia `MEDICAL_RULES.md` ni el motor. |
| Página legal pública / URL para el listing | **Parcial** | `/privacy` apunta a `DISCLAIMER.md` en GitHub. No hay página legal aparte solo del disclaimer. |
| Copy de tienda no terapéutico | **Hueco** | Aún no hay ficha. Debe repetir que es apoyo orientativo, no diagnóstico. |

### Offline

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Precache + runtime Workbox | **Hecho** | `vite.config.ts`. |
| Persistencia local | **Hecho** | IndexedDB `preparto` v4. |
| Indicadores offline / update | **Hecho** | `OfflineBanner`, `UpdateBanner`. |
| Comprobado E2E «recargar sin red» | **Parcial** | `e2e/critical-flows.spec.ts` cubre flujos con red; no hay caso offline. |

### Capturas de revisión (review screenshots)

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Mockup de diseño | **Parcial** | `docs/design/stitch/screen.png`. |
| Set App Store (6,7" / 6,5" / 5,5", iPad si aplica) | **Hueco** | No hay carpeta de store screenshots. |
| Set Play (teléfono, 7" / 10" si se declara tablet) | **Hueco** | Idem. |
| Capturas localizadas ES/EN | **Hueco** | La app tiene i18n; faltan capturas por idioma. |

### Otros requisitos de revisión

| Ítem | Estado | Evidencia / hueco |
| ---- | ------ | ----------------- |
| Idioma del documento HTML | **Hecho** | `index.html` usa `lang="es"` (el locale de la UI sigue el selector). |
| Notificaciones: permiso y toggles | **Hecho** | Notification API local; Settings. Declarar en Data safety. |
| Llamadas de emergencia (`tel:`) | **Hecho** | `/emergency` + SOS. |
| Edad / categoría salud y embarazo | **Hueco** | Decisión de consola. |
| Guideline Apple 4.2 (no «solo un sitio web») | **Parcial / riesgo** | El wrapper Capacitor empaqueta `dist` y splash local. **Sigue habiendo riesgo alto de rechazo 4.2** si la app se percibe como un sitio web envuelto, porque no añade funcionalidad nativa sustancial. No enviar hasta tener una justificación (p. ej. APIs nativas reales o valor claramente offline empaquetado + UX nativa). |
| Cuenta de usuario / login | N/A (hecho por ausencia) | No hay auth; no aplica borrado de cuenta App Store 5.1.1(v). |

---

## Qué no entra en este ciclo

- Envío o publicación en App Store / Play.
- Backend, sincronización o cuentas.
- Nuevas reglas del Assessment Engine / `MEDICAL_RULES.md`.
- Marketing Business ni ficha comercial redactada.
- TWA / Digital Asset Links.
- Set completo de capturas de revisión.

---

## Qué queda para las tiendas

1. Decidir si Play irá por **TWA** (PWA hospedada) o por el **APK/AAB Capacitor**.
2. Icono 1024 y set nativo (iOS AppIcon, Android adaptive).
3. Splash por dispositivo (no solo el PNG 512).
4. Capturas reales de dispositivo, localizadas ES/EN.
5. Ficha de tienda (copy no diagnóstico) + Data safety / Nutrition Labels.
6. Mitigar Apple **4.2** antes de cualquier envío a App Store.
7. Cuentas de desarrollador, firma y revisión.

---

## Relación

- Estado del producto: [README.md](../../README.md)
- Roadmap Fase 4: [ROADMAP.md](./ROADMAP.md)
- Offline: [OFFLINE_FIRST.md](../architecture/OFFLINE_FIRST.md)
- Disclaimer: [DISCLAIMER.md](../medical/DISCLAIMER.md)
- Bitácora: [DEVELOPMENT_LOG.md](../development/DEVELOPMENT_LOG.md)
