const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryInfo = page.locator('.summary_info');
    this.summaryTotal = page.locator('.summary_total_label');
    this.paymentInfo = page.locator('.payment_info_label');
    this.shippingInfo = page.locator('.shipping_info_label');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
  }

  // Checkout step one URL
  static URL = 'https://www.saucedemo.com/checkout-step-one.html';

  // Navigate to checkout step one
  async navigateToStepOne() {
    await this.page.goto(CheckoutPage.URL);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Fill checkout information
  async fillInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // Click continue button
  async continue() {
    await this.continueButton.click();
  }

  // Click cancel button
  async cancel() {
    await this.cancelButton.click();
  }

  // Click finish button
  async finish() {
    await this.finishButton.click();
  }

  // Get summary total
  async getSummaryTotal() {
    const totalText = await this.summaryTotal.textContent();
    return parseFloat(totalText.replace('Total: $', ''));
  }

  // Verify on checkout complete page
  async verifyOnCompletePage() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
  }

  // Verify checkout information page
  async verifyOnStepOne() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }

  // Verify checkout step two page
  async verifyOnStepTwo() {
    await expect(this.summaryInfo).toBeVisible();
    await expect(this.finishButton).toBeVisible();
  }

  // Complete the checkout process
  async completeCheckout(firstName, lastName, postalCode) {
    await this.fillInformation(firstName, lastName, postalCode);
    await this.continue();
    await this.finish();
  }
}

module.exports = CheckoutPage;
