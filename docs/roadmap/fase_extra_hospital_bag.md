# Fase extra — Checklist «Qué llevar al hospital»

## Objetivo

Ofrecer una lista editable offline-first de objetos y tareas para preparar la maleta del hospital, sin añadir dominio clínico ni backend.

Detalle de producto: idea recogida en `Ideas.txt` y en el README («Checklist dinámico para el hospital»).

---

## Alcance

Incluye:

* Página `/hospital-bag` accesible desde Home
* Mensaje breve de cómo funciona el checklist
* Añadir, editar (inline) y eliminar ítems
* Eliminación por selección simple o múltiple (con confirmación)
* Marcar como prioritario (activos prioritarios arriba)
* Ítems marcados como hechos pasan a una sección «Hechos» debajo de la lista activa
* Persistencia en IndexedDB (`hospitalBag`, DB v4)
* Semilla única de ítems de ejemplo si el store está vacío
* Textos de interfaz en ES/EN (i18n)

Fuera de alcance:

* Sincronización entre dispositivos
* Plantillas clínicas o consejos médicos
* Exportar / compartir la lista
* Recordatorios push sobre la maleta

---

## Modelo

```ts
type HospitalBagItem = {
  id: string;
  label: string;
  done: boolean;
  priority: boolean;
  createdAt: string; // ISO
  updatedAt: string;
  completedAt?: string | null;
};
```

Orden UI:

* Activos: `priority === true` primero, luego `createdAt` ascendente
* Hechos: por `completedAt` descendente

---

## UX

1. La usuaria abre **Qué llevar al hospital** desde Home.
2. Lee el texto de ayuda y, si es la primera visita, ve ítems semilla editables.
3. Añade ítems con el formulario superior.
4. Pulsa el texto para editar; Enter o blur guarda; Escape cancela.
5. ★ marca prioridad; el checkbox mueve el ítem a «Hechos» (y viceversa).
6. **Seleccionar** activa checkboxes de selección; **Eliminar seleccionados** pide confirmación.

---

## Criterios de aceptación

- [x] Ruta `/hospital-bag` y entrada en navegación Home
- [x] CRUD + prioridad + sección DONE
- [x] Persistencia IndexedDB v4 store `hospitalBag`
- [x] Seed solo si el store está vacío
- [x] Textos de chrome i18n ES/EN
- [x] Tests de ordenación active/done y prioridad
- [x] Documentación en Contexto, STORAGE, ROADMAP y bitácora

---

## Archivos principales

| Área | Ruta |
|------|------|
| Página | `src/pages/HospitalBag.tsx` |
| UI | `src/components/HospitalBagChecklist/` |
| Hook | `src/hooks/useHospitalBag.ts` |
| Storage | `src/services/hospitalBagStorage.ts` |
| Tipos | `src/types/hospitalBag.ts` |
| Defaults | `src/data/hospitalBagDefaults.ts` |
| Orden | `src/utils/hospitalBagSort.ts` |
