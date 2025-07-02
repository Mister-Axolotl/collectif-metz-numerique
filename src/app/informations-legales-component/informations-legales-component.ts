import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-informations-legales-component',
  imports: [
    CommonModule,
  ],
  templateUrl: './informations-legales-component.html',
  styleUrl: './informations-legales-component.scss'
})
export class InformationsLegalesComponent {
  activeTab: string = 'reunions';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}