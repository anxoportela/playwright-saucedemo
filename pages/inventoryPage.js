const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
  }

  // Inventory page URL
  static URL = 'https://www.saucedemo.com/inventory.html';

  // Navigate to the inventory page
  async navigate() {
    await this.page.goto(InventoryPage.URL);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Get all product names
  async getProductNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  // Get all product prices
  async getProductPrices() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  // Add product to cart by index
  async addProductToCart(index) {
    const addButton = this.page.locator('.inventory_item button').nth(index);
    await addButton.click();
  }

  // Get cart badge count
  async getCartBadgeCount() {
    const badge = this.cartBadge;
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent());
    }
    return 0;
  }

  // Open cart
  async openCart() {
    await this.cartIcon.click();
  }

  // Sort products by option (az, za, lohi, hilo)
  async sortProducts(sortOption) {
    await this.sortDropdown.selectOption(sortOption);
  }

  // Get first product name
  async getFirstProductName() {
    return this.page.locator('.inventory_item_name').first().textContent();
  }

  // Get last product name
  async getLastProductName() {
    return this.page.locator('.inventory_item_name').last().textContent();
  }

  // Open menu
  async openMenu() {
    await this.menuButton.click();
  }

  // Logout
  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  // Verify user is on inventory page
  async verifyOnInventoryPage() {
    await expect(this.inventoryList).toBeVisible();
  }

  // Verify specific number of products are displayed
  async verifyProductCount(expectedCount) {
    const count = await this.inventoryItems.count();
    expect(count).toBe(expectedCount);
  }
}

module.exports = InventoryPage;
