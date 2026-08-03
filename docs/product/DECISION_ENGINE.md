# Decision Engine

> **Nota:** Aunque internamente la arquitectura utiliza el término **Assessment Engine**, este documento mantiene el nombre **Decision Engine** por coherencia con la estructura actual de la documentación del proyecto.

## Objetivo

Definir la responsabilidad del componente encargado de evaluar la información registrada por la usuaria y generar una recomendación basada en reglas del dominio.

El Decision Engine constituye el núcleo funcional de PreParto.

---

## Responsabilidad

El Decision Engine es responsable de:

- recibir información estructurada;
- evaluar las reglas del dominio;
- generar una explicación;
- generar una recomendación.

No es responsable de:

- mostrar información en pantalla;
- almacenar datos;
- gestionar componentes React;
- utilizar Inteligencia Artificial.

---

## Principios

### Basado en reglas

Todas las recomendaciones deben estar respaldadas por reglas claramente definidas.

---

### Explicable

Toda recomendación debe indicar el motivo por el que ha sido generada.

---

### Determinista

La misma información de entrada debe producir siempre el mismo resultado.

---

### Independiente de la interfaz

El motor no depende de React ni de componentes visuales.

---

## Flujo

```text
Información estructurada
            ↓
     Evaluación
            ↓
 Aplicación de reglas
            ↓
     Explicación
            ↓
    Recomendación
```

---

## Evolución

Durante la primera versión las reglas estarán implementadas en TypeScript.

Su representación podrá evolucionar cuando el crecimiento del proyecto lo justifique, manteniendo el motor como único responsable de la evaluación.
