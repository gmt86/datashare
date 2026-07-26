import { Component, inject, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

/**
 * Layout spécifique à l'espace personnel.
 * Gère la sidebar responsive avec menu hamburger sur mobile.
 */
@Component({
  selector: 'app-espace-personnel-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './espace-personnel-layout.component.html',
  styleUrl: './espace-personnel-layout.component.scss'
})
export class EspacePersonnelLayoutComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  /** Année en cours pour le copyright */
  currentYear: number = new Date().getFullYear();

  /** Contrôle l'affichage de la sidebar sur mobile */
  sidebarOpen: boolean = false;

  /**
   * Retourne le nom de l'utilisateur (partie avant @).
   */
  getUserName(): string {
    return this.authService.getUserName();
  }

  /**
   * Retourne l'initiale de l'utilisateur.
   */
  getUserInitial(): string {
    return this.authService.getUserInitial();
  }

  /**
   * Ouvre/ferme la sidebar sur mobile.
   */
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /**
   * Ferme la sidebar sur mobile.
   */
  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  /**
   * Déconnecte l'utilisateur et redirige vers login.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}