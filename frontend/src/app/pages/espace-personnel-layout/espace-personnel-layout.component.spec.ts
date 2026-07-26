import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { EspacePersonnelLayoutComponent } from './espace-personnel-layout.component';
import { AuthService } from '../../core/services/auth.service';

/**
 * Tests unitaires pour EspacePersonnelLayoutComponent.
 * Vérifie le layout de l'espace personnel avec sidebar.
 */
describe('EspacePersonnelLayoutComponent', () => {

  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      isAuthenticated: jest.fn().mockReturnValue(true),
      logout: jest.fn(),
      getToken: jest.fn(),
      storeToken: jest.fn(),
      getUserName: jest.fn().mockReturnValue('test'),
      getUserInitial: jest.fn().mockReturnValue('T'),
      getEmail: jest.fn(),
      setRedirectUrl: jest.fn(),
      getRedirectUrl: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [EspacePersonnelLayoutComponent, RouterModule.forRoot([])],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  /**
   * Test — le composant se crée correctement.
   */
  it('should create', () => {
    const fixture = TestBed.createComponent(EspacePersonnelLayoutComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  /**
   * Test — sidebarOpen est false par défaut.
   */
  it('should have sidebarOpen false by default', () => {
    const fixture = TestBed.createComponent(EspacePersonnelLayoutComponent);
    expect(fixture.componentInstance.sidebarOpen).toBe(false);
  });

  /**
   * Test — toggleSidebar ouvre la sidebar.
   */
  it('should open sidebar when toggleSidebar is called', () => {
    const fixture = TestBed.createComponent(EspacePersonnelLayoutComponent);
    fixture.componentInstance.toggleSidebar();
    expect(fixture.componentInstance.sidebarOpen).toBe(true);
  });

  /**
   * Test — closeSidebar ferme la sidebar.
   */
  it('should close sidebar when closeSidebar is called', () => {
    const fixture = TestBed.createComponent(EspacePersonnelLayoutComponent);
    fixture.componentInstance.sidebarOpen = true;
    fixture.componentInstance.closeSidebar();
    expect(fixture.componentInstance.sidebarOpen).toBe(false);
  });

  /**
   * Test — getUserName retourne le nom de l'utilisateur.
   */
  it('should return username from authService', () => {
    const fixture = TestBed.createComponent(EspacePersonnelLayoutComponent);
    expect(fixture.componentInstance.getUserName()).toBe('test');
  });

  /**
   * Test — getUserInitial retourne l'initiale.
   */
  it('should return user initial from authService', () => {
    const fixture = TestBed.createComponent(EspacePersonnelLayoutComponent);
    expect(fixture.componentInstance.getUserInitial()).toBe('T');
  });
});