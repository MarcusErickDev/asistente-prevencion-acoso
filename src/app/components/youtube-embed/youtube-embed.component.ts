import { Component, Input, OnChanges, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-embed',
  standalone: true,
  templateUrl: './youtube-embed.component.html',
})
export class YoutubeEmbedComponent implements OnChanges {
  private readonly sanitizer = inject(DomSanitizer);

  @Input({ required: true }) embedUrl = '';
  @Input({ required: true }) title = '';

  safeEmbedUrl: SafeResourceUrl | null = null;

  ngOnChanges(): void {
    this.safeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedUrl);
  }
}
