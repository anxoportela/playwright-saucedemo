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

test.describe('Inventory Page Tests', () => {
  test.beforeEach(async ({ page, attachScreenshot }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await test.step('Screenshot after login', async () => {
      await attachScreenshot('Logged In - Inventory Page');
    });
  });

  // TC-INV-001: Verify all products are displayed
  test('TC-INV-001: Verify all products are displayed', {
    annotation: { type: 'Smoke', description: 'Verify product listing' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    
    await test.step('Verify inventory page loaded', async () => {
      await inventoryPage.verifyOnInventoryPage();
      await attachScreenshot('Inventory Page Loaded');
    });
    
    await test.step('Verify product count', async () => {
      await inventoryPage.verifyProductCount(6);
      await attachScreenshot('Products Verified');
    });
  });

  // TC-INV-002: Verify products can be sorted by name (A to Z)
  test('TC-INV-002: Sort products by name A to Z', {
    annotation: { type: 'Feature', description: 'Product sorting' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    
    await test.step('Before sorting', async () => {
      await attachScreenshot('Before Sort A-Z');
    });
    
    // Sort by name (A to Z)
    await test.step('Apply A-Z sort', async () => {
      await inventoryPage.sortProducts('az');
      await attachScreenshot('After Sort A-Z');
    });
    
    // Get product names after sorting
    const productsAfter = await inventoryPage.getProductNames();
    
    // Verify products are sorted alphabetically
    const sortedProducts = [...productsAfter].sort();
    await test.step('Verify alphabetical order', async () => {
      expect(productsAfter).toEqual(sortedProducts);
      await attachScreenshot('Verified Sorted');
    });
  });

  // TC-INV-003: Verify products can be sorted by name (Z to A)
  test('TC-INV-003: Sort products by name Z to A', {
    annotation: { type: 'Feature', description: 'Product sorting' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    
    await test.step('Before sorting', async () => {
      await attachScreenshot('Before Sort Z-A');
    });
    
    // Sort by name (Z to A)
    await test.step('Apply Z-A sort', async () => {
      await inventoryPage.sortProducts('za');
      await attachScreenshot('After Sort Z-A');
    });
    
    // Get product names after sorting
    const productsAfter = await inventoryPage.getProductNames();
    
    // Verify products are sorted in reverse alphabetical order
    const sortedProducts = [...productsAfter].sort().reverse();
    await test.step('Verify reverse alphabetical order', async () => {
      expect(productsAfter).toEqual(sortedProducts);
      await attachScreenshot('Verified Sorted');
    });
  });

  // TC-INV-004: Verify products can be sorted by price (low to high)
  test('TC-INV-004: Sort products by price low to high', {
    annotation: { type: 'Feature', description: 'Price sorting' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    
    await test.step('Before sorting', async () => {
      await attachScreenshot('Before Sort Low to High');
    });
    
    // Sort by price (low to high)
    await test.step('Apply price low to high sort', async () => {
      await inventoryPage.sortProducts('lohi');
      await attachScreenshot('After Sort Low to High');
    });
    
    // Get prices after sorting
    const pricesAfter = await inventoryPage.getProductPrices();
    
    // Verify prices are sorted ascending
    const sortedPrices = [...pricesAfter].sort((a, b) => a - b);
    await test.step('Verify ascending price order', async () => {
      expect(pricesAfter).toEqual(sortedPrices);
      await attachScreenshot('Verified Price Order');
    });
  });

  // TC-INV-005: Verify products can be sorted by price (high to low)
  test('TC-INV-005: Sort products by price high to low', {
    annotation: { type: 'Feature', description: 'Price sorting' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    
    await test.step('Before sorting', async () => {
      await attachScreenshot('Before Sort High to Low');
    });
    
    // Sort by price (high to low)
    await test.step('Apply price high to low sort', async () => {
      await inventoryPage.sortProducts('hilo');
      await attachScreenshot('After Sort High to Low');
    });
    
    // Get prices after sorting
    const pricesAfter = await inventoryPage.getProductPrices();
    
    // Verify prices are sorted descending
    const sortedPrices = [...pricesAfter].sort((a, b) => b - a);
    await test.step('Verify descending price order', async () => {
      expect(pricesAfter).toEqual(sortedPrices);
      await attachScreenshot('Verified Price Order');
    });
  });

  // TC-INV-006: Add single product to cart
  test('TC-INV-006: Add single product to cart', {
    annotation: { type: 'Smoke', description: 'Cart functionality' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    
    await test.step('Before adding product', async () => {
      await attachScreenshot('Before Add to Cart');
    });
    
    // Add first product to cart
    await test.step('Add product to cart', async () => {
      await inventoryPage.addProductToCart(0);
      await attachScreenshot('After Add to Cart');
    });
    
    // Verify cart badge shows 1
    await test.step('Verify cart badge', async () => {
      const badgeCount = await inventoryPage.getCartBadgeCount();
      expect(badgeCount).toBe(1);
      await attachScreenshot('Cart Badge Verified');
    });
  });

  // TC-INV-007: Add multiple products to cart
  test('TC-INV-007: Add multiple products to cart', {
    annotation: { type: 'Feature', description: 'Cart functionality' },
  }, async ({ page, attachScreenshot }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Add three products to cart
    await test.step('Add first product', async () => {
      await inventoryPage.addProductToCart(0);
      await attachScreenshot('After Add Product 1');
    });
    
    await test.step('Add second product', async () => {
      await inventoryPage.addProductToCart(1);
      await attachScreenshot('After Add Product 2');
    });
    
    await test.step('Add third product', async () => {
      await inventoryPage.addProductToCart(2);
      await attachScreenshot('After Add Product 3');
    });
    
    // Verify cart badge shows 3
    await test.step('Verify cart badge count', async () => {
      const badgeCount = await inventoryPage.getCartBadgeCount();
      expect(badgeCount).toBe(3);
      await attachScreenshot('Cart Badge Verified');
    });
  });
});
