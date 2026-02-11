const { baseTest } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');
const credentials = require('../test-data/credentials');

/**
 * Custom test fixtures for the Playwright project.
 * These fixtures provide pre-configured page objects and helper methods.
 */
const test = baseTest.extend({
  /**
   * Create a logged-in page fixture
   * Automatically logs in the user before each test
   */
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await use(page);
  },

  /**
   * Create a LoginPage fixture
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Create an InventoryPage fixture
   */
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  /**
   * Create a CartPage fixture
   */
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  /**
   * Create a CheckoutPage fixture
   */
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  /**
   * Create a fully authenticated user fixture
   * Navigates to inventory page and returns the page
   */
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await use(page);
  },

  /**
   * Create a fixture with items in cart
   * Logs in, adds items to cart, and returns the page
   */
  pageWithCartItems: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    await loginPage.navigate();
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    
    // Add items to cart
    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);
    
    await use(page);
  },

  /**
   * Create a fixture ready for checkout
   * Logs in, adds items, and navigates to checkout step one
   */
  pageReadyForCheckout: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    await loginPage.navigate();
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    
    await inventoryPage.addProductToCart(0);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    
    await use(page);
  },
});

module.exports = { test };
