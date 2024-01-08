import { defineConfig } from "cypress";
import env from './cypress.env.json'

export default defineConfig({
  e2e: {
    baseUrl: env.CYPRESS_BASE_URL,
    supportFile: 'cypress/support/index.ts',
    setupNodeEvents(on, config) {
      console.log(config.env)
    },
  },
});