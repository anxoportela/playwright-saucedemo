class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('input#user-name');
      this.passwordInput = page.locator('input#password');
      this.loginButton = page.locator('input#login-button');
    }

    // Navegar a la página de login
    async navigate() {
      await this.page.goto('https://www.saucedemo.com');
    }

    // Realizar login
    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }

    // Obtener mensaje de error
    async getErrorMessage() {
      return this.page.locator('h3[data-test="error"]');
    }
  }

  module.exports = LoginPage;