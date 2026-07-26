import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

/**
 * Tests unitaires pour UserService.
 * Vérifie les appels HTTP d'authentification.
 */
describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockAuthService = {
      storeToken: jest.fn(),
      getToken: jest.fn(),
      isAuthenticated: jest.fn(),
      logout: jest.fn(),
      getUserName: jest.fn(),
      getUserInitial: jest.fn(),
      getEmail: jest.fn(),
      setRedirectUrl: jest.fn(),
      getRedirectUrl: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Test — register appelle POST /api/auth/register.
   */
  it('should call POST /api/auth/register', () => {
    const request = { email: 'test@datashare.com', password: 'password123' };
    userService.register(request).subscribe();
    const req = httpMock.expectOne('/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Compte créé avec succès' });
  });

  /**
   * Test — login appelle POST /api/auth/login.
   */
  it('should call POST /api/auth/login', () => {
    const request = { email: 'test@datashare.com', password: 'password123' };
    userService.login(request).subscribe();
    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ accessToken: 'jwt-token' });
  });

  /**
   * Test — login stocke le token après connexion réussie.
   */
  it('should store token after successful login', () => {
    const request = { email: 'test@datashare.com', password: 'password123' };
    userService.login(request).subscribe();
    const req = httpMock.expectOne('/api/auth/login');
    req.flush({ accessToken: 'jwt-token' });
    expect(mockAuthService.storeToken).toHaveBeenCalledWith('jwt-token');
  });
});