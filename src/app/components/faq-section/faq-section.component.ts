import { Component } from '@angular/core';

type FaqProfile = 'child' | 'parent' | 'teacher';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqGroup {
  id: FaqProfile;
  label: string;
  items: FaqItem[];
}

const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'child',
    label: 'Niño o adolescente',
    items: [
      {
        question: '¿Qué hago si alguien me molesta en la escuela?',
        answer:
          'No estás solo. Lo más importante es contárselo a un adulto de confianza: tu mamá, papá, tutor o un maestro. No tienes que enfrentar esto solo. Evita responder con golpes porque puede empeorar la situación. Guarda cualquier evidencia si el acoso es digital.',
      },
      {
        question: '¿Qué es el ciberacoso?',
        answer:
          'Es cuando alguien te molesta, insulta, amenaza o avergüenza a través de internet, redes sociales o mensajes. Puede ser muy dañino aunque no sea en persona. Si te pasa, no respondas, guarda capturas y cuéntaselo a un adulto de confianza.',
      },
      {
        question: '¿A quién le puedo contar si me están acosando?',
        answer:
          'Puedes contárselo a tu mamá, papá, tutor, un maestro de confianza o el orientador de tu escuela. Si sientes que nadie te escucha, busca a otro adulto de confianza. No tienes que cargarlo solo.',
      },
      {
        question: '¿Está bien defenderme con golpes?',
        answer:
          'Entendemos que a veces parece la única salida, pero responder con golpes casi siempre empeora la situación. Lo más efectivo es alejarte, buscar ayuda de un adulto y reportar lo que ocurre. Eso es valentía real, no debilidad.',
      },
    ],
  },
  {
    id: 'parent',
    label: 'Padre o tutor',
    items: [
      {
        question: '¿Cómo sé si mi hijo está siendo acosado?',
        answer:
          'Algunas señales de alerta son: cambios bruscos de ánimo, no querer ir a la escuela, aislamiento, bajo rendimiento, pérdida de objetos o dinero, ansiedad al usar el celular o comentarios de tristeza y miedo. Si notas varios de estos signos, abre un espacio de conversación tranquilo y sin juicios.',
      },
      {
        question: '¿Qué hago si mi hijo es el acosador?',
        answer:
          'No entres en pánico ni lo minimices. Escucha su versión con calma, establece límites claros sobre el comportamiento y busca apoyo profesional si es necesario. Es una oportunidad para trabajar empatía y responsabilidad, no solo para castigar.',
      },
      {
        question: '¿Cómo hablo con mi hijo sobre este tema?',
        answer:
          'En un momento tranquilo, sin distracciones. Empieza con preguntas abiertas como "¿cómo te has sentido en la escuela?" Escucha sin juzgar, valida sus emociones y hazle saber que puede contar contigo sin miedo a meterse en problemas.',
      },
      {
        question: '¿A qué autoridad debo acudir?',
        answer:
          'Primero acércate a la dirección o departamento de orientación de la escuela y documenta los hechos con fechas y evidencias. Si la escuela no actúa, puedes acudir a la Comisión Nacional de los Derechos Humanos (CNDH) o a la Fiscalía local si existe una situación de riesgo.',
      },
    ],
  },
  {
    id: 'teacher',
    label: 'Docente',
    items: [
      {
        question: '¿Cómo identifico acoso en el salón?',
        answer:
          'Observa patrones repetidos: burlas constantes hacia una misma persona, exclusión grupal, cambios en la participación o ánimo de un estudiante, comentarios hirientes normalizados o reacciones de miedo ante ciertos compañeros.',
      },
      {
        question: '¿Cuál es mi responsabilidad legal?',
        answer:
          'Como docente tienes obligación de reportar situaciones de violencia o acoso a las autoridades escolares. La Ley General de Educación y los protocolos de la SEP establecen que la escuela debe actuar ante estos casos. Documentar y canalizar correctamente es parte de tu responsabilidad.',
      },
      {
        question: '¿Cómo actúo si un alumno me reporta acoso?',
        answer:
          'Escúchalo en privado, sin minimizar lo que dice. No lo expongas públicamente. Documenta lo que te compartió, informa a la dirección y contacta a los padres o tutores cuando corresponda. Da seguimiento al caso y asegúrate de que el alumno se sienta protegido.',
      },
    ],
  },
];

@Component({
  selector: 'app-faq-section',
  standalone: true,
  templateUrl: './faq-section.component.html',
})
export class FaqSectionComponent {
  readonly groups = FAQ_GROUPS;
  activeProfile: FaqProfile = 'child';

  get activeGroup(): FaqGroup {
    return this.groups.find((group) => group.id === this.activeProfile) ?? this.groups[0];
  }

  selectProfile(profile: FaqProfile): void {
    this.activeProfile = profile;
  }
}
