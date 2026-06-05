import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { CHATBOT_CONFIG } from '../../data/chatbot-config';
import { FLOWS, FlowButton, FlowId, UserProfile } from '../../data/chatbot-flows';

interface ChatEntry {
  role: 'bot' | 'user';
  text: string;
}

interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

type ChatSize = 'small' | 'medium' | 'large';

interface ChatSizeOption {
  id: ChatSize;
  label: string;
  height: number;
}

const BOT_TYPING_DELAY_MS = 900;

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, MarkdownModule],
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent implements OnInit, AfterViewChecked, OnDestroy {
  private http = inject(HttpClient);

  @Input() fullHeight = false;

  history: ChatEntry[] = [];
  currentButtons: FlowButton[] = [];
  mode: 'guided' | 'ai' = 'guided';
  inputText = '';
  isLoading = false;
  isBotTyping = false;
  isFullscreenOpen = false;
  selectedSize: ChatSize = 'medium';

  private userProfile: UserProfile | null = null;
  private aiMessages: ApiMessage[] = [];
  private shouldScroll = false;
  private typingTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private scrollFrameId: number | null = null;

  readonly sizeOptions: ChatSizeOption[] = [
    { id: 'small', label: 'Chico', height: 300 },
    { id: 'medium', label: 'Mediano', height: 500 },
    { id: 'large', label: 'Grande', height: 700 },
  ];

  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLElement>;

  get chatHeight(): number {
    return this.currentSize.height;
  }

  get selectedSizeLabel(): string {
    return this.currentSize.label;
  }

  ngOnInit(): void {
    this.loadFlow('welcome');
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.shouldScroll = false;
      this.scheduleScrollToBottom();
    }
  }

  ngOnDestroy(): void {
    this.clearTypingTimeout();
    this.clearScrollFrame();
  }

  onButtonClick(button: FlowButton): void {
    if (this.isBotTyping || this.isLoading) return;

    const next = button.next;

    // Open external URL without changing conversation state
    if (next === 'OPEN_FEEDBACK_URL') {
      if (CHATBOT_CONFIG.feedbackUrl) {
        window.open(CHATBOT_CONFIG.feedbackUrl, '_blank');
      }
      return;
    }

    // "Tengo otra duda" — stay in AI mode, just re-enable the input
    if (next === 'AI_CONTINUE') {
      this.currentButtons = [];
      return;
    }

    // Record the user's choice in chat history
    this.history.push({ role: 'user', text: button.label });
    this.currentButtons = [];
    this.shouldScroll = true;

    if (button.profile) {
      this.userProfile = button.profile;
    }

    if (next === 'RESTART') {
      this.resetConversationState();
      this.queueFlowResponse('welcome');
      return;
    }

    if (next === 'AI_MODE') {
      this.mode = 'ai';
      this.aiMessages = [];
      this.queueFlowResponse('ai-intro');
      return;
    }

    // Navigate to a guided flow (exit AI mode if active)
    if (this.mode === 'ai') {
      this.mode = 'guided';
      this.aiMessages = [];
    }
    this.queueFlowResponse(next as FlowId);
  }

  sendAiMessage(): void {
    const text = this.inputText.trim();
    if (!text || this.isLoading || this.isBotTyping) return;

    this.history.push({ role: 'user', text });
    this.aiMessages.push({ role: 'user', content: text });
    this.inputText = '';
    this.currentButtons = [];
    this.isLoading = true;
    this.shouldScroll = true;

    this.http
      .post<{ content: { text: string }[] }>('/api/chat', {
        messages: this.aiMessages,
        systemPrompt: CHATBOT_CONFIG.systemPrompt,
      })
      .subscribe({
        next: (response) => {
          const replyText = response.content?.[0]?.text ?? 'No se pudo obtener respuesta.';
          this.history.push({ role: 'bot', text: replyText });
          this.aiMessages.push({ role: 'assistant', content: replyText });
          this.isLoading = false;
          this.currentButtons = [
            { label: 'Tengo otra duda', next: 'AI_CONTINUE' },
            { label: 'Ver recursos de apoyo', next: 'resources' },
            { label: 'Volver al menú', next: 'menu' },
          ];
          this.shouldScroll = true;
        },
        error: () => {
          this.history.push({
            role: 'bot',
            text: 'Ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.',
          });
          this.isLoading = false;
          this.currentButtons = [
            { label: 'Tengo otra duda', next: 'AI_CONTINUE' },
            { label: 'Volver al menú', next: 'menu' },
          ];
          this.shouldScroll = true;
        },
      });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendAiMessage();
    }
  }

  finalize(): void {
    if (this.isBotTyping || this.isLoading) return;

    if (this.mode === 'ai') {
      this.mode = 'guided';
      this.aiMessages = [];
    }
    this.currentButtons = [];
    this.queueFlowResponse('feedback');
  }

  restartConversation(): void {
    if (this.isBotTyping || this.isLoading) return;

    this.restart();
  }

  cycleChatSize(): void {
    const currentIndex = this.sizeOptions.findIndex((o) => o.id === this.selectedSize);
    this.selectedSize = this.sizeOptions[(currentIndex + 1) % this.sizeOptions.length].id;
  }

  openFullscreen(): void {
    this.isFullscreenOpen = true;
    this.shouldScroll = true;
  }

  closeFullscreen(): void {
    this.isFullscreenOpen = false;
  }

  private loadFlow(flowId: FlowId): void {
    const step = FLOWS[flowId];
    this.history.push({ role: 'bot', text: step.getMessage(this.userProfile) });
    this.currentButtons = step.getButtons(this.userProfile);
    this.shouldScroll = true;
  }

  private queueFlowResponse(flowId: FlowId): void {
    this.clearTypingTimeout();
    this.isBotTyping = true;
    this.shouldScroll = true;

    this.typingTimeoutId = setTimeout(() => {
      this.loadFlow(flowId);
      this.isBotTyping = false;
      this.typingTimeoutId = null;
      this.shouldScroll = true;
    }, BOT_TYPING_DELAY_MS);
  }

  private restart(): void {
    this.history = [];
    this.resetConversationState();
    this.loadFlow('welcome');
  }

  private resetConversationState(): void {
    this.clearTypingTimeout();
    this.currentButtons = [];
    this.mode = 'guided';
    this.userProfile = null;
    this.aiMessages = [];
    this.inputText = '';
    this.isLoading = false;
    this.isBotTyping = false;
  }

  private clearTypingTimeout(): void {
    if (this.typingTimeoutId) {
      clearTimeout(this.typingTimeoutId);
      this.typingTimeoutId = null;
    }
  }

  private scheduleScrollToBottom(): void {
    this.clearScrollFrame();

    this.scrollFrameId = requestAnimationFrame(() => {
      this.scrollToBottom();
      this.scrollFrameId = requestAnimationFrame(() => {
        this.scrollToBottom();
        this.scrollFrameId = null;
      });
    });
  }

  private clearScrollFrame(): void {
    if (this.scrollFrameId !== null) {
      cancelAnimationFrame(this.scrollFrameId);
      this.scrollFrameId = null;
    }
  }

  private get currentSize(): ChatSizeOption {
    return this.sizeOptions.find((o) => o.id === this.selectedSize) ?? this.sizeOptions[1];
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}
