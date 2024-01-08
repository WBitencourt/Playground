
describe('Testing page dashboard', () => {
  it('should check titles and if is is showing data on the oficio dashboard page', () => {
    cy.visit('/gate/panel/dashboard/oficio/main')

    cy.contains('Dashboard de ofícios').should('exist');
    cy.contains('Ofícios entrantes').should('exist');
    cy.contains('Ofícios finalizados').should('exist');
    cy.contains('Entrevistas Guiadas Oito').should('exist');
    cy.contains('Entrevistas Guiadas Cliente').should('exist');
    cy.contains('Relacionamento Positivo').should('exist');
    cy.contains('Relacionamento Negativo').should('exist');
  });
});