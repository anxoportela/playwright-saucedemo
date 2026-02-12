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
