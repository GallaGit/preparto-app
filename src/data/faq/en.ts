import type { FaqItem } from '@/data/faq/types';

export const faqEn: FaqItem[] = [
  {
    id: 'what-is',
    category: 'about',
    question: 'What is PreParto?',
    answer:
      'PreParto is a support app for the last weeks of pregnancy and the pre-labour period. It helps you log contractions and symptoms and shows guidance based on clear rules. It is not a medical device and it does not diagnose.',
    keywords: ['app', 'product', 'prelabour', 'pregnancy'],
  },
  {
    id: 'not-medical',
    category: 'about',
    question: 'Does it replace my midwife or hospital?',
    answer:
      'No. PreParto does not replace professional care. If you are unsure, feel unwell, or your team gave you a specific protocol, contact them or emergency services.',
    keywords: ['doctor', 'midwife', 'hospital', 'diagnosis', 'disclaimer'],
  },
  {
    id: 'assessment',
    category: 'about',
    question: 'What does the recommendation message mean?',
    answer:
      'It is automatic guidance based on what you have logged (for example recent contractions or symptoms). It explains an indicative level and always includes a reminder that it does not replace medical assessment. If you are worried, contact your care team first.',
    keywords: ['banner', 'recommendation', 'assessment', 'level'],
  },
  {
    id: 'contractions',
    category: 'features',
    question: 'What is the contraction timer for?',
    answer:
      'It lets you mark the start and end of each contraction and save duration and intervals on this device. It helps you observe the pattern calmly. On its own it does not confirm labour has started and it does not replace your prenatal guidance.',
    keywords: ['timer', 'interval', 'duration'],
  },
  {
    id: 'symptoms',
    category: 'features',
    question: 'Why log symptoms?',
    answer:
      'Logging symptoms keeps a record of what you felt and when. That can contextualize in-app guidance and helps if you want to share a summary with your care team. Be as accurate as you can; incomplete data can make guidance less useful.',
    keywords: ['symptoms', 'log', 'history'],
  },
  {
    id: 'water-break',
    category: 'features',
    question: 'What should I do in the app if I think my waters have broken?',
    answer:
      'You can log waters broken from the matching option to note the time and details. If you also have contractions, fever, or feel unwell, open Emergency and contact your midwife or hospital according to your protocol.',
    keywords: ['waters', 'membranes', 'fluid', 'rupture'],
  },
  {
    id: 'when-to-call',
    category: 'urgency',
    question: 'When should I call or go to hospital?',
    answer:
      'If you have heavy bleeding, no baby movements, waters broken with feeling unwell, very frequent contractions or intense pain, high fever, dizziness, or anything that worries you: contact or go to urgent care. In the app, open Emergency for a short general orientation.',
    keywords: ['urgent', 'emergency', 'hospital', 'bleeding'],
  },
  {
    id: 'data-local',
    category: 'privacy',
    question: 'Where is my data stored?',
    answer:
      'On this device (local storage). PreParto does not send your records to a server or create a cloud account. Clearing browser data or uninstalling the app may erase what was saved.',
    keywords: ['privacy', 'local', 'IndexedDB', 'server'],
  },
  {
    id: 'export',
    category: 'privacy',
    question: 'Can I share or export my history?',
    answer:
      'Yes. From History you can share a summary (for example WhatsApp or email) or download a PDF. It is a personal aid, not an official medical report.',
    keywords: ['export', 'PDF', 'share', 'WhatsApp'],
  },
  {
    id: 'offline',
    category: 'offline',
    question: 'Does it work without Internet?',
    answer:
      'Yes. Core use is designed to work offline with data already saved on the device. If there is no network you will see a notice, but you can keep logging and reviewing essentials.',
    keywords: ['offline', 'PWA', 'network'],
  },
  {
    id: 'hospital-bag',
    category: 'features',
    question: 'What is “Hospital bag”?',
    answer:
      'It is an editable checklist for items and tasks for labour day. You can mark priorities and what is already done. It is personal organisation, not a required clinical list.',
    keywords: ['bag', 'hospital', 'checklist', 'packing'],
  },
  {
    id: 'notifications',
    category: 'offline',
    question: 'How do notifications work?',
    answer:
      'They are local notifications on this device (not Web Push or servers). You configure them in Settings; in practice reminders work while the app is open. You can turn them off anytime.',
    keywords: ['alerts', 'reminders', 'settings', 'permission'],
  },
];
