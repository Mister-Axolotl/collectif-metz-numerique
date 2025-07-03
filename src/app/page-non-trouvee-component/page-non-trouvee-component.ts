import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, Location, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-page-non-trouvee-component',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './page-non-trouvee-component.html',
  styleUrl: './page-non-trouvee-component.scss'
})
export class PageNonTrouveeComponent implements OnInit, OnDestroy {
  constructor(
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Vérifier si on est côté client avant d'accéder aux APIs du navigateur
    if (isPlatformBrowser(this.platformId)) {
      // Tracking de la page 404 seulement côté client
      this.trackPageNotFound();

      // Ajouter une classe au body pour le style de la page d'erreur
      document.body.classList.add('error-page');
    }
  }

  ngOnDestroy(): void {
    // Nettoyer la classe au départ du component seulement côté client
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('error-page');
    }
  }

  /**
   * Retourne à la page précédente
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Tracking simple de la page 404 - seulement côté client
   */
  private trackPageNotFound(): void {
    // Vérifier une fois de plus qu'on est côté client
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    console.log('Page 404 visitée:', {
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });

    // Ici on pourrait envoyer les données à un service d'analytics
    try {
      const notFoundData = {
        page: window.location.pathname,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      // Stocker en localStorage pour analytics basique
      const existing = JSON.parse(localStorage.getItem('404Errors') || '[]');
      existing.push(notFoundData);

      // Garder seulement les 50 dernières erreurs
      if (existing.length > 50) {
        existing.splice(0, existing.length - 50);
      }

      localStorage.setItem('404Errors', JSON.stringify(existing));
    } catch (error) {
      console.error('Erreur lors du tracking 404:', error);
    }
  }

  /**
   * Suggestions de pages populaires
   */
  getPopularPages(): Array<{ label: string, route: string, icon: string }> {
    return [
      { label: 'À propos', route: '/a-propos', icon: 'info' },
      { label: 'Événements', route: '/evenements', icon: 'event' },
      { label: 'Adhésion', route: '/adhesion', icon: 'person_add' },
      { label: 'Contact', route: '/contact', icon: 'contact_mail' },
      { label: 'Actualités', route: '/actualites', icon: 'article' },
      { label: 'Partenaires', route: '/partenaires', icon: 'handshake' }
    ];
  }

  /**
   * Recherche simple dans les pages disponibles
   */
  searchPages(query: string): Array<{ label: string, route: string }> {
    const pages = this.getPopularPages();
    return pages.filter(page =>
      page.label.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * Gestion des erreurs
   */
  private handleError(error: any, context: string): void {
    console.error(`Erreur dans ${context}:`, error);
  }
}