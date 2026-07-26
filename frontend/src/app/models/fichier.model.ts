/**
 * Représente les métadonnées d'un fichier retournées par le backend.
 */
export interface FichierResponse {
  id: string;
  nom: string;
  typeFichier: string;
  taille: number;
  dateExpiration: string;
  dateCreation: string;
  tokenTelechargement: string;
  estProtege: boolean;
  estExpire: boolean;
}


/**
 * Représente les données du formulaire d'upload côté frontend.
 */
export interface FichierUploadForm {
  fichier: File | null;
  dateExpiration: string;
  password?: string;
}

/**
 * Représente les données envoyées lors du téléchargement d'un fichier protégé.
 */
export interface DownloadRequest {
  password?: string;
}