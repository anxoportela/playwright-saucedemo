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
const CartPage = require('../pages/cartPage');
const credentials = require('../test-data/credentials');
const products = require('../test-data/products');

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ page, attachScreenshot }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    
    // Add products to cart for testing
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(0); // Add first product
    await inventoryPage.addProductToCart(1); // Add second product
    
    await test.step('Products added to cart', async () => {
      await attachScreenshot('Cart with 2 Items');
    });
  });

  // TC-CART-001: Verify cart page displays added items
  test('TC-CART-001: Cart displays added items correctly', {
    annotation: { type: 'Smoke', description: 'Verify cart contents' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    await test.step('Navigate to cart', async () => {
      await inventoryPage.openCart();
      await attachScreenshot('Cart Page Loaded');
    });
    
    // Verify cart has 2 items
    await test.step('Verify cart item count', async () => {
      await cartPage.verifyCartHasItems(2);
      await attachScreenshot('Cart Count Verified');
    });
    
    // Verify product names match
    await test.step('Verify product names', async () => {
      const cartItemNames = await cartPage.getCartItemNames();
      expect(cartItemNames).toContain(products.products[0].name);
      expect(cartItemNames).toContain(products.products[1].name);
      await attachScreenshot('Products Verified');
    });
  });

  // TC-CART-002: Remove item from cart
  test('TC-CART-002: Remove item from cart', {
    annotation: { type: 'Feature', description: 'Cart item management' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    await test.step('Navigate to cart', async () => {
      await inventoryPage.openCart();
      await attachScreenshot('Cart Before Remove');
    });
    
    // Remove first item
    await test.step('Remove first item', async () => {
      await cartPage.removeItem(0);
      await attachScreenshot('After Remove Item');
    });
    
    // Verify cart has 1 item
    await test.step('Verify remaining item', async () => {
      await cartPage.verifyCartHasItems(1);
      await attachScreenshot('Cart Verified');
    });
  });

  // TC-CART-003: Continue shopping returns to inventory
  test('TC-CART-003: Continue shopping returns to inventory page', {
    annotation: { type: 'Feature', description: 'Navigation' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    await test.step('Navigate to cart', async () => {
      await inventoryPage.openCart();
      await attachScreenshot('Cart Page');
    });
    
    // Click continue shopping
    await test.step('Click continue shopping', async () => {
      await cartPage.continueShopping();
      await attachScreenshot('Back to Inventory');
    });
    
    // Verify we're back on inventory page
    await test.step('Verify inventory page', async () => {
      await inventoryPage.verifyOnInventoryPage();
      await attachScreenshot('Inventory Page Verified');
    });
  });

  // TC-CART-004: Proceed to checkout
  test('TC-CART-004: Proceed to checkout', {
    annotation: { type: 'Smoke', description: 'Checkout flow' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    await test.step('Navigate to cart', async () => {
      await inventoryPage.openCart();
      await attachScreenshot('Cart Before Checkout');
    });
    
    // Proceed to checkout
    await test.step('Click checkout', async () => {
      await cartPage.proceedToCheckout();
      await attachScreenshot('Checkout Step One');
    });
    
    // Verify we're on checkout step one
    await test.step('Verify checkout page', async () => {
      await expect(page).toHaveURL(/checkout-step-one/);
      await attachScreenshot('Checkout Verified');
    });
  });

  // TC-CART-005: Cart badge updates correctly
  test('TC-CART-005: Cart badge shows correct count', {
    annotation: { type: 'Feature', description: 'Cart badge' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    
    await test.step('Verify cart badge', async () => {
      const badgeCount = await inventoryPage.getCartBadgeCount();
      expect(badgeCount).toBe(2);
      await attachScreenshot('Cart Badge Count');
    });
  });
});
