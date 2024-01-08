/// <reference types="cypress" />

describe('Testing page panel', () => {
  it('should create a oficios report and display success message', () => {
    cy.visit('/gate/panel')

    //cy.wait(3000)

    const autocompleteID = '#customer-selected';

    cy.get(autocompleteID).invoke('val').should('not.be.empty', { timeout: 5000 });

    cy.get(autocompleteID).invoke('val').then((valorDoInput) => {
      cy.log(`O valor do input é: ${valorDoInput}`);
    });

    cy.get(autocompleteID)
      .click()
      .focused()
      .wait(2000)
      .type('{selectall}{del}Oficios{downarrow}{enter}')
      
    cy.get(autocompleteID).should('include.value', 'Oficios');

    const report30Days = 'Relatório de controle e status - Últimos 30 dias';
    const report45Days = 'Relatório de controle e status - Últimos 45 dias';
    const report90Days = 'Relatório de controle e status - Últimos 90 dias';

    const messageSuccess = [
      'Recebida solicitação para criação de relatório.',
      'Em alguns instantes você receberá o link de acesso ao relatório em seu email.',
    ].join(' ')

    cy.contains(report30Days).should('exist').click();
    cy.contains(`${report30Days}: ${messageSuccess}`);
    cy.wait(500);

    cy.contains(report45Days).should('exist').click();
    cy.contains(`${report45Days}: ${messageSuccess}`);
    cy.wait(500);

    cy.contains(report90Days).should('exist').click();
    cy.contains(`${report90Days}: ${messageSuccess}`);
    cy.wait(500);
  })

  it('should check path to oficios dashboard', () => {
    cy.visit('/gate/panel')

    //cy.wait(3000)
    
    const autocompleteID = '#customer-selected';

    cy.get(autocompleteID).invoke('val').should('not.be.empty', { timeout: 5000 });

    cy.get(autocompleteID).invoke('val').then((valorDoInput) => {
      cy.log(`O valor do input é: ${valorDoInput}`);
    });

    cy.get(autocompleteID)
      .click()
      .focused()
      .wait(2000)
      .type('{selectall}{del}Oficios{downarrow}{enter}')

    cy.get(autocompleteID).should('include.value', 'Oficios');

    const dashboard = 'Dashboard';
    cy.contains(dashboard).should('exist').click();
    cy.url().should('include', '/gate/panel/dashboard/oficio/main');
  });
});
