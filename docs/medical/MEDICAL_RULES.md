# Reglas médicas

## Objetivo

Definir los principios que seguirán las reglas utilizadas por el Assessment Engine.

Este documento no contiene la implementación de las reglas, sino los criterios que deberán cumplir durante el desarrollo del proyecto.

---

# Principios

Las reglas médicas deberán:

- estar basadas en evidencia científica;
- ser comprensibles;
- ser revisables;
- mantenerse independientes de la interfaz;
- producir resultados explicables.

---

# Implementación

Durante la primera versión, las reglas se implementarán directamente en TypeScript dentro del Assessment Engine.

No se utilizará un sistema configurable mientras el volumen de reglas no lo justifique.

---

# Explicabilidad

Toda recomendación deberá indicar el motivo por el que ha sido generada.

El sistema nunca deberá producir recomendaciones sin una explicación asociada.

---

# Actualización

Las reglas podrán modificarse cuando:

- exista nueva evidencia científica;
- cambien las guías clínicas de referencia;
- se detecten mejoras durante el desarrollo del proyecto.

Toda modificación deberá quedar documentada.

---

# Alcance

Las reglas del proyecto estarán orientadas al periodo de preparto.

No tienen como objetivo cubrir todo el seguimiento del embarazo ni sustituir protocolos clínicos completos.

---

# Principio final

Las reglas del dominio deben priorizar la claridad, la trazabilidad y el respaldo en fuentes médicas reconocidas antes que la complejidad técnica.
