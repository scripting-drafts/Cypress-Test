describe('Vueling Test', () => {
beforeEach(() => {
    cy.intercept('GET', 'https://cars.vueling.com/').as('startPage');
    cy.visit('https://cars.vueling.com/')
    cy.wait('@startPage').its('response.statusCode').should('eq', 200);
    cy.url().should('include', 'https://cars.vueling.com/');
  });

it('Tests the Vueling tickets site', () => {
    //cy.contains('type').click()
    //cy.url().should('include', '/commands/actions')
    })

afterEach(() => {
    cy.clearCookies()
    cy.log('Test completed');
  });

})