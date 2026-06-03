import { Component } from '@angular/core';

const IMPACT_STATS = [
  {
    number: '7 de cada 10',
    text: 'niños y adolescentes en México han sufrido acoso o ciberacoso',
  },
  {
    number: '#1 Mundial',
    text: 'México ocupa el primer lugar mundial en bullying en educación básica',
  },
  {
    number: '+205%',
    text: 'aumentaron los reportes de violencia escolar entre 2019 y 2024',
  },
  {
    number: '200,000',
    text: 'muertes al año a nivel mundial relacionadas con acoso y ciberacoso',
  },
] as const;

@Component({
  selector: 'app-impact-section',
  standalone: true,
  templateUrl: './impact-section.component.html',
})
export class ImpactSectionComponent {
  readonly stats = IMPACT_STATS;
}
