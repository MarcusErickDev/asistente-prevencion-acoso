import { Component } from '@angular/core';

import { AssistantSectionComponent } from './components/assistant-section/assistant-section.component';
import { DisclaimerSectionComponent } from './components/disclaimer-section/disclaimer-section.component';
import { FeedbackSectionComponent } from './components/feedback-section/feedback-section.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ProblemSectionComponent } from './components/problem-section/problem-section.component';
import { WorkshopsSectionComponent } from './components/workshops-section/workshops-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroSectionComponent,
    ProblemSectionComponent,
    AssistantSectionComponent,
    WorkshopsSectionComponent,
    FeedbackSectionComponent,
    DisclaimerSectionComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {}
