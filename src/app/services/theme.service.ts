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

            // Auto-update text colors based on background brightness
            this.updateTextColor(colorName, colorValue);
        }
    }

    private updateTextColor(colorName: string, backgroundColor: string): void {
        // Calculate if we need white or black text
        const textColor = this.getContrastColor(backgroundColor);

        // Update corresponding text color variable
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
        // Remove # if present
        const color = hexColor.replace('#', '');

        // Convert to RGB
        const r = parseInt(color.substr(0, 2), 16);
        const g = parseInt(color.substr(2, 2), 16);
        const b = parseInt(color.substr(4, 2), 16);

        // Calculate relative luminance using WCAG formula
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Return white for dark backgrounds, black for light backgrounds
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }

    resetColors(): void {
        if (isPlatformBrowser(this.platformId)) {
            Object.entries(this.defaultColors).forEach(([name, value]) => {
                document.documentElement.style.setProperty(`--${name}-color`, value);
            });

            // Reset text colors to defaults
            document.documentElement.style.setProperty('--primary-text-color', '#ffffff');
            document.documentElement.style.setProperty('--secondary-text-color', '#ffffff');
            document.documentElement.style.setProperty('--accent-text-color', '#202427');
            document.documentElement.style.setProperty('--alert-text-color', '#ffffff');
        }
    }

    getCurrentColor(colorName: string): string {
        if (isPlatformBrowser(this.platformId)) {
            return getComputedStyle(document.documentElement)
                .getPropertyValue(`--${colorName}-color`).trim();
        }
        return (this.defaultColors as any)[colorName] || '';
    }

    getDefaultColors() {
        return this.defaultColors;
    }
}