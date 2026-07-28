import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DownloadComponent } from './download.component';
import { FichierService } from '../../core/services/fichier.service';
import { AuthService } from '../../core/services/auth.service';
import { of, throwError } from 'rxjs';

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



    /**
 * Test — formatSize retourne la taille en Mo.
 */
it('should format size correctly', () => {
  const fixture = TestBed.createComponent(DownloadComponent);
  const result = fixture.componentInstance.formatSize(1048576);
  expect(result).toBe('1.00 Mo');
});

/**
 * Test — fichier est null par défaut.
 */
it('should have null fichier by default', () => {
  const fixture = TestBed.createComponent(DownloadComponent);
  expect(fixture.componentInstance.fichier).toBeNull();
});

/**
 * Test — downloadForm est initialisé après ngOnInit.
 */
it('should initialize downloadForm on ngOnInit', () => {
  const { Subject } = require('rxjs');
  mockFichierService.getFichierByToken.mockReturnValue(new Subject());
  
  const fixture = TestBed.createComponent(DownloadComponent);
  fixture.componentInstance.ngOnInit();
  expect(fixture.componentInstance.downloadForm).toBeDefined();
  expect(fixture.componentInstance.downloadForm.get('password')).toBeDefined();
});

/**
 * Test — loadFichierMetadata charge les métadonnées du fichier.
 */
it('should load fichier metadata on ngOnInit', () => {
  const mockFichier = { nom: 'test.pdf', taille: 1024 } as any;
  mockFichierService.getFichierByToken.mockReturnValue(of(mockFichier));

  const fixture = TestBed.createComponent(DownloadComponent);
  fixture.componentInstance.ngOnInit();

  expect(fixture.componentInstance.fichier).toEqual(mockFichier);
});

/**
 * Test — loadFichierMetadata affiche erreur si fichier non trouvé.
 */
it('should show error when fichier not found', () => {
  mockFichierService.getFichierByToken.mockReturnValue(
    throwError(() => ({ status: 404 }))
  );

  const fixture = TestBed.createComponent(DownloadComponent);
  fixture.componentInstance.ngOnInit();

  expect(fixture.componentInstance.errorMessage).not.toBe('');
});

/**
 * Test — onDownload déclenche le téléchargement.
 */
it('should trigger download on onDownload', () => {
  const mockBlob = new Blob(['contenu'], { type: 'application/pdf' });
  mockFichierService.getFichierByToken.mockReturnValue(
    of({ nom: 'test.pdf', taille: 1024 } as any)
  );
  mockFichierService.downloadFichier.mockReturnValue(of(mockBlob));

  // Mock URL.createObjectURL
  global.URL.createObjectURL = jest.fn().mockReturnValue('blob:url');
  global.URL.revokeObjectURL = jest.fn();

  const fixture = TestBed.createComponent(DownloadComponent);
  fixture.componentInstance.ngOnInit();
  fixture.componentInstance.onDownload();

  expect(mockFichierService.downloadFichier).toHaveBeenCalled();
});

/**
 * Test — onDownload affiche erreur si téléchargement échoue.
 */
it('should show error when download fails', () => {
  mockFichierService.getFichierByToken.mockReturnValue(
    of({ nom: 'test.pdf' } as any)
  );
  mockFichierService.downloadFichier.mockReturnValue(
    throwError(() => ({ status: 401 }))
  );

  const fixture = TestBed.createComponent(DownloadComponent);
  fixture.componentInstance.ngOnInit();
  fixture.componentInstance.onDownload();

  expect(fixture.componentInstance.errorMessage).not.toBe('');
  expect(fixture.componentInstance.isLoading).toBe(false);
});

});