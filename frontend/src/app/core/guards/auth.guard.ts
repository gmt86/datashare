import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard de protection des routes nécessitant une authentification.
 * Redirige vers la page de login si l'utilisateur n'est pas connecté.
 * Sauvegarde l'URL demandée pour rediriger après connexion.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      return true;
    }

    // Sauvegarder l'URL demandée pour rediriger après connexion
    this.authService.setRedirectUrl(state.url);

    // Rediriger vers la page de login
    this.router.navigate(['/login']);
    return false;
  }
}