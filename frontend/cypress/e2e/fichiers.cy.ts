/**
 * Tests E2E — Gestion des fichiers
 * Vérifie le flux upload, téléchargement et suppression.
 */
describe('Gestion des fichiers', () => {

  const email = `test${Date.now()}@datashare.com`;
  const password = 'password123';
  let authToken: string;
  let tokenTelechargement: string;
  const TIME_OUT = { timeout: 15000 };

   before(() => {
  // Étape 1 — Inscription
  cy.visit('/register');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#confirmPassword').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/login');

  // Étape 2 — Connexion pour obtenir le token
  cy.visit('/login');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/home');

  // Étape 3 — Sauvegarde le token
  cy.window().its('localStorage').invoke('getItem', 'auth_token').then((token) => {
    authToken = token || '';
    cy.log('Token sauvegardé:', authToken);
  });
});


beforeEach(() => {
  cy.window().then((win) => {
    win.localStorage.setItem('auth_token', authToken);
  });
});



 /**
   * Test — upload d'un fichier avec succès.
   */
it('should upload a file successfully', () => {
    // Intercepte la requête upload
  cy.intercept('POST', '/api/fichiers').as('uploadFichier');
  cy.visit('/home', {
    onBeforeLoad(win) {
      win.localStorage.setItem('auth_token', authToken);
    }
  });

  cy.get('.btn-upload').click();
//   cy.wait(500);
  cy.get('#fichier').selectFile('cypress/fixtures/example.json', { force: true });
  cy.get('select[formControlName="dateExpiration"]').select('7');
  cy.get('button[type="submit"]').click();

  cy.wait('@uploadFichier').then((interception) => {
    // Sauvegarde le token de téléchargement
    tokenTelechargement = interception.response?.body?.tokenTelechargement;
    cy.log('Token téléchargement:', tokenTelechargement);
  });

  cy.get('.success-message', TIME_OUT).should('be.visible');
});

 
  /**
   * Test — affichage des fichiers dans l'espace personnel.
   */
  it('should show fichiers in espace personnel', () => {
    cy.visit('/espace-personnel', {
    onBeforeLoad(win) {
      win.localStorage.setItem('auth_token', authToken);
    }
  });
    cy.get('.fichier-item', TIME_OUT).should('have.length.greaterThan', 0);
  });

  /**
   * Test — filtrage des fichiers par statut.
   */
  it('should filter fichiers', () => {
    cy.visit('/espace-personnel', {
    onBeforeLoad(win) {
      win.localStorage.setItem('auth_token', authToken);
    }
  });
    cy.get('.filter-switch', TIME_OUT).should('be.visible');
    cy.contains('Actifs').click();
    cy.get('.filter-switch button.active').should('contain', 'Actifs');
  });

  

  /**
 * Test — consultation des détails d'un fichier via token.
 */
it('should show fichier details via token', () => {
  cy.visit(`/download/${tokenTelechargement}`, {
    onBeforeLoad(win) {
      win.localStorage.setItem('auth_token', authToken);
    }
  });
  // Vérifier le titre
  cy.get('h2', TIME_OUT).should('contain', 'Télécharger un fichier');
  // Vérifier le nom du fichier
  cy.get('.file-info', TIME_OUT).should('contain', 'example.json');
  // Vérifier la taille du fichier
  cy.get('.file-size', TIME_OUT).should('be.visible');
  // Vérifier la date d'expiration
  cy.get('.info-callout', TIME_OUT).should('contain', 'expire');  
});


    
/**
 * Test — téléchargement d'un fichier via lien.
 */
it('should download a fichier via token', () => {
  cy.intercept('POST', `/api/fichiers/${tokenTelechargement}/download`).as('downloadFichier');
  cy.visit(`/download/${tokenTelechargement}`, {
    onBeforeLoad(win) {
      win.localStorage.setItem('auth_token', authToken);
    }
  });
  cy.get('button').contains('Télécharger').click();
  cy.wait('@downloadFichier').then((interception) => {
    expect(interception.response?.statusCode).to.equal(200);
  });
});


/**
 * Test — suppression d'un fichier et vérification de sa disparition.
 */
it('should delete a fichier', () => {
  cy.visit('/espace-personnel', {
    onBeforeLoad(win) {
      win.localStorage.setItem('auth_token', authToken);
    }
  });
  // Compte le nombre de fichiers avant suppression
  cy.get('.fichier-item', TIME_OUT).then((items) => {
    const countBefore = items.length;
    // Supprime le premier fichier
    cy.get('.fichier-item').first().within(() => {
      cy.get('.btn-danger').click();
    });
    // Vérifie que le nombre de fichiers a diminué
    cy.get('.fichier-item', TIME_OUT).should('have.length', countBefore - 1);
  });
});

});