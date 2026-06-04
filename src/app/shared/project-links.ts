export const ASSISTANT_URL = '/asistente';
export const FEEDBACK_FORM_URL = '';
export const VIDEO_1_URL = '';
export const VIDEO_2_URL = '';
export const VIDEO_3_URL = '';
export const LUMA_AVATAR_PATH = 'assets/luma-avatar.png';

export const PROJECT_LINKS = {
  ASSISTANT_URL,
  FEEDBACK_FORM_URL,
  VIDEO_1_URL,
  VIDEO_2_URL,
  VIDEO_3_URL,
  LUMA_AVATAR_PATH,
} as const;

export const WORKSHOPS = [
  {
    title: '¿Qué es el acoso infantil y cómo identificarlo?',
    description:
      'Conceptos esenciales, señales de alerta y formas de reconocer situaciones de riesgo en entornos escolares, familiares y comunitarios.',
    videoUrl: PROJECT_LINKS.VIDEO_1_URL,
  },
  {
    title: 'Ciberacoso: riesgos digitales y prevención',
    description:
      'Orientación sobre riesgos en plataformas digitales, privacidad, convivencia en línea y medidas preventivas para niñas, niños y adolescentes.',
    videoUrl: PROJECT_LINKS.VIDEO_2_URL,
  },
  {
    title: '¿Qué hacer si detectas una situación de acoso?',
    description:
      'Pasos básicos para actuar con calma, documentar la situación, pedir ayuda y activar redes de apoyo responsables.',
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
