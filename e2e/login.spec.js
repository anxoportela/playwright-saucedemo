const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

// Caso 1: Login con credenciales válidas
test('Login con credenciales válidas', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // Verificar que el usuario fue redirigido a la página principal
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// Caso 2: Login con credenciales inválidas
test('Login con credenciales inválidas', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'incorrect_password');

  // Verificar que aparece el mensaje de error
  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

// Caso 3: Login con usuario vacío
test('Login con usuario vacío', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('', 'secret_sauce');

  // Verificar que aparece el mensaje de error
  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toHaveText('Epic sadface: Username is required');
});

// Caso 4: Login con contraseña vacía
test('Login con contraseña vacía', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', '');

  // Verificar que aparece el mensaje de error
  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toHaveText('Epic sadface: Password is required');
});