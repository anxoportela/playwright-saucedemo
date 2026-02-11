/**
 * Global setup file for Playwright tests.
 * This file runs once before all tests.
 * 
 * Use this file for:
 * - Setting up test environment
 * - Installing dependencies
 * - Starting services
 * - Configuring global settings
 */

const { chromium } = require('@playwright/test');

/**
 * Global setup function
 * @param {import('@playwright/test').FullConfig} config
 */
async function globalSetup(config) {
  console.log('🔧 Starting global setup...');
  
  // Example: Check if browsers are installed
  console.log('✅ Global setup completed!');
}

/**
 * Authentication setup function
 * Creates a storage state file for authentication
 * This allows tests to skip login steps
 */
async function saveAuthenticationState() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to login page
  await page.goto('https://www.saucedemo.com');
  
  // Fill in login credentials
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  
  // Click login button
  await page.click('[data-test="login-button"]');
  
  // Wait for navigation to inventory page
  await page.waitForURL('**/inventory.html');
  
  // Save storage state
  await context.storageState({ path: 'test-data/auth.json' });
  
  await browser.close();
  console.log('✅ Authentication state saved to test-data/auth.json');
}

module.exports = {
  globalSetup,
  saveAuthenticationState,
};
