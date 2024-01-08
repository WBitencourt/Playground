/// <reference types="cypress" />

describe('Testing page tab home', () => {
  it('should be check if it is in page home', () => {
    cy.visit('/gate/home')
    cy.contains('EVEREST').should('exist');
    cy.contains('Home').should('exist');
  })
});

describe('Testing toggle drawer menu', () => {
  it('should be open and close ', () => {
    cy.visit('/gate/home')
    cy.contains('EVEREST').should('exist');
    cy.contains('Home').should('exist');
  })
});

