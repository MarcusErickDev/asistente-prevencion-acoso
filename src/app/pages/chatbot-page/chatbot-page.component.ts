import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChatbotComponent } from '../../components/chatbot/chatbot.component';

@Component({
  selector: 'app-chatbot-page',
  standalone: true,
  imports: [RouterLink, ChatbotComponent],
  templateUrl: './chatbot-page.component.html',
})
export class ChatbotPageComponent {}
