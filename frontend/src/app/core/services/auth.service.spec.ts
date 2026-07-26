import { AuthService } from './auth.service';
import { Router } from '@angular/router';

/**
 * Tests unitaires pour AuthService.
 * Vérifie la gestion du token JWT dans le localStorage.
 */
describe('AuthService', () => {
  let authService: AuthService;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    mockRouter = { navigate: jest.fn() } as any;
    authService = new AuthService(mockRouter);
    localStorage.clear();
  });

  /**
   * Test — storeToken stocke le token dans localStorage.
   */
  it('should store token in localStorage', () => {
    authService.storeToken('my-token');
    expect(localStorage.getItem('auth_token')).toBe('my-token');
  });

  /**
   * Test — getToken retourne le token stocké.
   */
  it('should return stored token', () => {
    localStorage.setItem('auth_token', 'my-token');
    expect(authService.getToken()).toBe('my-token');
  });

  /**
   * Test — isAuthenticated retourne true si token présent.
   */
  it('should return true when token exists', () => {
    localStorage.setItem('auth_token', 'my-token');
    expect(authService.isAuthenticated()).toBe(true);
  });

  /**
   * Test — isAuthenticated retourne false si token absent.
   */
  it('should return false when token is absent', () => {
    expect(authService.isAuthenticated()).toBe(false);
  });

  /**
   * Test — logout supprime le token et redirige vers login.
   */
  it('should remove token and navigate to login on logout', () => {
    localStorage.setItem('auth_token', 'my-token');
    authService.logout();
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  /**
   * Test — getUserName retourne la partie avant @ de l'email.
   */
  it('should return username from email token', () => {
    const token = btoa(JSON.stringify({})) + '.' + 
                  btoa(JSON.stringify({ sub: 'test@datashare.com' })) + 
                  '.signature';
    localStorage.setItem('auth_token', token);
    expect(authService.getUserName()).toBe('test');
  });
});