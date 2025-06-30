import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header-component/header-component';
import { FooterComponent } from '../../shared/footer-component/footer-component';
import { ButtonComponent } from '../../shared/button-component/button-component';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent { }
