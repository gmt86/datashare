import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../../core/services/auth.service';
import { FichierService } from '../../core/services/fichier.service';

/**
 * Tests unitaires pour HomeComponent.
 * Vérifie la page d'accueil et le formulaire d'upload.
 */
describe('HomeComponent', () => {

  let mockAuthService: jest.Mocked<AuthService>;
  let mockFichierService: jest.Mocked<FichierService>;

  beforeEach(async () => {
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

    mockFichierService = {
      uploadFichier: jest.fn(),
      getFichiers: jest.fn(),
      getFichierByToken: jest.fn(),
      downloadFichier: jest.fn(),
      deleteFichier: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterModule.forRoot([]), HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: FichierService, useValue: mockFichierService }
      ]
    }).compileComponents();
  });

  /**
   * Test — le composant se crée correctement.
   */
  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  /**
   * Test — showForm est false par défaut.
   */
  it('should have showForm false by default', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    expect(fixture.componentInstance.showForm).toBe(false);
  });

  /**
   * Test — showUploadForm redirige vers login si non connecté.
   */
  it('should not show form when not authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false);
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.componentInstance.showUploadForm();
    expect(fixture.componentInstance.showForm).toBe(false);
  });

  /**
   * Test — showUploadForm affiche le formulaire si connecté.
   */
  it('should show form when authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true);
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.componentInstance.showUploadForm();
    expect(fixture.componentInstance.showForm).toBe(true);
  });

  /**
   * Test — formulaire upload invalide si vide.
   */
  it('should have invalid upload form when empty', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.uploadForm.invalid).toBe(true);
  });


  /**
 * Test — onSubmit sans fichier sélectionné affiche erreur.
 */
it('should show error when submitting without file', () => {
  mockAuthService.isAuthenticated.mockReturnValue(true);
  const fixture = TestBed.createComponent(HomeComponent);
  fixture.componentInstance.ngOnInit();
  fixture.componentInstance.showUploadForm();
  fixture.componentInstance.onSubmit();
  expect(fixture.componentInstance.errorMessage).toBe('Veuillez sélectionner un fichier.');
});

/**
 * Test — reset réinitialise le formulaire.
 */
it('should reset form correctly', () => {
  const fixture = TestBed.createComponent(HomeComponent);
  fixture.componentInstance.ngOnInit();
  fixture.componentInstance.showForm = true;
  fixture.componentInstance.errorMessage = 'erreur';
  fixture.componentInstance.reset();
  expect(fixture.componentInstance.showForm).toBe(false);
  expect(fixture.componentInstance.errorMessage).toBe('');
  expect(fixture.componentInstance.selectedFile).toBeNull();
});

/**
 * Test — getDownloadLink retourne le bon lien.
 */
it('should return correct download link', () => {
  const fixture = TestBed.createComponent(HomeComponent);
  fixture.componentInstance.uploadResult = {
    tokenTelechargement: 'abc-123'
  } as any;
  const link = fixture.componentInstance.getDownloadLink();
  expect(link).toContain('abc-123');
});

/**
 * Test — calculateExpirationDate retourne une date future.
 */
it('should calculate expiration date correctly', () => {
  const fixture = TestBed.createComponent(HomeComponent);
  const date = (fixture.componentInstance as any).calculateExpirationDate(7);
  expect(date).toBeDefined();
  expect(new Date(date).getTime()).toBeGreaterThan(Date.now());
});

});