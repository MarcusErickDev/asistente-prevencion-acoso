import { Component } from '@angular/core';

import { LUMA_IDENTITY } from '../../shared/project-links';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  readonly luma = LUMA_IDENTITY;
}
