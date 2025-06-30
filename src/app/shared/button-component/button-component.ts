import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-button-component',
  standalone: true,
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  createRipple(event: MouseEvent) {
    const button = this.el.nativeElement.querySelector('button');
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }
}