import { Routes } from '@angular/router';

import { ChatbotPageComponent } from './pages/chatbot-page/chatbot-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'asistente',
    component: ChatbotPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
