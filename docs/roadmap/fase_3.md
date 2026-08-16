# Fase 3 — Experiencia avanzada

## Objetivo

Mejorar la experiencia de uso del MVP ya cerrado en la Fase 2, sin añadir dominio clínico nuevo.

Al finalizar esta fase, PreParto debe seguir siendo una herramienta de apoyo offline-first, más robusta al quedarse sin red, más fácil de llevar al hospital (exportar historial) y más comprobable en flujos reales.

Esta fase **no** incorpora backend, sincronización entre dispositivos, autenticación, IA ni aplicación nativa.

---

## Épica 3.1 — Offline granular

Refinar el service worker más allá del precache del bundle.

Incluye:

* Estrategias de caché en runtime (Workbox) para assets y navegación
* Indicador visible de estado sin conexión
* Aviso cuando hay una nueva versión de la aplicación lista para actualizar
* Comprobar que recargar sin red no deja la interfaz en blanco

Los datos de síntomas, contracciones, configuración y timer ya persisten en IndexedDB; esta épica cubre la **aplicación**, no el modelo de datos.

---

## Épica 3.2 — Exportar / compartir historial

Permitir sacar del dispositivo un resumen de lo registrado para llevarlo a consulta.

Incluye (UX actual en `/history`):

* Un botón **Compartir** que abre un modal de apps
* Compartir resumen en texto vía **WhatsApp** (`wa.me`) y **Gmail/correo** (`mailto`)
* **Descargar PDF** al teléfono desde el mismo modal
* Disclaimer en el contenido exportado: no es un informe médico

Fuera de la UI de Historial: export JSON, descargar texto plano, copiar al portapapeles y hoja nativa Web Share genérica (la generación de texto/JSON puede existir en utilidades para tests u otros usos).

Fuera de esta épica: envío automático a hospitales.

---

## Épica 3.3 — Notificaciones locales

Avisos en el propio dispositivo, sin servidor.

Incluye:

* Solicitud de permiso de notificaciones
* Recordatorio para seguir registrando (configurable)
* Aviso si el temporizador de contracciones sigue activo
* Textos no alarmistas y con el mismo límite sanitario que el resto de la app

Fuera de esta épica: Web Push remoto (requiere backend; queda para una fase posterior).

---

## Épica 3.4 — Tests E2E

Cubrir los flujos que Vitest de dominio no ve: rutas, IndexedDB real y PWA.

Incluye:

* Registrar un síntoma y verlo en el historial
* Completar una contracción con el temporizador y persistirla
* Comprobar que aparece una recomendación del Assessment Engine
* Guardar configuración y que sobreviva a una recarga

Las pruebas unitarias del motor y las reglas siguen siendo prioridad alta; el E2E no las sustituye.

---

## Épica 3.5 — Internacionalización (i18n)

Preparar la interfaz para más de un idioma.

Incluye:

* Extraer textos de la UI a un catálogo
* Usar `locale` de las preferencias ya previstas en almacenamiento
* Español como idioma por defecto
* Un segundo idioma (inglés) si el catálogo está estable

Hasta implementar esta épica, la interfaz permanece en español.

---

## Fuera de alcance

* Backend y sincronización remota
* Autenticación
* Web Push
* Inteligencia Artificial
* Aplicación nativa
* Migración de carpetas a `features/`
* Nuevas reglas clínicas del Assessment Engine

---

## Criterios para cerrar la Fase 3

Al finalizar esta fase una embarazada debe poder:

* Usar la aplicación instalada aunque se caiga la red, con un aviso claro de que está offline.
* Exportar o compartir su historial en un formato que pueda mostrar en consulta.
* Recibir recordatorios locales (si ha dado permiso), sin que la app envíe nada a un servidor.
* Confiar en que los flujos principales están cubiertos por pruebas E2E además de las de dominio.
* Seguir entendiendo que la aplicación no sustituye una valoración médica.

La i18n puede quedar iniciada (catálogo extraído + locale persistido) aunque el segundo idioma se complete al final de la fase.

---

## Mi recomendación antes de empezar

Aunque el orden anterior es lógico desde el punto de vista de producto, **desarrollaría las issues en este orden** para reducir retrabajo:

1. Offline granular.
2. Exportar / compartir historial.
3. Notificaciones locales.
4. Tests E2E (sobre los flujos ya estables).
5. Internacionalización.

Este orden prioriza la promesa Offline First y un entregable útil (el historial para consulta) antes de notificaciones e idioma.
