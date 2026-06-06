export const ASSISTANT_URL = '/asistente';
export const FEEDBACK_FORM_URL = 'https://tally.so/r/aQz4vv';
export const PROBLEM_VIDEO_URL = 'https://www.youtube.com/embed/wSe2UrEDHNw?si=IPLOG19CEMztUIyC';
export const VIDEO_1_URL = 'https://www.youtube.com/embed/mmbdxNExpdo?si=J4Tz7TfYaY5wo36q';
export const VIDEO_2_URL = 'https://www.youtube.com/embed/jIfkEoK3Yyo?si=I8ZoI85W9PSulIT0';
export const VIDEO_3_URL = 'https://www.youtube.com/embed/MSZa5TXYmTQ?si=gzJB6dZ-M-A6h__K';
export const LUMA_AVATAR_PATH = 'assets/luma-avatar.png';

export const PROJECT_LINKS = {
  ASSISTANT_URL,
  FEEDBACK_FORM_URL,
  PROBLEM_VIDEO_URL,
  VIDEO_1_URL,
  VIDEO_2_URL,
  VIDEO_3_URL,
  LUMA_AVATAR_PATH,
} as const;

export const WORKSHOPS = [
  {
    title: '¿Qué es el acoso infantil y cómo identificarlo?',
    description:
      'Conceptos básicos para reconocer señales de acoso infantil, comprender sus efectos y saber cuándo es necesario pedir apoyo.',
    videoUrl: PROJECT_LINKS.VIDEO_1_URL,
  },
  {
    title: 'Ciberacoso: riesgos digitales y prevención',
    description:
      'Explicación de los principales riesgos en entornos digitales y recomendaciones para prevenir situaciones de ciberacoso.',
    videoUrl: PROJECT_LINKS.VIDEO_2_URL,
  },
  {
    title: '¿Qué hacer si detectas una situación de acoso?',
    description:
      'Orientación práctica sobre cómo actuar, documentar, buscar apoyo y canalizar una situación de riesgo de forma segura.',
    videoUrl: PROJECT_LINKS.VIDEO_3_URL,
  }
] as const;

export const LUMA_IDENTITY = {
  name: 'LUMA',
  role: 'Asistente Digital de Prevención y Orientación',
  concept: 'Luz, guía y acompañamiento seguro',
  phrase: 'Te orienta para dar el primer paso seguro.',
  avatarPath: PROJECT_LINKS.LUMA_AVATAR_PATH,
} as const;
