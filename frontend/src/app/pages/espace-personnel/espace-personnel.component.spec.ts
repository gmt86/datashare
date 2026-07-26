import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EspacePersonnelComponent } from './espace-personnel.component';
import { FichierService } from '../../core/services/fichier.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * Tests unitaires pour EspacePersonnelComponent.
 * Vérifie l'historique des fichiers et les filtres.
 */
describe('EspacePersonnelComponent', () => {

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
      isAuthenticated: jest.fn().mockReturnValue(true),
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
      imports: [EspacePersonnelComponent, RouterModule.forRoot([]), HttpClientTestingModule],
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
    const fixture = TestBed.createComponent(EspacePersonnelComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  /**
   * Test — filtre actif est 'tous' par défaut.
   */
  it('should have filtreActif as tous by default', () => {
    const fixture = TestBed.createComponent(EspacePersonnelComponent);
    expect(fixture.componentInstance.filtreActif).toBe('tous');
  });

  /**
   * Test — setFiltre change le filtre actif.
   */
  it('should change filtreActif when setFiltre is called', () => {
    const fixture = TestBed.createComponent(EspacePersonnelComponent);
    fixture.componentInstance.setFiltre('actifs');
    expect(fixture.componentInstance.filtreActif).toBe('actifs');
  });

  /**
   * Test — fichiersFiltres retourne tous les fichiers par défaut.
   */
  it('should return all fichiers when filtreActif is tous', () => {
    const fixture = TestBed.createComponent(EspacePersonnelComponent);
    fixture.componentInstance.fichiers = [
      { estExpire: false } as any,
      { estExpire: true } as any
    ];
    expect(fixture.componentInstance.fichiersFiltres.length).toBe(2);
  });

  /**
   * Test — fichiersFiltres retourne uniquement les fichiers actifs.
   */
  it('should return only active fichiers when filtreActif is actifs', () => {
    const fixture = TestBed.createComponent(EspacePersonnelComponent);
    fixture.componentInstance.fichiers = [
      { estExpire: false } as any,
      { estExpire: true } as any
    ];
    fixture.componentInstance.setFiltre('actifs');
    expect(fixture.componentInstance.fichiersFiltres.length).toBe(1);
  });
});