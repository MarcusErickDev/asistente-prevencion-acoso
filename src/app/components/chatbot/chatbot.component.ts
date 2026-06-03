import { Component, ElementRef, ViewChild, inject, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { CHATBOT_CONFIG } from '../../data/chatbot-config';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type ChatSize = 'small' | 'medium' | 'large';

interface ChatSizeOption {
  id: ChatSize;
  label: string;
  height: number;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, MarkdownModule],
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent implements AfterViewChecked {
  private http = inject(HttpClient);

  messages: Message[] = [];
  inputText = '';
  isLoading = false;
  isFullscreenOpen = false;
  selectedSize: ChatSize = 'medium';
  readonly sizeOptions: ChatSizeOption[] = [
    { id: 'small', label: 'Chico', height: 300 },
    { id: 'medium', label: 'Mediano', height: 500 },
    { id: 'large', label: 'Grande', height: 700 },
  ];
  private shouldScroll = false;
  private readonly MAX_MESSAGES = 10;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLElement>;

  get selectedSizeLabel(): string {
    return this.currentSize.label;
  }

  get chatHeight(): number {
    return this.currentSize.height;
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  cycleChatSize(): void {
    const currentIndex = this.sizeOptions.findIndex((option) => option.id === this.selectedSize);
    const nextIndex = (currentIndex + 1) % this.sizeOptions.length;
    this.selectedSize = this.sizeOptions[nextIndex].id;
  }

  openFullscreen(): void {
    this.isFullscreenOpen = true;
    this.shouldScroll = true;
  }

  closeFullscreen(): void {
    this.isFullscreenOpen = false;
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

  private get currentSize(): ChatSizeOption {
    return this.sizeOptions.find((option) => option.id === this.selectedSize) ?? this.sizeOptions[1];
  }
}
