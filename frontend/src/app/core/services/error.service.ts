import { Injectable } from '@angular/core';


/**
 * Service centralisé de gestion des erreurs HTTP.
 * Traduit les codes d'erreur du backend en messages lisibles pour l'utilisateur.
 * Evite la duplication de la gestion des erreurs dans chaque composant.
 */

@Injectable({        /* permet de rendre ce service est disponible partout dans l'application, 
                      et Angular en crée une seule instance partagée par tous les composants 
                      ce qui évite de déclarer le service manuellement dans chaque module ou composant*/
  providedIn: 'root'
})


export class ErrorService {

  /**
 * Traduit une erreur HTTP en message lisible.
 * Priorité au message retourné par le backend.
 * Les messages de feedback sont utilisés uniquement si le backend
 * ne retourne pas de message explicite.
 */
getErrorMessage(error: any): string {

  // 1. Message explicite du backend — toujours prioritaire
  if (error?.error?.message) {
    return error.error.message;
  }

  // 2. Feedback générique si le backend ne retourne pas de message
  switch (error?.status) {
    case 400: return 'Requête invalide.';
    case 401: return 'Non autorisé.';
    case 403: return 'Accès refusé.';
    case 404: return 'Ressource introuvable.';
    case 500: return 'Erreur interne du serveur.';
    default:  return 'Une erreur inattendue est survenue.';
  }
}

}