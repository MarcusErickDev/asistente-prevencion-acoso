import { Component } from '@angular/core';

import { PROJECT_LINKS } from '../../shared/project-links';

@Component({
  selector: 'app-feedback-section',
  standalone: true,
  templateUrl: './feedback-section.component.html'
})
export class FeedbackSectionComponent {
  readonly feedbackLink = PROJECT_LINKS.feedback;
}
