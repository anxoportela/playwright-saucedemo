const test = require('../fixtures/allureScreenshots');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const credentials = require('../test-data/credentials');

/**
 * Helper function to create and return login page
 */
function createLoginPage(page) {
  return new LoginPage(page);
}

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page, attachScreenshot }) => {
    const loginPage = createLoginPage(page);
    await loginPage.navigate();
    await test.step('Screenshot on login page', async () => {
      await attachScreenshot('Login Page');
    });
  });

  // TC-LOGIN-001: Login with valid credentials
  test('TC-LOGIN-001: Login with valid credentials', {
    annotation: { type: 'Smoke', description: 'Critical happy path test' },
  }, async ({ page, attachScreenshot }) => {
    const loginPage = createLoginPage(page);

    await test.step('Enter valid credentials and login', async () => {
      await attachScreenshot('Before Login');
      await loginPage.login(credentials.validUser.username, credentials.validUser.password);
      await attachScreenshot('After Login');
    });

    // Verify user is redirected to inventory page
    await test.step('Verify navigation to inventory page', async () => {
      await expect(page).toHaveURL('/inventory.html');
      await attachScreenshot('Inventory Page');
    });
  });

  // TC-LOGIN-002: Login with invalid credentials
  test('TC-LOGIN-002: Login with invalid credentials', {
    annotation: { type: 'Negative', description: 'Tests error handling' },
  }, async ({ page, attachScreenshot }) => {
    const loginPage = createLoginPage(page);

    await test.step('Enter invalid credentials', async () => {
      await attachScreenshot('Before Login Attempt');
      await loginPage.login(credentials.invalidCredentials.username, credentials.invalidCredentials.password);
      await attachScreenshot('After Failed Login');
    });

    // Verify error message is displayed
    await test.step('Verify error message', async () => {
      await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
      await attachScreenshot('Error Message Displayed');
    });
  });

  // TC-LOGIN-003: Login with empty username
  test('TC-LOGIN-003: Login with empty username', {
    annotation: { type: 'Negative', description: 'Tests validation' },
  }, async ({ page, attachScreenshot }) => {
    const loginPage = createLoginPage(page);

    await test.step('Enter empty username', async () => {
      await attachScreenshot('Before Login');
      await loginPage.login(credentials.emptyUsername.username, credentials.emptyUsername.password);
      await attachScreenshot('After Empty Username Submit');
    });

    // Verify error message is displayed
    await test.step('Verify username error', async () => {
      await loginPage.expectErrorMessage('Epic sadface: Username is required');
      await attachScreenshot('Username Error');
    });
  });

  // TC-LOGIN-004: Login with empty password
  test('TC-LOGIN-004: Login with empty password', {
    annotation: { type: 'Negative', description: 'Tests validation' },
  }, async ({ page, attachScreenshot }) => {
    const loginPage = createLoginPage(page);

    await test.step('Enter empty password', async () => {
      await attachScreenshot('Before Login');
      await loginPage.login(credentials.emptyPassword.username, credentials.emptyPassword.password);
      await attachScreenshot('After Empty Password Submit');
    });

    // Verify error message is displayed
    await test.step('Verify password error', async () => {
      await loginPage.expectErrorMessage('Epic sadface: Password is required');
      await attachScreenshot('Password Error');
    });
  });
});
