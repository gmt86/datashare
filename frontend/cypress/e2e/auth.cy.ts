/**
 * Tests E2E — Authentification
 * Vérifie le flux d'inscription et de connexion.
 */
describe('Authentification', () => {

  const email = `test${Date.now()}@datashare.com`;
  const password = 'password123';

  /**
   * Test — inscription d'un nouvel utilisateur.
   */
  it('should register a new user', () => {
    cy.visit('/register');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#confirmPassword').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');
  });

  /**
 * Test — échec inscription si mot de passe vide.
 */
  it('should show validation error on empty password', () => {
    cy.visit('/register');
    cy.get('#email').type(email);   
    cy.get('button[type="submit"]').click();
    cy.get('.invalid-feedback').should('be.visible');
  });
  /**
   * Test — connexion avec les credentials créés.
   */
  it('should login with valid credentials', () => {
    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();   
    cy.url().should('include', '/home');
  });

  /**
   * Test — connexion échouée avec mauvais mot de passe.
   */
  it('should show error on invalid login', () => {
    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('.error-callout').should('be.visible');    
  });

  /**
   * Test — redirection vers login si non connecté.
   */
  it('should redirect to login when accessing protected route', () => {
    cy.visit('/espace-personnel');
    cy.url().should('include', '/login');
  });
});