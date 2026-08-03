# ADR-002: Estrategia Offline First

## Estado

Aceptada

---

## Fecha

2026-08-03

---

## Contexto

PreParto está pensado para utilizarse en situaciones donde la conectividad puede ser limitada o inexistente.

Las funcionalidades principales no deben depender de una conexión a Internet.

---

## Problema

Definir si la aplicación debe depender de servicios remotos para su funcionamiento principal.

---

## Decisión

Se adopta una estrategia **Offline First**.

Las funcionalidades principales deberán funcionar completamente sin conexión.

---

## Justificación

La aplicación debe poder:

- Registrar información.
- Realizar evaluaciones.
- Mostrar recomendaciones.

Todo ello sin depender de un servidor.

Esto mejora la disponibilidad de la aplicación y reduce dependencias técnicas innecesarias para la primera versión.

---

## Consecuencias

### Positivas

- Mayor disponibilidad.
- Mejor experiencia de usuario.
- Independencia de la conectividad.
- Arquitectura más sencilla para la primera versión.

### Negativas

- La sincronización entre dispositivos no estará disponible inicialmente.

---

## Alternativas consideradas

### Backend obligatorio

Se descarta para la primera versión por aumentar la complejidad sin aportar valor al objetivo inicial del proyecto.

---

## Revisión

Si en el futuro se incorpora un backend, la estrategia Offline First deberá mantenerse para las funcionalidades principales.
