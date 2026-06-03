import { Component } from '@angular/core';

import { WORKSHOPS } from '../../shared/project-links';

@Component({
  selector: 'app-workshops-section',
  standalone: true,
  templateUrl: './workshops-section.component.html'
})
export class WorkshopsSectionComponent {
  readonly workshops = WORKSHOPS;
}
