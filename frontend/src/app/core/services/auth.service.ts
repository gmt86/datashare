import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Service responsable de la gestion du token JWT.
 * Gère le stockage, la vérification et la redirection après authentification.
 * Les appels HTTP sont délégués au UserService.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'auth_token';
  private readonly REDIRECT_URL_KEY = 'redirect_url';

  constructor(private router: Router) {}

  /**
   * Stocke le token JWT dans le localStorage.
   */
  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Retourne le token JWT stocké.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Vérifie si l'utilisateur est authentifié.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Déconnecte l'utilisateur en supprimant le token.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Sauvegarde l'URL demandée pour rediriger après connexion.
   */
  setRedirectUrl(url: string): void {
    localStorage.setItem(this.REDIRECT_URL_KEY, url);
  }

  /**
   * Retourne l'URL de redirection sauvegardée.
   */
  getRedirectUrl(): string | null {
    return localStorage.getItem(this.REDIRECT_URL_KEY);
  }

  /**
 * Extrait l'email depuis le token JWT.
 */
getEmail(): string | null {
  const token = this.getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.sub;
}

/**
 * Retourne la partie avant @ de l'email.
 */
getUserName(): string {
  const email = this.getEmail();
  return email ? email.split('@')[0] : '';
}

/**
 * Retourne l'initiale de l'utilisateur.
 */
getUserInitial(): string {
  const userName = this.getUserName();
  return userName ? userName[0].toUpperCase() : '?';
}

}