# Fase 2 — Funcionalidad MVP

## Objetivo

Construir todas las funcionalidades necesarias para que una mujer pueda utilizar PreParto durante las últimas semanas del embarazo y obtener una orientación segura basada en síntomas.

---

## Épica 2.1 — Registro de síntomas

### Historias

* Registro de pérdida de tapón mucoso
* Registro de rotura de bolsa
* Registro de sangrado
* Registro de movimiento fetal
* Registro de dolor lumbar
* Registro de presión pélvica
* Registro de náuseas
* Registro de diarrea
* Registro de escalofríos
* Registro de contracciones (integrado con el timer)

---

## Épica 2.2 — Historial

Permitir consultar todo lo ocurrido.

Incluye:

* Línea temporal
* Filtros por día
* Filtros por tipo
* Eliminación de registros
* Edición de registros
* Vista detalle

---

## Épica 2.3 — Motor de evaluación

Aquí empieza la inteligencia de la aplicación.

Implementar todas las reglas definidas en la documentación médica.

Ejemplos:

* Contracciones cada X minutos
* Duración media
* Rotura de bolsa
* Sangrado abundante
* Combinación de síntomas
* Tiempo desde primer síntoma

Este módulo es probablemente el más importante de toda la aplicación.

---

## Épica 2.4 — Sistema de recomendaciones

Mostrar mensajes claros como:

* Continúa observando
* Descansa
* Hidrátate
* Sigue registrando
* Contacta con tu matrona
* Ve al hospital

Siempre indicando que:

> La aplicación no sustituye una valoración médica.

---

## Épica 2.5 — Configuración del embarazo

Datos mínimos:

* Fecha probable de parto
* Semana gestacional
* Embarazo único o múltiple
* Primer embarazo
* País (para adaptar algunos textos en el futuro)

---

## Épica 2.6 — Persistencia

Guardar todo localmente.

Incluye:

* Síntomas
* Historial
* Configuración
* Estado del temporizador
* Preferencias

---

## Épica 2.7 — Validaciones

Evitar errores comunes.

Ejemplos:

* dos roturas de bolsa
* tiempos imposibles
* fechas futuras
* síntomas incompatibles

---

## Épica 2.8 — Accesibilidad

* Contraste
* Tamaños táctiles
* Navegación por teclado
* Lectores de pantalla
* Estados visibles

---

## Épica 2.9 — Testing

Comenzar pruebas reales.

* Unitarias
* Integración
* Casos clínicos simulados
* Casos límite

---

## Criterios para cerrar la Fase 2

Al finalizar esta fase una embarazada debe poder:

* Registrar cualquier síntoma importante del preparto.
* Consultar el historial.
* Obtener una recomendación basada en reglas.
* Registrar contracciones con el temporizador.
* Conservar toda la información aunque cierre la aplicación.
* Usar la aplicación completamente sin conexión.
* Comprender que la aplicación es una herramienta de apoyo y no sustituye la atención médica.

---

## Mi recomendación antes de empezar

Aunque el orden anterior es lógico desde el punto de vista funcional, **desarrollaría las issues en este orden** para reducir retrabajo:

1. Configuración del embarazo.
2. Persistencia local.
3. Registro de síntomas.
4. Historial.
5. Motor de evaluación.
6. Sistema de recomendaciones.
7. Validaciones.
8. Accesibilidad.
9. Testing.

Este orden permite que cada nueva funcionalidad se apoye sobre una base ya estable y evita tener que rehacer componentes cuando el modelo de datos esté completo.
