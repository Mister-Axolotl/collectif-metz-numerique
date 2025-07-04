import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adhesion-success-component',
  imports: [
    CommonModule,
  ],
  templateUrl: './adhesion-success-component.html',
  styleUrl: './adhesion-success-component.scss'
})
export class AdhesionSuccessComponent implements OnInit {
  memberName = 'Chargement...';
  memberEmail = 'Chargement...';
  memberNumber = 'Chargement...';
  membershipEnd = 'Chargement...';
  sessionId = 'Chargement...';

  async ngOnInit() {
    // Récupère les paramètres d'URL
    const urlParams = new URLSearchParams(window.location.search);
    this.sessionId = urlParams.get('session_id') || 'Non disponible';
    const userId = urlParams.get('user_id');

    if (userId) {
      try {
        const response = await fetch(`http://localhost:4242/user/${userId}`);
        if (response.ok) {
          const user = await response.json();
          this.memberName = `${user.firstName} ${user.lastName}`;
          this.memberEmail = user.email;
          this.memberNumber = user.memberNumber || 'En cours d\'attribution';
          if (user.membershipEnd) {
            const endDate = new Date(user.membershipEnd);
            this.membershipEnd = endDate.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          }
        } else {
          this.memberName = 'Erreur de chargement';
          this.memberEmail = 'Erreur de chargement';
          this.memberNumber = 'Erreur de chargement';
          this.membershipEnd = 'Erreur de chargement';
        }
      } catch {
        this.memberName = 'Erreur réseau';
        this.memberEmail = 'Erreur réseau';
        this.memberNumber = 'Erreur réseau';
        this.membershipEnd = 'Erreur réseau';
      }
    }
    // Confetti (optionnel)
    setTimeout(() => this.createConfetti(), 500);
  }

  createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = 'fall 3s linear forwards';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
      }, i * 100);
    }
    // Ajoute l'animation CSS si pas déjà présente
    if (!document.getElementById('confetti-style')) {
      const style = document.createElement('style');
      style.id = 'confetti-style';
      style.textContent = `
        @keyframes fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  goToAdhesion() {
    window.location.href = '/adhesion';
  }
}
