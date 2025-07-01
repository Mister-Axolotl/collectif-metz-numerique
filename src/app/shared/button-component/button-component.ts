import { Component, Input } from '@angular/core';
import { MatButton, MatIconButton, MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-component',
  standalone: true,
  imports: [
    MatButton,
    MatIconButton,
    MatFabButton,
    MatMiniFabButton,
    NgClass,
    MatIcon,
    NgSwitch,
    NgSwitchCase,
    RouterLink
  ],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss'
})
export class ButtonComponent {
  @Input() type: 'text' | 'elevated' | 'outlined' | 'filled' | 'tonal' | 'icon' | 'fab' | 'mini-fab' | 'extended-fab' |
    'text-link' | 'elevated-link' | 'outlined-link' | 'filled-link' | 'tonal-link' | 'extended-fab-link' = 'text';
  @Input() text: string = '';
  @Input() icon?: string;
  @Input() color: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'warn' = 'primary';
  @Input() disabled: boolean = false;
  @Input() ariaLabel?: string;
  @Input() href?: string;
  @Input() target?: string = '_blank';
  @Input() routerLink?: string;

  getButtonClasses(): string {
    return `button-${this.type} button-${this.color}`;
  }
}
