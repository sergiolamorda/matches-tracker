import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "tests/e2e/tests/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "tests/e2e/support/e2e.ts",
    screenshotOnRunFailure: false,
    video: false,
    viewportWidth: 1920,
		viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
