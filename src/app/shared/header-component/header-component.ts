import { Component, HostListener } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
export class HeaderComponent {
  isNavSticky = false;
  isMobileMenuOpen = false;

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

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      this.isNavSticky = false; // désactive sticky si menu mobile ouvert
      document.body.classList.remove('nav-sticky');
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
