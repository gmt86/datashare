import { ErrorService } from './error.service';

/**
 * Tests unitaires pour ErrorService.
 * Vérifie la traduction des codes HTTP en messages lisibles.
 */
describe('ErrorService', () => {
  let errorService: ErrorService;

  beforeEach(() => {
    errorService = new ErrorService();
  });

  /**
   * Test — retourne le message du backend si présent.
   */
  it('should return backend message when available', () => {
    const error = { error: { message: 'Email déjà utilisé' }, status: 409 };
    expect(errorService.getErrorMessage(error)).toBe('Email déjà utilisé');
  });

  /**
   * Test — retourne message 400 si données invalides.
   */
  it('should return 400 message for bad request', () => {
    const error = { status: 400 };
    expect(errorService.getErrorMessage(error)).toBe('Requête invalide.');
  });

  /**
   * Test — retourne message 401 si non autorisé.
   */
  it('should return 401 message for unauthorized', () => {
    const error = { status: 401 };
    expect(errorService.getErrorMessage(error)).toBe('Non autorisé.');
  });

  /**
   * Test — retourne message 404 si ressource introuvable.
   */
  it('should return 404 message for not found', () => {
    const error = { status: 404 };
    expect(errorService.getErrorMessage(error)).toBe('Ressource introuvable.');
  });

  /**
   * Test — retourne message 500 si erreur serveur.
   */
  it('should return 500 message for server error', () => {
    const error = { status: 500 };
    expect(errorService.getErrorMessage(error)).toBe('Erreur interne du serveur.');
  });

  /**
   * Test — retourne message par défaut si code inconnu.
   */
  it('should return default message for unknown error', () => {
    const error = { status: 999 };
    expect(errorService.getErrorMessage(error)).toBe('Une erreur inattendue est survenue.');
  });
});