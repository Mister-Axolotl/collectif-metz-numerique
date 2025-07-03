import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accueil-component',
  imports: [RouterModule],
  templateUrl: './accueil-component.html',
  styleUrl: './accueil-component.scss'
})
export class AccueilComponent {
  // Vous pouvez ajouter des données dynamiques ici
  stats = {
    members: 150,
    events: 50,
    formations: 25,
    partners: 10
  };

  recentNews = [
    {
      date: '15 Janvier 2024',
      title: 'Atelier "Numérique Responsable"',
      excerpt: 'Découvrez comment réduire votre empreinte numérique lors de notre prochain atelier.',
      slug: 'atelier-numerique-responsable'
    },
    {
      date: '10 Janvier 2024',
      title: 'Nouveau partenariat avec la Ville',
      excerpt: 'Le collectif signe un partenariat pour développer l\'inclusion numérique à Metz.',
      slug: 'partenariat-ville-metz'
    },
    {
      date: '5 Janvier 2024',
      title: 'Formations 2024 disponibles',
      excerpt: 'Inscrivez-vous dès maintenant à nos formations pour développer vos compétences.',
      slug: 'formations-2024'
    }
  ];
}
