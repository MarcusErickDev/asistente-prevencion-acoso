import { Component } from '@angular/core';

import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-assistant-section',
  standalone: true,
  imports: [ChatbotComponent],
  templateUrl: './assistant-section.component.html',
})
export class AssistantSectionComponent {}
