import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private defaultColors = {
        primary: '#5e9d81',
        secondary: '#457b9d',
        tertiary: '#781615',
        accent: '#a8dadc',
        background: '#f1faee',
        text: '#202427',
        alert: '#e63946',
        success: '#2a9d8f',
        warning: '#ffb703',
        info: '#0077b6',
        white: '#ffffff',
        black: '#0d0d0d'
    };

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    updateColor(colorName: string, colorValue: string): void {
        if (isPlatformBrowser(this.platformId)) {
            document.documentElement.style.setProperty(`--${colorName}-color`, colorValue);
            this.updateTextColor(colorName, colorValue);
        }
    }

    getCurrentColor(colorName: string): string {
        if (isPlatformBrowser(this.platformId)) {
            return getComputedStyle(document.documentElement)
                .getPropertyValue(`--${colorName}-color`).trim() ||
                this.defaultColors[colorName as keyof typeof this.defaultColors] || '';
        }
        return this.defaultColors[colorName as keyof typeof this.defaultColors] || '';
    }

    resetColors(): void {
        if (isPlatformBrowser(this.platformId)) {
            Object.entries(this.defaultColors).forEach(([name, value]) => {
                document.documentElement.style.setProperty(`--${name}-color`, value);
            });
        }
    }

    private updateTextColor(colorName: string, backgroundColor: string): void {
        if (!isPlatformBrowser(this.platformId)) return;

        const textColor = this.getContrastColor(backgroundColor);
        const textColorMap: { [key: string]: string } = {
            'primary': 'primary-text',
            'secondary': 'secondary-text',
            'accent': 'accent-text',
            'alert': 'alert-text'
        };

        const textColorName = textColorMap[colorName];
        if (textColorName) {
            document.documentElement.style.setProperty(`--${textColorName}-color`, textColor);
        }
    }

    private getContrastColor(hexColor: string): string {
        const color = hexColor.replace('#', '');
        const r = parseInt(color.substr(0, 2), 16);
        const g = parseInt(color.substr(2, 2), 16);
        const b = parseInt(color.substr(4, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }
}