import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil-component/accueil-component';
import { AProposComponent } from './apropos-component/apropos-component';
import { EvenementsComponent } from './evenements-component/evenements-component';
import { AdhesionComponent } from './adhesion-component/adhesion-component';
import { ProjetsComponent } from './projets-component/projets-component';
import { ActualitesComponent } from './actualites-component/actualites-component';
import { PartenairesComponent } from './partenaires-component/partenaires-component';
import { ContactComponent } from './contact-component/contact-component';
import { TestComponent } from './test-component/test-component';

export const routes: Routes = [
    {
        path: '',
        component: AccueilComponent
    },
    {
        path: 'a-propos',
        component: AProposComponent
    },
    {
        path: 'evenements',
        component: EvenementsComponent
    },
    {
        path: 'adhesion',
        component: AdhesionComponent
    },
    {
        path: 'projets',
        component: ProjetsComponent
    },
    {
        path: 'actualites',
        component: ActualitesComponent
    },
    {
        path: 'partenaires',
        component: PartenairesComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'test',
        component: TestComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];