/// <reference types="cypress" />

interface LoginProps {
  email: string;
  password: string;
}

declare namespace Cypress {
  interface Chainable {
    login(props: LoginProps): Chainable<void>;
    useSession(props: LoginProps): Chainable<void>;
    destroySession(): Chainable<void>;
    signOut(): Chainable<void>;
    Autocomplete(): Chainable<void>;
  }
}

// -- This is a parent command --
Cypress.Commands.add('login', ({ email = '', password = '' }: LoginProps) => {     
  cy.get('#email').click().type(email);
  cy.get('#password').click().type(password);
  cy.get('#loginForm').submit();
})

Cypress.Commands.add('destroySession', () => {     
  cy.getCookie('everest.refresh_token').then((cookie) => {
    const refreshToken = cookie?.value;

    if (refreshToken) {
      cy.visit('/gate/home'); 
      cy.url().should('include', '/gate/home', { timeout: 10000 });
      cy.contains('EVEREST').should('exist', { timeout: 10000 });
      cy.contains('Home').should('exist', { timeout: 10000 });
      cy.signOut();
    }

    cy.url().should('include', '/auth/login');
    Cypress.session.clearAllSavedSessions(); //clear all sessions
  });
})

Cypress.Commands.add('useSession', ({ email = '', password = '' }: LoginProps) => {
  cy.session(
    email,
    () => {
      Cypress.session.clearAllSavedSessions();
      cy.visit('/auth/login')
      cy.login({ email, password });
      cy.url().should('include', '/gate/home');
    },
    {
      validate: () => {
        cy.getCookie('everest.refresh_token').should('exist')
      },
    }
  )
})

Cypress.Commands.add('signOut', () => {
  cy.get('#signOutBtn').click();
  cy.url().should('include', '/auth/login');
})

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
