import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-footer-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  isNewsletterSubmitting = false;
  newsletterMessage = '';
  isFooterVisible = false;

  // Liens des réseaux sociaux
  socialLinks = {
    tiktok: 'https://www.tiktok.com/@collectif-metz-numerique',
    instagram: 'https://www.instagram.com/collectif_metz_numerique',
    facebook: 'https://www.facebook.com/collectif.metz.numerique',
    discord: 'https://discord.gg/collectif-metz-numerique',
    email: 'mailto:contact@collectif-metz-numerique.fr'
  };

  constructor() { }

  onFooterInViewport(visible: boolean) {
    if (visible && !this.isFooterVisible) {
      this.isFooterVisible = true;
      // Plus besoin d'appeler animateFooterElements()
    }
  }

  /**
   * Anime les éléments du footer quand il devient visible
   */
  private animateFooterElements(): void {
    // Animation du footer principal
    this.animateElement('footer', 'animate-slide-in-up', 100);

    // Animation des sections avec stagger
    this.animateElements('.footer-section', 'animate-slide-in-up-scale', 200, 120);

    // Animation des liens sociaux
    this.animateElements('.social-link', 'animate-bounce-in', 400, 50);

    // Animation du bouton d'adhésion
    this.animateElement('.adhesion-btn', 'animate-slide-in-right', 800);

    // Animation du copyright
    this.animateElement('.copyright', 'animate-slide-in-left', 600);

    // Animation des liens légaux
    this.animateElement('.legal-links', 'animate-flip-in', 700);

    // Animation des badges
    this.animateElements('.footer-badges .badge', 'animate-scale-rotate-in', 900, 100);
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  private animateElement(selector: string, animationClass: string, delay: number): void {
    if (!this.isBrowser()) return;
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add(animationClass);
        element.classList.remove('animate-hidden');
      }
    }, delay);
  }

  private animateElements(selector: string, animationClass: string, initialDelay: number, staggerDelay: number): void {
    if (!this.isBrowser()) return;
    setTimeout(() => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add(animationClass);
          element.classList.remove('animate-hidden');
        }, index * staggerDelay);
      });
    }, initialDelay);
  }

  /**
   * Validation de l'email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Affiche un message de retour pour la newsletter
   */
  private showNewsletterMessage(message: string, type: 'success' | 'error'): void {
    this.newsletterMessage = message;

    setTimeout(() => {
      this.newsletterMessage = '';
    }, 5000);
  }

  /**
   * Gestion des clics sur les réseaux sociaux
   */
  onSocialLinkClick(platform: string, event: Event): void {
    console.log(`Clic sur ${platform}`);

    // Analytics ou tracking simple
    this.trackSocialClick(platform);
  }

  /**
   * Tracking simple des clics sur les réseaux sociaux
   */
  private trackSocialClick(platform: string): void {
    // Tracking simple sans dépendance externe
    console.log(`Tracking: Social click on ${platform} at ${new Date().toISOString()}`);

    // Ici on pourrait envoyer les données à notre propre service d'analytics
    // ou stocker en localStorage pour un suivi basique
    try {
      const clicks = JSON.parse(localStorage.getItem('socialClicks') || '[]');
      clicks.push({
        platform,
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
      localStorage.setItem('socialClicks', JSON.stringify(clicks));
    } catch (error) {
      console.warn('Impossible de sauvegarder le tracking:', error);
    }
  }

  /**
   * Retourne la liste des liens de navigation
   */
  getNavigationLinks(): Array<{ label: string, route: string }> {
    return [
      { label: 'Accueil', route: '/' },
      { label: 'À propos', route: '/a-propos' },
      { label: 'Événements', route: '/evenements' },
      { label: 'Adhésion', route: '/adhesion' },
      { label: 'Actualités', route: '/actualites' },
      { label: 'Partenaires', route: '/partenaires' }
    ];
  }

  /**
   * Retourne la liste des services
   */
  getServiceLinks(): Array<{ label: string, route: string }> {
    return [
      { label: 'Formations', route: '/formations' },
      { label: 'Accompagnement', route: '/accompagnement' },
      { label: 'Conseil numérique', route: '/conseil' },
      { label: 'Ateliers pratiques', route: '/ateliers' },
      { label: 'Conférences', route: '/conferences' },
      { label: 'Ressources', route: '/ressources' }
    ];
  }

  /**
   * Retourne les informations de contact
   */
  getContactInfo() {
    return {
      address: {
        name: 'Collectif Metz Numérique',
        street: '123 Rue de la République',
        city: '57000 Metz, France'
      },
      phone: '+33 (0)3 87 XX XX XX',
      email: 'contact@collectif-metz-numerique.fr',
      hours: {
        weekdays: 'Lun - Ven : 9h00 - 18h00',
        saturday: 'Sam : 9h00 - 12h00'
      }
    };
  }

  /**
   * Retourne les liens légaux
   */
  getLegalLinks(): Array<{ label: string, route: string }> {
    return [
      { label: 'Informations légales', route: '/informations-legales' },
      { label: 'Politique de confidentialité', route: '/politique-confidentialite' },
      { label: 'Mentions légales', route: '/mentions-legales' },
      { label: 'Gestion des cookies', route: '/cookies' }
    ];
  }

  /**
   * Gestion des erreurs globales
   */
  private handleError(error: any, context: string): void {
    console.error(`Erreur dans ${context}:`, error);
  }
}
