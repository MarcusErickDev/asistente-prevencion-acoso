import { Component } from '@angular/core';

import { AssistantSectionComponent } from '../../components/assistant-section/assistant-section.component';
import { DisclaimerSectionComponent } from '../../components/disclaimer-section/disclaimer-section.component';
import { FaqSectionComponent } from '../../components/faq-section/faq-section.component';
import { FeedbackSectionComponent } from '../../components/feedback-section/feedback-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ImpactSectionComponent } from '../../components/impact-section/impact-section.component';
import { ProblemSectionComponent } from '../../components/problem-section/problem-section.component';
import { WorkshopsSectionComponent } from '../../components/workshops-section/workshops-section.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    ProblemSectionComponent,
    ImpactSectionComponent,
    AssistantSectionComponent,
    FaqSectionComponent,
    WorkshopsSectionComponent,
    FeedbackSectionComponent,
    DisclaimerSectionComponent,
  ],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}
