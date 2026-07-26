import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

/**
 * Tests unitaires pour LoginComponent.
 * Vérifie le formulaire de connexion.
 */
describe('LoginComponent', () => {

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
      imports: [LoginComponent, RouterModule.forRoot([]), HttpClientTestingModule],
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
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  /**
   * Test — le formulaire est invalide si vide.
   */
  it('should have invalid form when empty', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.loginForm.invalid).toBe(true);
  });

  /**
   * Test — le formulaire est valide avec email et password.
   */
  it('should have valid form when email and password provided', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.loginForm.setValue({
      email: 'test@datashare.com',
      password: 'password123'
    });
    expect(fixture.componentInstance.loginForm.valid).toBe(true);
  });
});