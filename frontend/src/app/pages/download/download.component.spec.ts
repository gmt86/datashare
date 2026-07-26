import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DownloadComponent } from './download.component';
import { FichierService } from '../../core/services/fichier.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * Tests unitaires pour DownloadComponent.
 * Vérifie la page de téléchargement de fichier.
 */
describe('DownloadComponent', () => {

  let mockFichierService: jest.Mocked<FichierService>;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockFichierService = {
      uploadFichier: jest.fn(),
      getFichiers: jest.fn(),
      getFichierByToken: jest.fn(),
      downloadFichier: jest.fn(),
      deleteFichier: jest.fn()
    } as any;

    mockAuthService = {
      isAuthenticated: jest.fn().mockReturnValue(false),
      logout: jest.fn(),
      getToken: jest.fn(),
      storeToken: jest.fn(),
      getUserName: jest.fn(),
      getUserInitial: jest.fn(),
      getEmail: jest.fn(),
      setRedirectUrl: jest.fn(),
      getRedirectUrl: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [DownloadComponent, RouterModule.forRoot([]), HttpClientTestingModule],
      providers: [
        { provide: FichierService, useValue: mockFichierService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  /**
   * Test — le composant se crée correctement.
   */
  it('should create', () => {
    const fixture = TestBed.createComponent(DownloadComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  /**
   * Test — token est vide par défaut.
   */
  it('should have empty token by default', () => {
    const fixture = TestBed.createComponent(DownloadComponent);
    expect(fixture.componentInstance.token).toBe('');
  });

  /**
   * Test — isLoading est false par défaut.
   */
  it('should have isLoading false by default', () => {
    const fixture = TestBed.createComponent(DownloadComponent);
    expect(fixture.componentInstance.isLoading).toBe(false);
  });

  /**
   * Test — errorMessage est vide par défaut.
   */
  it('should have empty errorMessage by default', () => {
    const fixture = TestBed.createComponent(DownloadComponent);
    expect(fixture.componentInstance.errorMessage).toBe('');
  });
});