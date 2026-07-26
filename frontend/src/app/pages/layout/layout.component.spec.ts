import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthService } from '../../core/services/auth.service';

/**
 * Tests unitaires pour LayoutComponent.
 * Vérifie le layout commun avec header et footer.
 */
describe('LayoutComponent', () => {

  let mockAuthService: jest.Mocked<AuthService>;

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

    await TestBed.configureTestingModule({
      imports: [LayoutComponent, RouterModule.forRoot([])],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();
  });

  /**
   * Test — le composant se crée correctement.
   */
  it('should create', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  /**
   * Test — affiche l'année en cours dans le footer.
   */
  it('should display current year in footer', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const currentYear = new Date().getFullYear().toString();
    expect(compiled.textContent).toContain(currentYear);
  });
});