export type UserProfile = 'child' | 'parent' | 'teacher' | 'info';

export type FlowId =
  | 'welcome'
  | 'disclaimer'
  | 'risk-check'
  | 'risk-emergency'
  | 'risk-uncertain'
  | 'profile'
  | 'menu'
  | 'what-is-bullying'
  | 'alert-signs'
  | 'what-to-do'
  | 'cyberbullying'
  | 'prevention'
  | 'resources'
  | 'ai-intro'
  | 'feedback';

export type ButtonNext =
  | FlowId
  | 'RESTART'
  | 'AI_MODE'
  | 'AI_CONTINUE'
  | 'OPEN_FEEDBACK_URL';

export interface FlowButton {
  label: string;
  next: ButtonNext;
  profile?: UserProfile;
}

export interface FlowStep {
  getMessage(profile: UserProfile | null): string;
  getButtons(profile: UserProfile | null): FlowButton[];
}

// Helpers for steps that don't depend on profile
const s =
  (text: string) =>
  (_: UserProfile | null): string =>
    text;

const b =
  (buttons: FlowButton[]) =>
  (_: UserProfile | null): FlowButton[] =>
    buttons;

export const FLOWS: Record<FlowId, FlowStep> = {
  // ─── Flujo 0: Bienvenida ───────────────────────────────────────────────────
  welcome: {
    getMessage: s(
      `Hola, soy **LUMA** ✨\n\nSoy una guía digital educativa de prevención y orientación. Estoy aquí para ayudarte a reconocer señales de alerta, conocer pasos seguros y encontrar recursos de apoyo ante situaciones de acoso infantil o ciberacoso.\n\nNo sustituyo ayuda profesional, psicológica, legal o institucional.`
    ),
    getButtons: b([
      { label: 'Comenzar', next: 'risk-check' },
      { label: 'Ver aviso de uso', next: 'disclaimer' },
    ]),
  },

  // ─── Aviso de uso ─────────────────────────────────────────────────────────
  disclaimer: {
    getMessage: s(
      `LUMA tiene fines exclusivamente **educativos y preventivos**. La información proporcionada es general y no constituye asesoría profesional, psicológica, legal ni médica.\n\nEn caso de emergencia o peligro inmediato llama al **911**.`
    ),
    getButtons: b([{ label: 'Entendido, comenzar', next: 'risk-check' }]),
  },

  // ─── Flujo 1: Filtro de riesgo ────────────────────────────────────────────
  'risk-check': {
    getMessage: s(
      `Antes de continuar, ¿existe una situación de **peligro inmediato** o riesgo para una niña, niño o adolescente?`
    ),
    getButtons: b([
      { label: 'Sí, hay riesgo inmediato', next: 'risk-emergency' },
      { label: 'No, solo quiero orientación', next: 'profile' },
      { label: 'No estoy seguro/a', next: 'risk-uncertain' },
    ]),
  },

  'risk-emergency': {
    getMessage: s(
      `Si existe peligro inmediato, busca ayuda urgente:\n\n- 🔴 **Llama al 911** (emergencias)\n- 🏫 Acude a la institución educativa\n- 👨‍👩‍👧 Contacta a un familiar responsable\n- 🏛️ Acude a la autoridad correspondiente\n\nNo enfrentes la situación solo/a. **Prioriza siempre la seguridad.**`
    ),
    getButtons: b([
      { label: 'Ver recomendaciones básicas', next: 'what-to-do' },
      { label: 'Volver al inicio', next: 'RESTART' },
    ]),
  },

  'risk-uncertain': {
    getMessage: s(
      `Está bien. Te mostraré señales de alerta para ayudarte a identificar si puede existir una situación de riesgo.`
    ),
    getButtons: b([{ label: 'Ver señales de alerta', next: 'alert-signs' }]),
  },

  // ─── Flujo 2: Identificación de perfil ────────────────────────────────────
  profile: {
    getMessage: s(`¿Desde qué perspectiva estás consultando?`),
    getButtons: b([
      { label: 'Soy niño, niña o adolescente', next: 'menu', profile: 'child' },
      { label: 'Soy madre, padre o tutor', next: 'menu', profile: 'parent' },
      { label: 'Soy docente o personal educativo', next: 'menu', profile: 'teacher' },
      { label: 'Solo quiero informarme', next: 'menu', profile: 'info' },
    ]),
  },

  // ─── Flujo 3: Menú principal ──────────────────────────────────────────────
  menu: {
    getMessage: s(`¿Sobre qué tema necesitas orientación?`),
    getButtons: b([
      { label: '¿Qué es el acoso?', next: 'what-is-bullying' },
      { label: 'Señales de alerta', next: 'alert-signs' },
      { label: '¿Qué hacer si ocurre?', next: 'what-to-do' },
      { label: 'Ciberacoso y riesgos digitales', next: 'cyberbullying' },
      { label: 'Cómo prevenir', next: 'prevention' },
      { label: 'Recursos de apoyo', next: 'resources' },
      { label: '✍️ Escribir mi duda con mis palabras', next: 'AI_MODE' },
    ]),
  },

  // ─── Opción 1: ¿Qué es el acoso? ─────────────────────────────────────────
  'what-is-bullying': {
    getMessage: s(
      `El acoso ocurre cuando una persona o grupo lastima, humilla, amenaza o excluye de forma repetida a otra, aprovechándose de una diferencia de poder.\n\n**Tipos de acoso:**\n\n- Físico\n- Verbal\n- Social o relacional\n- Psicológico\n- Digital o ciberacoso`
    ),
    getButtons: b([
      { label: 'Ver señales de alerta', next: 'alert-signs' },
      { label: '¿Qué hacer si ocurre?', next: 'what-to-do' },
      { label: 'Volver al menú', next: 'menu' },
    ]),
  },

  // ─── Opción 2: Señales de alerta (mensaje adapta al perfil) ───────────────
  'alert-signs': {
    getMessage: (profile) => {
      let text =
        `**Señales de alerta frecuentes:**\n\n` +
        `- Cambios bruscos de ánimo\n` +
        `- Miedo o rechazo a ir a la escuela\n` +
        `- Aislamiento social\n` +
        `- Bajo rendimiento escolar\n` +
        `- Pérdida de objetos o dinero\n` +
        `- Ansiedad al usar el celular\n` +
        `- Comentarios de tristeza o miedo`;

      if (profile === 'parent') {
        text +=
          `\n\nComo **padre o tutor**: observa cambios de comportamiento, evita juzgar de inmediato y abre un espacio de conversación tranquilo.`;
      } else if (profile === 'teacher') {
        text +=
          `\n\nComo **docente**: observa patrones repetidos, exclusión grupal o cambios en la participación del estudiante.`;
      }

      return text;
    },
    getButtons: b([
      { label: '¿Qué hacer si ocurre?', next: 'what-to-do' },
      { label: 'Ciberacoso', next: 'cyberbullying' },
      { label: 'Volver al menú', next: 'menu' },
    ]),
  },

  // ─── Opción 3: ¿Qué hacer si ocurre? (mensaje adapta al perfil) ──────────
  'what-to-do': {
    getMessage: (profile) => {
      if (profile === 'parent') {
        return (
          `**Pasos recomendados:**\n\n` +
          `- ✓ Escucha sin juzgar\n` +
          `- ✓ Valida lo que siente tu hijo/a\n` +
          `- ✓ Documenta hechos, fechas y evidencias\n` +
          `- ✓ Habla con la escuela o institución\n` +
          `- ✓ Busca apoyo profesional si es necesario`
        );
      }

      if (profile === 'teacher') {
        return (
          `**Como docente:**\n\n` +
          `- ✓ Escucha en privado y documenta\n` +
          `- ✓ Protege la privacidad del menor\n` +
          `- ✓ Informa a responsables institucionales\n` +
          `- ✓ Contacta a padres o tutores\n` +
          `- ✓ Da seguimiento al caso`
        );
      }

      // child, info, or null → versión para niño/adolescente
      return (
        `Si estás viviendo acoso, recuerda: **no es tu culpa.**\n\n` +
        `- ✓ Busca a un adulto de confianza\n` +
        `- ✓ No respondas con violencia\n` +
        `- ✓ Guarda evidencia si es seguro\n` +
        `- ✓ Evita confrontar solo/a al agresor\n` +
        `- ✓ Pide acompañamiento`
      );
    },
    getButtons: b([
      { label: 'Ver recursos de apoyo', next: 'resources' },
      { label: 'Volver al menú', next: 'menu' },
    ]),
  },

  // ─── Opción 4: Ciberacoso ─────────────────────────────────────────────────
  cyberbullying: {
    getMessage: s(
      `El ciberacoso ocurre cuando alguien usa dispositivos digitales para acosar, intimidar o maltratar.\n\n**Ejemplos:**\n\n- Insultos por redes sociales\n- Difusión de rumores o fotos sin permiso\n- Amenazas por mensajes\n- Creación de perfiles falsos\n- Presión para enviar imágenes privadas\n\n**Recomendaciones:**\n\n- No respondas con agresiones\n- Guarda capturas como evidencia\n- Bloquea y reporta cuentas agresoras\n- No compartas datos personales\n- Habla con un adulto de confianza`
    ),
    getButtons: b([
      { label: '¿Qué hacer si ocurre?', next: 'what-to-do' },
      { label: 'Volver al menú', next: 'menu' },
    ]),
  },

  // ─── Opción 5: Cómo prevenir ──────────────────────────────────────────────
  prevention: {
    getMessage: s(
      `La prevención empieza en casa, la escuela y el entorno digital.\n\n**En casa:**\n\n- Hablar sobre emociones y límites\n- Supervisar internet con confianza\n- Fomentar comunicación abierta\n\n**En la escuela:**\n\n- Promover convivencia respetuosa\n- Crear canales seguros de reporte\n- Trabajar la empatía\n\n**En digital:**\n\n- No compartir contraseñas\n- Configurar privacidad en redes\n- Pensar antes de publicar`
    ),
    getButtons: b([
      { label: 'Ver recursos de apoyo', next: 'resources' },
      { label: 'Volver al menú', next: 'menu' },
    ]),
  },

  // ─── Opción 6: Recursos de apoyo ──────────────────────────────────────────
  resources: {
    getMessage: s(
      `Dependiendo de la situación puedes acudir a:\n\n- 🏫 Tu institución educativa\n- 👨‍👩‍👧 Un adulto o familiar de confianza\n- 🏛️ CNDH — Comisión Nacional de Derechos Humanos\n- ⚖️ Fiscalía local (situaciones de riesgo)\n- 🧠 Profesional de salud mental\n\nSi existe peligro inmediato: 🔴 **Llama al 911**`
    ),
    getButtons: b([
      { label: '¿Qué hacer si ocurre?', next: 'what-to-do' },
      { label: 'Volver al menú', next: 'menu' },
    ]),
  },

  // ─── Opción 7: Modo IA ────────────────────────────────────────────────────
  'ai-intro': {
    getMessage: s(
      `Puedes escribir tu duda con tus propias palabras.\n\n⚠️ Por favor no compartas nombres completos, direcciones, teléfonos ni datos personales.`
    ),
    getButtons: b([]),
  },

  // ─── Flujo 4: Retroalimentación ───────────────────────────────────────────
  feedback: {
    getMessage: s(
      `Gracias por usar **LUMA**.\n\nTu opinión nos ayuda a mejorar y medir el impacto de este proyecto.`
    ),
    getButtons: b([
      { label: 'Enviar retroalimentación', next: 'OPEN_FEEDBACK_URL' },
      { label: 'Volver al inicio', next: 'RESTART' },
    ]),
  },
};
