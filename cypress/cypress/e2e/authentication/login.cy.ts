/// <reference types="cypress" />

import { credentials } from '../../env';

const email = credentials.email;
const password = credentials.password;
/// <reference types="cypress" />

beforeEach(() => {
  Cypress.session.clearCurrentSessionData();
  cy.visit('/auth/login');
});

describe('User authentication', () => {
  it('should be able to authenticate user', () => {
    cy.url().should('include', '/auth/login');

    cy.login({ email, password });

    cy.url().should('include', '/gate/home');

    //logout is doing globally
  });

  it('should not be able to authenticate user with wrong password', () => {
    cy.login({ 
      email, 
      password: 'WrongPassword' 
    })

    cy.url().should('include', '/auth/login');
    cy.contains('Usuário ou senha inválidos').should('exist');
  })

  it('should not be able to authenticate user without password', () => {
    cy.get('#email').click().type(email);
  
    cy.get('#loginForm').submit();

    cy.url().should('include', '/auth/login');
    cy.contains('Senha obrigatória').should('exist');
  })

  it('should not be able to authenticate user without e-mail', () => {
    cy.get('#password').click().type(password);
  
    cy.get('#loginForm').submit();

    cy.url().should('include', '/auth/login');
    cy.contains('E-mail obrigatório').should('exist');
  })
})
