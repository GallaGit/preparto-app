# Modelo de síntomas

## Objetivo

Definir el modelo de datos para el registro de síntomas (Épica 2.1).

---

## Base común

Todos los registros de síntoma comparten:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `string` | Identificador único |
| `type` | `SymptomType` | Discriminador del síntoma |
| `recordedAt` | `Date` | Fecha y hora del evento |
| `notes` | `string` | Observaciones (opcional, `''` si vacío) |

Definido en `src/types/symptom.ts` como unión discriminada `SymptomRecord`.

---

## Tipos

`mucus_plug`, `water_break`, `bleeding`, `fetal_movement`, `back_pain`, `pelvic_pressure`, `nausea`, `diarrhea`, `chills`.

Cada tipo añade campos específicos (cantidad, color, intensidad, etc.).

---

## Contracciones

Las contracciones **no** se migran al store `symptoms` en esta épica.

Siguen en `contractions` y reutilizan el timer existente.

Comparten el concepto de observaciones mediante el campo `notes` en `Contraction`.

La Épica 2.2 podrá presentar un historial unificado a partir de ambas fuentes.

---

## Flujo de registro

```text
UI (SymptomForm)
  → useSymptoms
  → createSymptom / validateSymptomInput
  → symptomsStorage.save
  → IndexedDB (symptoms)
```

No se invocan reglas clínicas ni el Assessment Engine en este flujo.
