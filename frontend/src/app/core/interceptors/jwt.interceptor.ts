import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * Intercepteur HTTP qui ajoute automatiquement le token JWT
 * à chaque requête sortante vers le backend.
 * Gère également les erreurs HTTP via ErrorService.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const errorService = inject(ErrorService);
  const router = inject(Router);

  // Récupérer le token stocké
  const token = authService.getToken();


  // Cloner la requête et ajouter le token si présent
  let authReq = req;
  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  // Passer la requête et gérer les erreurs centralement
  return next(authReq).pipe(
    catchError((error) => {
      const message = errorService.getErrorMessage(error);

      if (error.status === 401 && !req.url.includes('/download') ) {  
        // Token invalide ou expiré — déconnexion automatique
         // Déconnexion uniquement si ce n'est pas une erreur de mot de passe fichier
        authService.logout();
        router.navigate(['/login']);
      }

      // On retransmet l'erreur originale sans la transformer
      return throwError(() => error);
      //return throwError(() => new Error(message));
    })
  );
};