# Estructura del proyecto

## Objetivo

Definir la organización del código fuente de PreParto para mantener una estructura clara, coherente y fácil de mantener.

La estructura debe facilitar el crecimiento del proyecto sin perder la separación de responsabilidades.

---

## Estructura general

```text
src/
├── app/
├── assets/
├── core/
├── features/
└── shared/
```

Cada directorio tiene una responsabilidad específica y no debe asumir responsabilidades de otro.

---

## app

Contiene la configuración principal de la aplicación.

Ejemplos:

- configuración de la aplicación;
- rutas;
- proveedores globales;
- layout principal.

No contiene lógica del dominio.

---

## assets

Contiene recursos estáticos utilizados por la aplicación.

Ejemplos:

- imágenes;
- iconos;
- fuentes;
- archivos multimedia.

---

## core

Contiene la infraestructura compartida por toda la aplicación.

Ejemplos:

- configuración;
- almacenamiento;
- constantes globales;
- utilidades de infraestructura;
- servicios técnicos.

No contiene reglas del dominio.

---

## features

Contiene las funcionalidades del negocio.

Cada feature representa una capacidad de la aplicación y debe ser lo más independiente posible del resto.

Ejemplos:

```text
features/
├── assessment/
├── pregnancy/
├── preparation/
├── settings/
└── timeline/
```

La organización podrá evolucionar conforme el producto incorpore nuevas funcionalidades.

---

## Estructura interna de una feature

Cada feature seguirá una organización similar.

```text
feature/
├── components/
├── hooks/
├── services/
├── types/
├── utils/
├── constants/
└── index.ts
```

No todas las carpetas son obligatorias. Solo se crearán cuando aporten valor a la funcionalidad.

### components

Contiene componentes propios de la feature.

Su responsabilidad es únicamente la presentación de la información.

### hooks

Contiene hooks que coordinan la interacción entre la interfaz y los servicios de la feature.

### services

Contiene la lógica propia de la funcionalidad.

No debe contener lógica de presentación.

### types

Contiene interfaces, tipos y enumeraciones utilizados por la feature.

### utils

Contiene funciones auxiliares específicas de la feature.

### constants

Contiene constantes utilizadas únicamente por esa funcionalidad.

### index.ts

Expone la API pública de la feature.

El resto de la aplicación debe acceder a la funcionalidad a través de este punto de entrada siempre que sea posible.

---

## shared

Contiene elementos reutilizables por varias features.

Ejemplos:

- componentes comunes;
- hooks reutilizables;
- utilidades compartidas;
- tipos compartidos.

No debe contener lógica específica del dominio.

---

## Principios

La estructura del proyecto debe cumplir las siguientes reglas:

- Cada directorio tiene una única responsabilidad.
- Las funcionalidades se organizan por dominio y no por páginas.
- La lógica del negocio permanece dentro de las features.
- La infraestructura permanece en `core`.
- Los elementos reutilizables pertenecen a `shared`.
- La interfaz no debe contener reglas del dominio.

---

## Evolución

La estructura podrá ampliarse conforme el proyecto crezca.

Cualquier cambio deberá respetar los principios definidos en `ARCHITECTURE.md` y mantener una separación clara de responsabilidades.
