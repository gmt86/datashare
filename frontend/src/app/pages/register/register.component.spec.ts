import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

/**
 * Tests unitaires pour RegisterComponent.
 * Vérifie le formulaire d'inscription.
 */
describe('RegisterComponent', () => {

  let mockAuthService: jest.Mocked<AuthService>;
  let mockUserService: jest.Mocked<UserService>;

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

    mockUserService = {
      login: jest.fn(),
      register: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterModule.forRoot([]), HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();
  });

  /**
   * Test — le composant se crée correctement.
   */
  it('should create', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  /**
   * Test — le formulaire est invalide si vide.
   */
  it('should have invalid form when empty', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.registerForm.invalid).toBe(true);
  });

  /**
   * Test — erreur si les mots de passe ne correspondent pas.
   */
  it('should have passwordMismatch error when passwords differ', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.registerForm.setValue({
      email: 'test@datashare.com',
      password: 'password123',
      confirmPassword: 'different123'
    });
    expect(fixture.componentInstance.registerForm.errors?.['passwordMismatch']).toBeTruthy();
  });

  /**
   * Test — formulaire valide si mots de passe identiques.
   */
  it('should have valid form when passwords match', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.registerForm.setValue({
      email: 'test@datashare.com',
      password: 'password123',
      confirmPassword: 'password123'
    });
    expect(fixture.componentInstance.registerForm.valid).toBe(true);
  });
});