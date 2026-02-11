const base = require('@playwright/test');

/**
 * Custom fixture that adds screenshot attachment capability for Allure reports
 */
const test = base.test.extend({
  /**
   * Custom attachScreenshot function
   */
  attachScreenshot: async ({ page }, use) => {
    const attach = async (name) => {
      const screenshot = await page.screenshot({ fullPage: false });
      await base.test.info().attach(name, {
        body: screenshot,
        contentType: 'image/png',
      });
    };
    await use(attach);
  },
});

module.exports = test;
