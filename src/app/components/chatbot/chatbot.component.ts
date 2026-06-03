import { Component, ElementRef, ViewChild, inject, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CHATBOT_CONFIG } from '../../data/chatbot-config';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent implements AfterViewChecked {
  private http = inject(HttpClient);

  messages: Message[] = [];
  inputText = '';
  isLoading = false;
  private shouldScroll = false;
  private readonly MAX_MESSAGES = 10;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLElement>;

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  sendMessage(): void {
    const text = this.inputText.trim();
    if (!text || this.isLoading) return;

    this.messages.push({ role: 'user', content: text });
    this.inputText = '';

    if (this.messages.length > this.MAX_MESSAGES) {
      this.messages = this.messages.slice(-this.MAX_MESSAGES);
    }

    this.isLoading = true;
    this.shouldScroll = true;

    const payload = {
      messages: this.messages,
      systemPrompt: CHATBOT_CONFIG.systemPrompt,
    };

    this.http.post<{ content: { text: string }[] }>('/api/chat', payload).subscribe({
      next: (response) => {
        const text = response.content?.[0]?.text ?? 'No se pudo obtener respuesta.';
        this.messages.push({ role: 'assistant', content: text });
        this.isLoading = false;
        this.shouldScroll = true;
      },
      error: () => {
        this.messages.push({
          role: 'assistant',
          content: 'Ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        });
        this.isLoading = false;
        this.shouldScroll = true;
      },
    });
  }

  clearConversation(): void {
    this.messages = [];
    this.isLoading = false;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}
