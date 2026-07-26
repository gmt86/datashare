import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Composant Header réutilisable.
 * Affiche le logo DataShare et le bouton de connexion/déconnexion
 * selon l'état d'authentification de l'utilisateur.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Vérifie si l'utilisateur est connecté.
   */
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * Déconnecte l'utilisateur et redirige vers la page de login.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}