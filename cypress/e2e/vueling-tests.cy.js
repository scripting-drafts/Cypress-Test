describe('Vueling Cars - Rate Verification Using Fixture Data', () => {
  let testData;
  
  before(() => {
    cy.fixture('vuelingData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.intercept('GET', 'https://cars.vueling.com/').as('startPage');
    cy.visit('https://cars.vueling.com/')
    cy.wait('@startPage').its('response.statusCode').should('eq', 200);
    cy.url().should('include', 'https://cars.vueling.com/');

    it('let me debug when the debugger command executes', () => {
    cy.get('[data-testid="selector-in-question"]').then(($selectedElement) => {
      // Debugger is hit after the cy.visit
      // and cy.get commands have completed
      debugger
      })
    })
    
    
    // Pickup location
    cy.get('input[name="pickupLocation"]')
    .type(testData.pickupLocation)
    .wait(1000)
    .type('{downarrow}')
    .type('{enter}')
    .wait(500);

    // Pickup date
    cy.get('#pickupDate').click()
    cy.get('#day-20250621 > span:nth-child(1)').click()
    cy.get('.ct-timepicker-custom-opened > ul:nth-child(2) > li:nth-child(21) > a:nth-child(1)').click();

    // Return date
    cy.get('#returnDate').click()
    cy.get('#day-20250721 > span:nth-child(1)').click()
    cy.get('.ct-timepicker-custom-opened > ul:nth-child(2) > li:nth-child(21) > a:nth-child(1)').click();
    
    // Age
    cy.get('#ct-compact-age-type').click()
    cy.get('div.ct-select-dropdown__radio-button-group:nth-child(1) > label:nth-child(2)').click();

    

    // Search
    // cy.intercept('POST', '**/carsearch').as('carSearch');
    cy.get('#searchCarsFormBtn-searchcars').click();

    cy.request({
      url: 'https://cars.vueling.com/',
      followRedirect: false
    }).then((response) => {
      expect(response.status).to.eq(302); // or 301
      cy.log('Redirect location:', response.headers.location);
    });
    cy.wait(10000)
    
    
    // cy.wait('@carSearch').its('response.statusCode').should('eq', 200);

    cy.wait(10000)
    // cy.wait('ct-loading-bar')

    // Validate user info
    // cy.get('div.ct-margin-bottom:nth-child(1) > div:nth-child(2) > p:nth-child(2) > strong:nth-child(1)').should('contain', testData.pickupLocation)
    // cy.get('div.ct-margin-bottom:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1) > strong:nth-child(1)').should('contain', '21 Jun 2025')
    // cy.get('div.ct-readonly-location:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1) > strong:nth-child(1)').should('contain', '23 Jun 2025')
    
    // Select SUV
    // cy.get('div.ct-car-list-item__wrap:nth-child(6) > ct-vehicle-block:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > ct-vehicle-block-buttons:nth-child(3) > div:nth-child(1) > button:nth-child(1)').click()
    
});



  it('Case 1: Select Basic Rate and verify on Driver Info page', () => {
    cy.selectRate(testData.insurance[0]); // Basic
    cy.wait(5000)
  });

  

  it('Case 2: Select Premium Rate and verify on Driver Info page', () => {
    cy.wait(5000)
    cy.selectRate(testData.insurance[1]); // Premium
  });
});

afterEach(() => {
    cy.clearCookies()
});

after(() => {
    console.log('Test Complete')
});
