import { Component } from '@angular/core';

import { WORKSHOPS } from '../../shared/project-links';
import { YoutubeEmbedComponent } from '../youtube-embed/youtube-embed.component';

@Component({
  selector: 'app-workshops-section',
  standalone: true,
  imports: [YoutubeEmbedComponent],
  templateUrl: './workshops-section.component.html'
})
export class WorkshopsSectionComponent {
  readonly workshops = WORKSHOPS;
}
