import { TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Tests unitaires pour AuthGuard.
 * Vérifie la protection des routes nécessitant une authentification.
 */
describe('AuthGuard', () => {

  let authGuard: AuthGuard;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: jest.fn(),
      logout: jest.fn(),
      getToken: jest.fn(),
      storeToken: jest.fn(),
      getUserName: jest.fn(),
      getUserInitial: jest.fn(),
      getEmail: jest.fn(),
      setRedirectUrl: jest.fn(),
      getRedirectUrl: jest.fn()
    } as any;

    mockRouter = {
      navigate: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  /**
   * Test — autorise l'accès si authentifié.
   */
  it('should allow access when authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true);
    const result = authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      { url: '/espace-personnel' } as RouterStateSnapshot
    );
    expect(result).toBe(true);
  });

  /**
   * Test — redirige vers login si non authentifié.
   */
  it('should redirect to login when not authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false);
    const result = authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      { url: '/espace-personnel' } as RouterStateSnapshot
    );
    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  /**
   * Test — sauvegarde l'URL de redirection.
   */
  it('should save redirect url when not authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false);
    authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      { url: '/espace-personnel' } as RouterStateSnapshot
    );
    expect(mockAuthService.setRedirectUrl).toHaveBeenCalledWith('/espace-personnel');
  });
});