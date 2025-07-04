import { Component, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIcon
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent implements AfterViewInit {
  isNavSticky = false;
  isMobileMenuOpen = false;

  @ViewChild('mobileMenu') mobileMenuRef!: ElementRef<HTMLElement>;

  private previouslyFocusedElement: HTMLElement | null = null;

  constructor(private router: Router) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    // Désactive sticky sur mobile (largeur < 900px)
    if (window.innerWidth < 900 || this.isMobileMenuOpen) {
      if (this.isNavSticky) {
        this.isNavSticky = false;
        document.body.classList.remove('nav-sticky');
      }
      return;
    }

    const headerTop = document.querySelector('.header-top');
    if (!headerTop) return;

    // Position du bas de .header-top par rapport au haut du document
    const headerTopBottom = headerTop.getBoundingClientRect().bottom + window.scrollY;
    const scrollTop = window.scrollY || window.pageYOffset;

    // Si on a scrollé sous le bas de .header-top, on active sticky
    if (scrollTop >= headerTopBottom) {
      if (!this.isNavSticky) {
        this.isNavSticky = true;
        document.body.classList.add('nav-sticky');
      }
    } else {
      if (this.isNavSticky) {
        this.isNavSticky = false;
        document.body.classList.remove('nav-sticky');
      }
    }
  }

  ngAfterViewInit() {
    // Rien pour l'instant
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      this.isNavSticky = false; // désactive sticky si menu mobile ouvert
      document.body.classList.remove('nav-sticky');
      this.activateFocusTrap();
    } else {
      document.body.style.overflow = '';
      this.deactivateFocusTrap();
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
    this.deactivateFocusTrap();
  }

  private activateFocusTrap() {
    // Sauvegarde l'élément qui avait le focus
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    // Rends tout le reste du DOM inactif pour le focus
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    if (main) main.setAttribute('aria-hidden', 'true');
    if (footer) footer.setAttribute('aria-hidden', 'true');

    // Focus sur le premier lien du menu mobile
    setTimeout(() => {
      const firstFocusable = this.mobileMenuRef.nativeElement.querySelector<HTMLElement>(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) firstFocusable.focus();
    }, 0);

    // Ajoute un écouteur pour garder le focus dans le menu
    document.addEventListener('focusin', this.trapFocus, true);
  }

  private deactivateFocusTrap() {
    // Restaure le focus précédent
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }

    // Rends le reste du DOM accessible à nouveau
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    if (main) main.removeAttribute('aria-hidden');
    if (footer) footer.removeAttribute('aria-hidden');

    document.removeEventListener('focusin', this.trapFocus, true);
  }

  private trapFocus = (event: FocusEvent) => {
    if (!this.isMobileMenuOpen || !this.mobileMenuRef) return;
    const menu = this.mobileMenuRef.nativeElement;
    if (!menu.contains(event.target as Node)) {
      // Focus en dehors du menu => ramène le focus dans le menu
      const focusableEls = menu.querySelectorAll<HTMLElement>(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls.length) {
        focusableEls[0].focus();
        event.preventDefault();
      }
    }
  };

  // ✅ Version corrigée du skip link
  skipToContent(event: Event) {
    event.preventDefault();

    // Focus direct sur le main content de la page actuelle
    setTimeout(() => {
      const main = document.getElementById('main-content');
      if (main) {
        main.setAttribute('tabindex', '-1');
        (main as HTMLElement).focus();
        // Scroll vers l'élément au cas où
        main.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => main.removeAttribute('tabindex'), 100);
      }
    }, 10);
  }
}
