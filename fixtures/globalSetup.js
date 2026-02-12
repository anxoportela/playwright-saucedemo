/**
 * MIT License
 * Copyright (c) 2024 Anxo Portela-Insua Blanco
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
