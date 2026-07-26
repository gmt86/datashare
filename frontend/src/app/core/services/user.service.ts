import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../models/auth.model';
import { AuthService } from './auth.service';

/**
 * Service responsable des appels HTTP liés à l'authentification.
 * Communique avec le backend pour l'inscription et la connexion.
 * Délègue la gestion du token JWT à AuthService.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
 * Inscrit un nouvel utilisateur.
 * Ne stocke pas de token — l'utilisateur doit se connecter après.
 */
  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>('/api/auth/register', request);
  }

  /**
   * Connecte un utilisateur existant et stocke le token JWT reçu.
   */
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', request).pipe(
      tap(response => this.authService.storeToken(response.accessToken))
    );
  }
}