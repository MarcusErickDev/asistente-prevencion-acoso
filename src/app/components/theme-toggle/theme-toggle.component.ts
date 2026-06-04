import { Component, OnInit } from '@angular/core';

type LumaTheme = 'night' | 'pastel';

const THEME_STORAGE_KEY = 'luma-theme';
const DEFAULT_THEME: LumaTheme = 'night';
const ALLOWED_THEMES: LumaTheme[] = ['night', 'pastel'];

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: LumaTheme = DEFAULT_THEME;

  get isNight(): boolean {
    return this.currentTheme === 'night';
  }

  get nextThemeLabel(): string {
    return this.isNight ? 'Modo claro' : 'Modo oscuro';
  }

  get icon(): string {
    return this.isNight ? '☀️' : '🌙';
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = this.isAllowedTheme(savedTheme) ? savedTheme : DEFAULT_THEME;
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    this.applyTheme(this.isNight ? 'pastel' : 'night');
  }

  private applyTheme(theme: LumaTheme): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  private isAllowedTheme(theme: string | null): theme is LumaTheme {
    return ALLOWED_THEMES.includes(theme as LumaTheme);
  }
}
