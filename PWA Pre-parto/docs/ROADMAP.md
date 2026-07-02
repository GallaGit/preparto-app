# 🗺️ PreParto - Roadmap

## Fase 1 — Base del proyecto ✅

- [x] Estructura del proyecto (React + TypeScript + Vite)
- [x] Tailwind CSS y diseño mobile-first
- [x] Configuración PWA (manifest, service worker, iconos)
- [x] React Router y navegación
- [x] Pantalla Home con tarjetas de navegación
- [x] Layout reutilizable
- [x] Componentes base: Button, Card, Layout, TimerDisplay
- [x] Cronómetro de contracciones funcional

---

## Fase 2 — Historial y persistencia ✅

- [x] Tipo `Contraction` con tipado estricto
- [x] Persistencia con IndexedDB (`contractionsStorage.ts`)
- [x] Hook `useContractions`
- [x] Historial automático al finalizar contracción
- [x] Cálculo automático de duración e intervalo
- [x] Estadísticas (última, promedios, total)
- [x] Eliminación individual de registros
- [x] Borrado total con confirmación
- [x] Componentes: ContractionCard, HistoryList, StatisticsCard, RecommendationBanner
- [x] Recomendación orientativa basada en reglas (patrón 5-1-1)
- [x] Aviso legal en recomendaciones

---

## Fase 3 — Funcionalidades ampliadas ⏳

- [ ] Cronómetro de ruptura de bolsa
- [ ] Checklist de síntomas con severidad
- [ ] Página de emergencia con contactos rápidos
- [ ] Configuración (semana de gestación, preferencias)
- [ ] Exportación o compartir historial

---

## Fase 4 — Experiencia avanzada ⏳

- [ ] Estrategias de caché offline más granulares
- [ ] Notificaciones push
- [ ] Tests unitarios (hooks, utilidades)
- [ ] Tests E2E de flujos críticos
- [ ] Internacionalización (i18n)
