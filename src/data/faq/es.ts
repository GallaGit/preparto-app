import type { FaqItem } from '@/data/faq/types';

export const faqEs: FaqItem[] = [
  {
    id: 'what-is',
    category: 'about',
    question: '¿Qué es PreParto?',
    answer:
      'PreParto es una aplicación de apoyo para las últimas semanas del embarazo y el preparto. Te ayuda a registrar contracciones y síntomas, y a ver orientaciones basadas en reglas claras. No es un dispositivo médico ni un diagnóstico.',
    keywords: ['app', 'producto', 'preparto', 'embarazo'],
  },
  {
    id: 'not-medical',
    category: 'about',
    question: '¿Sustituye a mi matrona o al hospital?',
    answer:
      'No. PreParto no sustituye la valoración de profesionales sanitarios. Si tienes dudas, te encuentras mal o tu equipo te indicó un protocolo concreto, contacta con ellos o con los servicios de urgencia.',
    keywords: ['médico', 'matrona', 'hospital', 'diagnóstico', 'disclaimer'],
  },
  {
    id: 'assessment',
    category: 'about',
    question: '¿Qué significa el mensaje de recomendación?',
    answer:
      'Es una orientación automática según lo que hayas registrado (por ejemplo contracciones o síntomas recientes). Explica un nivel orientativo y siempre incluye un aviso: no sustituye una valoración médica. Si la situación te preocupa, prioriza contactar con tu equipo sanitario.',
    keywords: ['banner', 'recomendación', 'assessment', 'nivel'],
  },
  {
    id: 'contractions',
    category: 'features',
    question: '¿Para qué sirve el cronómetro de contracciones?',
    answer:
      'Sirve para marcar el inicio y el final de cada contracción y guardar duración e intervalos en este dispositivo. Te ayuda a observar el patrón con calma. No confirma por sí solo el inicio del parto ni sustituye las indicaciones de tu seguimiento prenatal.',
    keywords: ['timer', 'cronómetro', 'intervalo', 'duración'],
  },
  {
    id: 'symptoms',
    category: 'features',
    question: '¿Por qué registrar síntomas?',
    answer:
      'Registrar síntomas deja constancia de lo que sentiste y cuándo. Esa información puede contextualizar las orientaciones de la app y te sirve si quieres compartir un resumen con tu equipo. Sé lo más precisa que puedas; datos incompletos pueden hacer que la orientación sea menos útil.',
    keywords: ['síntomas', 'registro', 'historial'],
  },
  {
    id: 'water-break',
    category: 'features',
    question: '¿Qué hago en la app si creo que he roto la bolsa?',
    answer:
      'Puedes registrar la rotura de bolsa desde la opción correspondiente para anotar el momento y detalles. Si además hay contracciones, fiebre o te encuentras mal, mira la pantalla de Emergencia y contacta con tu matrona u hospital según tu protocolo.',
    keywords: ['bolsa', 'líquido', 'rotura', 'agua'],
  },
  {
    id: 'when-to-call',
    category: 'urgency',
    question: '¿Cuándo debo contactar o ir al hospital?',
    answer:
      'Ante sangrado abundante, ausencia de movimientos del bebé, rotura de bolsa con malestar, contracciones muy frecuentes o dolor intenso, fiebre alta, mareo o cualquier situación que te preocupe: contacta o acude a urgencias. En la app, abre Emergencia para ver la orientación general resumida.',
    keywords: ['urgencia', 'emergencia', 'hospital', 'alarma', 'sangrado'],
  },
  {
    id: 'data-local',
    category: 'privacy',
    question: '¿Dónde se guardan mis datos?',
    answer:
      'En este dispositivo (almacenamiento local). PreParto no envía tus registros a un servidor ni crea una cuenta en la nube. Si borras los datos del navegador o desinstalas la app, puedes perder la información guardada.',
    keywords: ['privacidad', 'local', 'IndexedDB', 'servidor'],
  },
  {
    id: 'export',
    category: 'privacy',
    question: '¿Puedo compartir o exportar el historial?',
    answer:
      'Sí, desde Historial puedes compartir un resumen (por ejemplo WhatsApp o correo) o descargar un PDF. Es un apoyo para ti o tu acompañante; no es un informe médico oficial.',
    keywords: ['exportar', 'PDF', 'compartir', 'WhatsApp'],
  },
  {
    id: 'offline',
    category: 'offline',
    question: '¿Funciona sin Internet?',
    answer:
      'Sí. El uso principal está pensado para funcionar sin conexión con los datos ya guardados en el dispositivo. Si no hay red, verás un aviso, pero puedes seguir registrando y consultando lo esencial.',
    keywords: ['offline', 'sin conexión', 'PWA', 'red'],
  },
  {
    id: 'hospital-bag',
    category: 'features',
    question: '¿Qué es «Qué llevar al hospital»?',
    answer:
      'Es una lista editable para preparar objetos y tareas del día del parto. Puedes marcar prioridades y lo ya hecho. Es organización personal; no es una lista clínica obligatoria.',
    keywords: ['maleta', 'hospital', 'checklist', 'lista'],
  },
  {
    id: 'notifications',
    category: 'offline',
    question: '¿Cómo funcionan las notificaciones?',
    answer:
      'Son notificaciones locales en este dispositivo (no Web Push ni servidores). Se configuran en Ajustes y, en la práctica, los recordatorios funcionan mientras la aplicación está abierta. Puedes desactivarlas cuando quieras.',
    keywords: ['avisos', 'recordatorios', 'ajustes', 'permiso'],
  },
];
