import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import { LUMA_IDENTITY } from '../../shared/project-links';

@Component({
  selector: 'app-chatbot-page',
  standalone: true,
  imports: [RouterLink, ChatbotComponent],
  templateUrl: './chatbot-page.component.html',
})
export class ChatbotPageComponent {
  readonly luma = LUMA_IDENTITY;
}
