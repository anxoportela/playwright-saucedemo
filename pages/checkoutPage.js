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
