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
const test = require('../fixtures/allureScreenshots');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const credentials = require('../test-data/credentials');

test.describe('Logout Tests', () => {
  test.beforeEach(async ({ page, attachScreenshot }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    
    await test.step('Logged in state', async () => {
      await attachScreenshot('Inventory Page');
    });
  });

  // TC-LOGOUT-001: Verify user can logout successfully
  test('TC-LOGOUT-001: Logout returns to login page', {
    annotation: { type: 'Smoke', description: 'Happy path logout' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    
    await test.step('Before logout', async () => {
      await attachScreenshot('Before Logout');
    });
    
    // Perform logout
    await test.step('Perform logout', async () => {
      await inventoryPage.logout();
      await attachScreenshot('After Logout');
    });
    
    // Verify we're back on login page
    await test.step('Verify login page', async () => {
      await expect(page).toHaveURL('https://www.saucedemo.com/');
      await expect(page.locator('[data-test="username"]')).toBeVisible();
      await attachScreenshot('Login Page Restored');
    });
  });

  // TC-LOGOUT-002: Verify after logout, user cannot access inventory directly
  test('TC-LOGOUT-002: Cannot access inventory after logout', {
    annotation: { type: 'Security', description: 'Access control test' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    
    await test.step('Perform logout', async () => {
      await inventoryPage.logout();
      await attachScreenshot('Logged Out');
    });
    
    // Try to navigate directly to inventory
    await test.step('Try direct navigation', async () => {
      await page.goto('https://www.saucedemo.com/inventory.html');
      await attachScreenshot('Redirected to Login');
    });
    
    // Should redirect to login or show error
    await test.step('Verify login required', async () => {
      await expect(page.locator('[data-test="username"]')).toBeVisible();
      await attachScreenshot('Access Blocked');
    });
  });

  // TC-LOGOUT-003: Verify re-login after logout works
  test('TC-LOGOUT-003: Can login again after logout', {
    annotation: { type: 'Feature', description: 'Re-authentication' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    const loginPage = new LoginPage(page);
    
    await test.step('Perform logout', async () => {
      await inventoryPage.logout();
      await attachScreenshot('Logged Out');
    });
    
    // Login again
    await test.step('Login again', async () => {
      await attachScreenshot('Before Re-login');
      await loginPage.login(credentials.validUser.username, credentials.validUser.password);
      await attachScreenshot('After Re-login');
    });
    
    // Verify we're on inventory page
    await test.step('Verify inventory page', async () => {
      await expect(page).toHaveURL('/inventory.html');
      await attachScreenshot('Re-login Success');
    });
  });
});
