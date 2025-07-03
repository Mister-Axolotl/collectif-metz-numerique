import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AutoSeoService {

    private pageMetaData: { [key: string]: { title: string, description: string, keywords?: string } } = {
        '/': {
            title: 'Accueil - Collectif Metz Numérique',
            description: 'Bienvenue au Collectif Metz Numérique ! Découvrez notre communauté engagée qui favorise le lien social et la participation citoyenne sur le territoire messin à travers des initiatives locales innovantes.',
            keywords: 'accueil, collectif, metz, lien social, participation citoyenne'
        },
        '/a-propos': {
            title: 'À propos - Collectif Metz Numérique',
            description: 'Découvrez la mission du Collectif Metz Numérique : favoriser le lien social, la participation citoyenne et la découverte culturelle sur le territoire messin grâce aux outils numériques.',
            keywords: 'à propos, mission, collectif, metz, numérique'
        },
        '/evenements': {
            title: 'Événements - Collectif Metz Numérique',
            description: 'Participez aux événements physiques et digitaux du Collectif Metz Numérique. Découvrez nos initiatives locales et rejoignez notre communauté messine engagée.',
            keywords: 'événements, initiatives, communauté, metz, digital'
        },
        '/actualites': {
            title: 'Actualités - Collectif Metz Numérique',
            description: 'Suivez les dernières actualités du Collectif Metz Numérique : initiatives locales, événements communautaires et découvertes culturelles à Metz.',
            keywords: 'actualités, news, initiatives, metz, culture'
        },
        '/adhesion': {
            title: 'Adhésion - Collectif Metz Numérique',
            description: 'Rejoignez le Collectif Metz Numérique ! Participez à notre communauté engagée et contribuez au développement du lien social sur le territoire messin.',
            keywords: 'adhésion, rejoindre, membre, collectif, metz'
        },
        '/partenaires': {
            title: 'Partenaires - Collectif Metz Numérique',
            description: 'Découvrez les partenaires du Collectif Metz Numérique qui soutiennent nos initiatives locales et notre mission de participation citoyenne à Metz.',
            keywords: 'partenaires, soutien, collaboration, metz'
        },
        '/formations': {
            title: 'Formations - Collectif Metz Numérique',
            description: 'Participez aux formations numériques du Collectif Metz Numérique. Développez vos compétences digitales et renforcez le lien social sur le territoire messin.',
            keywords: 'formations, numérique, compétences, metz'
        },
        '/accompagnement': {
            title: 'Accompagnement - Collectif Metz Numérique',
            description: 'Bénéficiez d\'un accompagnement personnalisé du Collectif Metz Numérique pour vos projets numériques et initiatives locales sur le territoire messin.',
            keywords: 'accompagnement, personnalisé, projets, metz'
        },
        '/conseil': {
            title: 'Conseil numérique - Collectif Metz Numérique',
            description: 'Profitez des conseils numériques du Collectif Metz Numérique pour vos projets digitaux et initiatives de participation citoyenne à Metz.',
            keywords: 'conseil, numérique, digital, metz'
        },
        '/ateliers': {
            title: 'Ateliers pratiques - Collectif Metz Numérique',
            description: 'Participez aux ateliers pratiques du Collectif Metz Numérique. Découvrez les outils numériques pour renforcer le lien social sur le territoire messin.',
            keywords: 'ateliers, pratiques, outils, metz'
        },
        '/conferences': {
            title: 'Conférences - Collectif Metz Numérique',
            description: 'Assistez aux conférences du Collectif Metz Numérique sur la participation citoyenne, la découverte culturelle et les innovations numériques à Metz.',
            keywords: 'conférences, participation, culture, metz'
        },
        '/ressources': {
            title: 'Ressources - Collectif Metz Numérique',
            description: 'Accédez aux ressources numériques du Collectif Metz Numérique pour vos projets de lien social et de participation citoyenne sur le territoire messin.',
            keywords: 'ressources, numérique, projets, metz'
        }
    };

    constructor(
        private meta: Meta,
        private titleService: Title,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.initSeoService();
    }

    private initSeoService() {
        // Seulement côté client
        if (isPlatformBrowser(this.platformId)) {
            // Écoute les changements de route
            this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe((event: NavigationEnd) => {
                this.updateMetaForRoute(event.urlAfterRedirects);
            });
        }

        // Définit les meta par défaut au démarrage (côté serveur et client)
        this.setDefaultMeta();
    }

    private updateMetaForRoute(url: string) {
        const metaData = this.pageMetaData[url];
        if (metaData) {
            this.updatePageMeta(metaData.title, metaData.description, metaData.keywords);
        }
    }

    private updatePageMeta(title: string, description: string, keywords?: string) {
        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });

        if (keywords) {
            this.meta.updateTag({ name: 'keywords', content: keywords });
        }

        // Open Graph
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:locale', content: 'fr_FR' });

        // Twitter Cards
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
    }

    private setDefaultMeta() {
        const defaultMeta = this.pageMetaData['/'];
        if (defaultMeta) {
            this.updatePageMeta(defaultMeta.title, defaultMeta.description, defaultMeta.keywords);
        }
    }
}
