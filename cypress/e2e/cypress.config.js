import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://tickets.vueling.com/',
    chromeWebSecurity: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners
    },
  },
  
  viewportWidth: 430,
  viewportHeight: 932,
  retries: {
    runMode: 2, // Retries when running `cypress run`
    openMode: 0, // No retries in interactive mode
  },
  video: true,
  screenshotOnRunFailure: true,
});