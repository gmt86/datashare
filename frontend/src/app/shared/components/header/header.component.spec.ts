import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Tests unitaires pour HeaderComponent.
 * Vérifie l'affichage selon l'état d'authentification.
 */
describe('HeaderComponent', () => {

  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
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

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterModule.forRoot([])],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();
  });

  /**
   * Test — le composant se crée correctement.
   */
  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  /**
   * Test — affiche "Se connecter" si non authentifié.
   */
  it('should show login button when not authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false);
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Se connecter');
  });

  /**
   * Test — affiche "Mon espace" si authentifié.
   */
  it('should show mon espace button when authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true);
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mon espace');
  });
});