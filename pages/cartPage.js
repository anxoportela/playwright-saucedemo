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

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartQuantity = page.locator('.cart_quantity');
    this.cartItemName = page.locator('.cart_item_name');
    this.cartItemPrice = page.locator('.cart_item_price');
    this.removeButton = page.locator('.cart_button');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // Cart page URL
  static URL = 'https://www.saucedemo.com/cart.html';

  // Navigate to the cart page
  async navigate() {
    await this.page.goto(CartPage.URL);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Get cart item count
  async getCartItemCount() {
    return this.cartItems.count();
  }

  // Get all item names in cart
  async getCartItemNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  // Get all item prices in cart
  async getCartItemPrices() {
    const prices = await this.page.locator('.cart_item_price').allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  // Remove item from cart by index
  async removeItem(index) {
    const removeButtons = this.removeButton;
    await removeButtons.nth(index).click();
  }

  // Proceed to checkout
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  // Continue shopping
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  // Get cart badge count
  async getCartBadgeCount() {
    const badge = this.cartBadge;
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent());
    }
    return 0;
  }

  // Verify cart is empty
  async verifyCartIsEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }

  // Verify cart has items
  async verifyCartHasItems(expectedCount) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  // Get first item name
  async getFirstItemName() {
    return this.cartItemName.first().textContent();
  }
}

module.exports = CartPage;
