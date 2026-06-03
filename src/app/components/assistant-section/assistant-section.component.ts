import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-assistant-section',
  standalone: true,
  imports: [RouterLink, ChatbotComponent],
  templateUrl: './assistant-section.component.html',
})
export class AssistantSectionComponent {}
