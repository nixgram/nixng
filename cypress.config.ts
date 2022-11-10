import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
  projectId: "djwh1w",
  "component": {
    "devServer": {
      "framework": "angular",
      "bundler": "webpack"
    },
    "specPattern": "**/*.cy.ts"
  }
})