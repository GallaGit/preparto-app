# Flujo de datos

## Objetivo

Este documento describe cómo circula la información dentro de PreParto.

El objetivo es mantener un flujo de datos sencillo, predecible y fácil de mantener, evitando dependencias innecesarias entre las distintas capas de la aplicación.

---

## Principio general

Los datos siempre fluyen en una única dirección.

```text
Usuario
    ↓
Interfaz
    ↓
Hooks
    ↓
Servicios
    ↓
Assessment Engine
    ↓
Servicios
    ↓
Interfaz
    ↓
Usuario
```

Cada capa tiene una responsabilidad específica y solo conoce la inmediatamente inferior.

---

## Flujo de una evaluación

Cuando la usuaria interactúa con la aplicación, el flujo será el siguiente:

1. La interfaz recoge la información introducida.
2. Un hook coordina la acción correspondiente.
3. El servicio prepara la información necesaria.
4. El Assessment Engine realiza la evaluación.
5. El servicio recibe el resultado.
6. La interfaz presenta la información al usuario.

---

## Responsabilidad de cada capa

### Interfaz (UI)

Responsable de:

- Mostrar información.
- Recoger acciones del usuario.

No contiene reglas del dominio.

### Hooks

Responsables de:

- Coordinar la interacción entre la interfaz y los servicios.
- Gestionar el estado necesario para la pantalla.

No contienen reglas clínicas.

### Servicios

Responsables de:

- Preparar la información para el dominio.
- Invocar el Assessment Engine.
- Adaptar el resultado para su consumo por la interfaz.

No deben contener lógica de presentación.

### Assessment Engine

Responsable de:

- Evaluar la información.
- Aplicar las reglas.
- Generar una explicación.
- Generar una recomendación.

No conoce la interfaz ni el almacenamiento.

---

## Persistencia

Cuando una acción requiera almacenar información, el flujo será:

```text
Interfaz
    ↓
Hook
    ↓
Servicio
    ↓
Storage
```

La interfaz nunca accederá directamente al mecanismo de almacenamiento.

---

## Actualización de la interfaz

Una vez finalizada una evaluación:

```text
Assessment Engine
    ↓
Servicio
    ↓
Hook
    ↓
Estado
    ↓
Interfaz
```

La interfaz únicamente representa el estado recibido.

---

## Dependencias permitidas

El flujo de dependencias siempre será descendente.

```text
UI
    ↓
Hooks
    ↓
Servicios
    ↓
Assessment Engine
    ↓
Core
```

No se permiten dependencias en sentido contrario.

---

## Comunicación entre módulos

Los módulos deben comunicarse únicamente mediante sus interfaces públicas.

Ningún módulo debe acceder directamente a la implementación interna de otro.

---

## Beneficios

Este flujo de datos permite:

- Separar claramente responsabilidades.
- Facilitar las pruebas del dominio.
- Reducir el acoplamiento.
- Mantener una arquitectura predecible.
- Reutilizar la lógica de negocio en futuras plataformas.

---

## Principio final

Toda información debe recorrer siempre el mismo camino.

No deben existir atajos que permitan a la interfaz acceder directamente al dominio, al almacenamiento o a cualquier otra capa interna del sistema.
