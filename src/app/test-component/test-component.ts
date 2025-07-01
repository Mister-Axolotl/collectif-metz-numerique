import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { ButtonComponent } from '../shared/button-component/button-component';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatIcon,
    MatDivider,
    ButtonComponent
  ],
  templateUrl: './test-component.html',
  styleUrl: './test-component.scss'
})
export class TestComponent implements OnInit {
  currentColors = {
    primary: '#5e9d81',
    secondary: '#457b9d',
    tertiary: '#781615',
    accent: '#a8dadc',
    alert: '#e63946',
    background: '#f1faee',
    text: '#202427'
  };

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    // Only load current colors if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.updateCurrentColors();
      // Load saved theme from localStorage if available
      this.loadSavedTheme();
    }
  }

  onColorChange(colorName: string, event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const target = event.target as HTMLInputElement;
    const newColor = target.value;

    // Update CSS custom property
    this.themeService.updateColor(colorName, newColor);

    // Update local state
    this.currentColors = {
      ...this.currentColors,
      [colorName]: newColor
    };
  }

  resetColors() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.themeService.resetColors();
    this.updateCurrentColors();
    // Clear saved theme
    localStorage.removeItem('customTheme');
  }

  saveColorScheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Save to localStorage
    localStorage.setItem('customTheme', JSON.stringify(this.currentColors));
    alert('Thème sauvegardé!');
  }

  private updateCurrentColors() {
    if (!isPlatformBrowser(this.platformId)) return;

    Object.keys(this.currentColors).forEach(colorName => {
      const currentColor = this.themeService.getCurrentColor(colorName);
      if (currentColor) {
        (this.currentColors as any)[colorName] = currentColor;
      }
    });
  }

  private loadSavedTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    const savedTheme = localStorage.getItem('customTheme');
    if (savedTheme) {
      try {
        const colors = JSON.parse(savedTheme);
        Object.entries(colors).forEach(([colorName, colorValue]) => {
          this.themeService.updateColor(colorName, colorValue as string);
          (this.currentColors as any)[colorName] = colorValue;
        });
      } catch (error) {
        console.error('Error loading saved theme:', error);
      }
    }
  }
}