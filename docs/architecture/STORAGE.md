# Almacenamiento

## Objetivo

Definir cómo se almacena la información durante la primera versión de PreParto.

---

## Estrategia

La primera versión almacenará la información únicamente en el dispositivo del usuario.

No existirá sincronización con servidores ni almacenamiento remoto.

Tecnología actual: **IndexedDB** (base `preparto`).

---

## Principios

- Todo el almacenamiento será local.
- El dominio no accederá directamente al mecanismo de almacenamiento.
- El acceso al almacenamiento estará centralizado.

---

## Acceso al almacenamiento

La aplicación utiliza servicios de almacenamiento centralizados:

| Servicio | Store | Responsabilidad |
|----------|-------|-----------------|
| `prepartoDb.ts` | — | Apertura y upgrade de la base (`DB_VERSION = 2`) |
| `contractionsStorage.ts` | `contractions` | Persistencia de contracciones del timer |
| `symptomsStorage.ts` | `symptoms` | Persistencia de registros de síntomas |

El resto del sistema no deberá abrir IndexedDB directamente.

---

## Esquema IndexedDB

- **Nombre:** `preparto`
- **Versión:** `2`

### Store `contractions`

- `keyPath`: `id`
- Índice: `startedAt`
- Campos: `id`, `startedAt`, `endedAt`, `durationSeconds`, `intervalSeconds?`, `notes`

### Store `symptoms`

- `keyPath`: `id`
- Índices: `type`, `recordedAt`
- Registros tipados por unión discriminada (`SymptomRecord`)

---

## Responsabilidades

El almacenamiento es responsable de:

- guardar información;
- recuperar información;
- eliminar información cuando sea necesario.

No es responsable de aplicar reglas del dominio.

---

## Evolución

La arquitectura permitirá incorporar un backend en el futuro sin modificar la lógica del dominio.

Cuando exista sincronización remota, el mecanismo de almacenamiento podrá cambiar sin afectar al resto de la aplicación.

La Épica 2.2 (historial) podrá unificar la vista de contracciones y síntomas sin cambiar estos stores.
