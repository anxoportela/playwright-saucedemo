const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[data-test="username"]');
    this.passwordInput = page.locator('input[data-test="password"]');
    this.loginButton = page.locator('input[data-test="login-button"]');
    this.errorMessage = page.locator('h3[data-test="error"]');
  }

  // Login page URL
  static URL = 'https://www.saucedemo.com';

  // Navigate to the login page
  async navigate() {
    await this.page.goto(LoginPage.URL);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Perform login with username and password
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Get the error message element
  async getErrorMessage() {
    return this.errorMessage;
  }

  // Verify that the error message contains the expected text
  async expectErrorMessage(text) {
    await expect(this.errorMessage).toHaveText(text);
  }
}

module.exports = LoginPage;
