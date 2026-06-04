import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChatbotComponent } from '../chatbot/chatbot.component';
import { LUMA_IDENTITY, PROJECT_LINKS } from '../../shared/project-links';

@Component({
  selector: 'app-assistant-section',
  standalone: true,
  imports: [RouterLink, ChatbotComponent],
  templateUrl: './assistant-section.component.html',
})
export class AssistantSectionComponent {
  readonly assistantUrl = PROJECT_LINKS.ASSISTANT_URL;
  readonly luma = LUMA_IDENTITY;
}
