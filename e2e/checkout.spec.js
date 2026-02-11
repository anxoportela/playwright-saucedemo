const test = require('../fixtures/allureScreenshots');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');
const credentials = require('../test-data/credentials');
const checkoutInfo = require('../test-data/products');

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page, attachScreenshot }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    
    // Add product to cart and go to checkout
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(0);
    await inventoryPage.openCart();
    
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    
    await test.step('Checkout Step One Loaded', async () => {
      await attachScreenshot('Checkout Page');
    });
  });

  // TC-CHECKOUT-001: Complete checkout with valid information
  test('TC-CHECKOUT-001: Complete checkout successfully', {
    annotation: { type: 'Smoke', description: 'Happy path checkout' },
  }, async ({ page, attachScreenshot }) => {
    const checkoutPage = new CheckoutPage(page);
    
    // Fill checkout information
    await test.step('Fill checkout information', async () => {
      await attachScreenshot('Before Fill Info');
      await checkoutPage.fillInformation(
        checkoutInfo.checkoutInfo.valid.firstName,
        checkoutInfo.checkoutInfo.valid.lastName,
        checkoutInfo.checkoutInfo.valid.postalCode
      );
      await attachScreenshot('After Fill Info');
    });
    
    // Continue to checkout step two
    await test.step('Continue to step two', async () => {
      await checkoutPage.continue();
      await attachScreenshot('Checkout Step Two');
    });
    
    // Verify we're on step two
    await test.step('Verify step two', async () => {
      await checkoutPage.verifyOnStepTwo();
      await attachScreenshot('Summary Verified');
    });
    
    // Finish checkout
    await test.step('Finish checkout', async () => {
      await checkoutPage.finish();
      await attachScreenshot('Checkout Complete');
    });
    
    // Verify checkout is complete
    await test.step('Verify completion', async () => {
      await checkoutPage.verifyOnCompletePage();
      await attachScreenshot('Success Page');
    });
  });

  // TC-CHECKOUT-002: Verify checkout step one requires all fields
  test('TC-CHECKOUT-002: Error when first name is empty', {
    annotation: { type: 'Negative', description: 'Validation test' },
  }, async ({ page, attachScreenshot }) => {
    const checkoutPage = new CheckoutPage(page);
    
    // Try to continue without first name
    await test.step('Fill info without first name', async () => {
      await attachScreenshot('Before Fill');
      await checkoutPage.fillInformation(
        checkoutInfo.checkoutInfo.emptyFirstName.firstName,
        checkoutInfo.checkoutInfo.emptyFirstName.lastName,
        checkoutInfo.checkoutInfo.emptyFirstName.postalCode
      );
      await attachScreenshot('Info Filled');
    });
    
    await test.step('Continue and check error', async () => {
      await checkoutPage.continue();
      await attachScreenshot('Error Message');
    });
    
    // Verify error message is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText('Error: First Name is required');
  });

  // TC-CHECKOUT-003: Error when last name is empty
  test('TC-CHECKOUT-003: Error when last name is empty', {
    annotation: { type: 'Negative', description: 'Validation test' },
  }, async ({ page, attachScreenshot }) => {
    const checkoutPage = new CheckoutPage(page);
    
    // Try to continue without last name
    await test.step('Fill info without last name', async () => {
      await attachScreenshot('Before Fill');
      await checkoutPage.fillInformation(
        checkoutInfo.checkoutInfo.emptyLastName.firstName,
        checkoutInfo.checkoutInfo.emptyLastName.lastName,
        checkoutInfo.checkoutInfo.emptyLastName.postalCode
      );
      await attachScreenshot('Info Filled');
    });
    
    await test.step('Continue and check error', async () => {
      await checkoutPage.continue();
      await attachScreenshot('Error Message');
    });
    
    // Verify error message is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText('Error: Last Name is required');
  });

  // TC-CHECKOUT-004: Error when postal code is empty
  test('TC-CHECKOUT-004: Error when postal code is empty', {
    annotation: { type: 'Negative', description: 'Validation test' },
  }, async ({ page, attachScreenshot }) => {
    const checkoutPage = new CheckoutPage(page);
    
    // Try to continue without postal code
    await test.step('Fill info without postal code', async () => {
      await attachScreenshot('Before Fill');
      await checkoutPage.fillInformation(
        checkoutInfo.checkoutInfo.emptyPostalCode.firstName,
        checkoutInfo.checkoutInfo.emptyPostalCode.lastName,
        checkoutInfo.checkoutInfo.emptyPostalCode.postalCode
      );
      await attachScreenshot('Info Filled');
    });
    
    await test.step('Continue and check error', async () => {
      await checkoutPage.continue();
      await attachScreenshot('Error Message');
    });
    
    // Verify error message is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText('Error: Postal Code is required');
  });

  // TC-CHECKOUT-005: Cancel checkout returns to cart
  test('TC-CHECKOUT-005: Cancel checkout returns to cart', {
    annotation: { type: 'Feature', description: 'Navigation' },
  }, async ({ page, attachScreenshot }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await test.step('Before cancel', async () => {
      await attachScreenshot('Checkout Step One');
    });
    
    // Cancel checkout
    await test.step('Cancel checkout', async () => {
      await checkoutPage.cancel();
      await attachScreenshot('Back to Cart');
    });
    
    // Verify we're back on cart page
    await test.step('Verify cart page', async () => {
      await expect(page).toHaveURL(/cart.html/);
    });
  });

  // TC-CHECKOUT-006: Checkout summary displays correct information
  test('TC-CHECKOUT-006: Checkout summary is displayed correctly', {
    annotation: { type: 'Feature', description: 'Summary verification' },
  }, async ({ page, attachScreenshot }) => {
    const checkoutPage = new CheckoutPage(page);
    
    // Fill checkout information
    await test.step('Fill checkout info', async () => {
      await attachScreenshot('Before Fill');
      await checkoutPage.fillInformation(
        checkoutInfo.checkoutInfo.valid.firstName,
        checkoutInfo.checkoutInfo.valid.lastName,
        checkoutInfo.checkoutInfo.valid.postalCode
      );
      await attachScreenshot('After Fill');
    });
    
    // Continue to checkout step two
    await test.step('Continue to step two', async () => {
      await checkoutPage.continue();
      await attachScreenshot('Checkout Summary');
    });
    
    // Verify summary is displayed
    await test.step('Verify summary', async () => {
      await checkoutPage.verifyOnStepTwo();
      await attachScreenshot('Summary Verified');
    });
  });
});
