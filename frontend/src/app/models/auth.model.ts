/**
 * Représente les données envoyées lors de l'inscription.
 */
export interface RegisterRequest {
  email: string;
  password: string;
}

/**
 * Représente les données envoyées lors de la connexion.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Représente la réponse du backend après une authentification réussie.
 * Contient le token JWT à stocker et utiliser pour les requêtes suivantes.
 */
export interface AuthResponse {
  accessToken: string;
}