# Reglas médicas

## Objetivo

Definir los principios y el **catálogo MVP conservador** utilizado por el Assessment Engine.

Este documento no sustituye protocolos clínicos. Las reglas son **orientativas** y siempre deben acompañarse del disclaimer de la aplicación.

---

# Principios

Las reglas médicas deberán:

- estar basadas en evidencia científica;
- ser comprensibles;
- ser revisables;
- mantenerse independientes de la interfaz;
- producir resultados explicables.

---

# Disclaimer obligatorio

> Esta aplicación no sustituye una valoración médica. Si tienes dudas o te encuentras mal, contacta con tu equipo sanitario.

Toda recomendación generada por el Assessment Engine incluye este aviso.

---

# Catálogo MVP (v1)

Niveles: `0` datos insuficientes · `1` seguimiento · `2` observación reforzada · `3` contactar · `4` urgente orientativo.

| ID | Condición | Nivel | Acción orientativa | Fuente de referencia |
|----|-----------|-------|--------------------|----------------------|
| `bleeding_urgent` | Sangrado `abundant` o color `bright_red` | 4 | Ir al hospital / contactar equipo | OMS / NICE / ACOG (señales de alarma) |
| `fetal_movement_absent` | Movimiento fetal `absent` | 4 | Ir al hospital / contactar | OMS / NICE |
| `contractions_level_4` | Analyzer de contracciones nivel 4 | 4 | Urgente / contactar | Patrón temporal interno (alta frecuencia) |
| `water_break` | Cualquier registro de rotura de bolsa | 3 | Contactar matrona/hospital | NICE / ACOG |
| `contractions_level_3` | Analyzer nivel 3 (patrón tipo 5-1-1) | 3 | Contactar | Patrón temporal interno |
| `water_break_and_bleeding` | Bolsa + sangrado | 4 | Elevar a urgente | Combinación de señales |
| `water_break_and_regular_contractions` | Bolsa + contracciones ≥ nivel 2 | 4 | Elevar a urgente | Combinación de señales |
| `symptoms_over_24h` | ≥2 síntomas y >24h desde el primero, sin nivel ≥3 | 2 | Observar / contactar si empeora | Seguimiento continuo |
| `mild_symptoms` | Solo síntomas leves aislados | 1 | Observar, descansar, hidratarse, registrar | Seguimiento sintomático |
| `contractions_level_1_2` | Analyzer 1–2 | 1–2 | Seguir registrando / observar | Patrón temporal interno |

La clasificación final es el **máximo nivel** entre reglas aplicables.

---

# Implementación

Durante la primera versión, las reglas se implementan en TypeScript en `src/services/assessmentEngine.ts`.

El analyzer de contracciones (`contractionAnalyzer.ts`) se reutiliza como subconjunto de reglas; no se duplica su lógica.

---

# Explicabilidad

Toda recomendación indica el motivo (`matchedRules` + `explanation`).

El sistema nunca produce recomendaciones sin explicación asociada.

---

# Actualización

Las reglas podrán modificarse cuando exista nueva evidencia, cambien guías clínicas o se detecten mejoras. Toda modificación deberá documentarse aquí.

---

# Alcance

Orientado al periodo de preparto. No cubre todo el seguimiento del embarazo ni sustituye protocolos clínicos completos.

---

# Principio final

Claridad, trazabilidad y respaldo en fuentes reconocidas antes que complejidad técnica.
