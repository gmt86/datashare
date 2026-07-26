import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FichierResponse, DownloadRequest } from '../../models/fichier.model';

/**
 * Service responsable des appels HTTP liés à la gestion des fichiers.
 * Communique avec le backend pour l'upload, le téléchargement,
 * l'historique et la suppression des fichiers.
 */
@Injectable({
  providedIn: 'root'
})
export class FichierService {

  private readonly API_URL = '/api/fichiers';

  constructor(private http: HttpClient) {}

  /**
   * Upload un fichier avec ses métadonnées.
   */
  uploadFichier(formData: FormData): Observable<FichierResponse> {
    return this.http.post<FichierResponse>(this.API_URL, formData);
  }

  /**
   * Récupère les métadonnées d'un fichier via son token.
   */
  getFichierByToken(token: string): Observable<FichierResponse> {
    return this.http.get<FichierResponse>(`${this.API_URL}/${token}`);
  }

  /**
   * Télécharge un fichier via son token.
   */
  downloadFichier(token: string, request: DownloadRequest): Observable<Blob> {
  return this.http.post(`${this.API_URL}/${token}/download`, request, {
    responseType: 'blob',
    observe: 'response'
  }).pipe(
    map(response => {
      if (response.status === 200) {
        return response.body as Blob;
      }
      throw response;
    })
  );
}

  /**
   * Récupère l'historique des fichiers de l'utilisateur connecté.
   */
  getFichiers(): Observable<FichierResponse[]> {
    return this.http.get<FichierResponse[]>(this.API_URL);
  }

  /**
   * Supprime un fichier par son identifiant.
   */
  deleteFichier(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}