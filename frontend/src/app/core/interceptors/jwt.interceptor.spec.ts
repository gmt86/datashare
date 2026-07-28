import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { jwtInterceptor } from './jwt.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

/**
 * Tests unitaires pour JwtInterceptor.
 * Vérifie l'ajout du token JWT aux requêtes HTTP.
 */
describe('JwtInterceptor', () => {

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
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
      providers: [
        provideHttpClient(withInterceptors([jwtInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuthService },
        { provide: ErrorService, useValue: { getErrorMessage: jest.fn() } },
        { provide: Router, useValue: mockRouter }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Test — ajoute le header Authorization si token présent.
   */
  it('should add Authorization header when token exists', () => {
    mockAuthService.getToken.mockReturnValue('my-jwt-token');

    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.get('Authorization')).toBe('Bearer my-jwt-token');
    req.flush({});
  });

  /**
   * Test — ne ajoute pas le header si token absent.
   */
  it('should not add Authorization header when token is absent', () => {
    mockAuthService.getToken.mockReturnValue(null);

    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.get('Authorization')).toBeNull();
    req.flush({});
  });


  /**
 * Test — erreur 401 déclenche logout et redirection vers login.
 */
it('should logout and navigate to login on 401 error', () => {
  mockAuthService.getToken.mockReturnValue('my-jwt-token');

  httpClient.get('/api/fichiers').subscribe({
    error: () => {}
  });

  const req = httpMock.expectOne('/api/fichiers');
  req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

  expect(mockAuthService.logout).toHaveBeenCalled();
  expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
});

/**
 * Test — erreur 401 sur download ne déclenche pas logout.
 */
it('should not logout on 401 error for download endpoint', () => {
  mockAuthService.getToken.mockReturnValue('my-jwt-token');

  httpClient.post('/api/fichiers/token/download', {}).subscribe({
    error: () => {}
  });

  const req = httpMock.expectOne('/api/fichiers/token/download');
  req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

  expect(mockAuthService.logout).not.toHaveBeenCalled();
});

/**
 * Test — erreur 500 ne déclenche pas logout.
 */
it('should not logout on 500 error', () => {
  mockAuthService.getToken.mockReturnValue('my-jwt-token');

  httpClient.get('/api/fichiers').subscribe({
    error: () => {}
  });

  const req = httpMock.expectOne('/api/fichiers');
  req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

  expect(mockAuthService.logout).not.toHaveBeenCalled();
});


});