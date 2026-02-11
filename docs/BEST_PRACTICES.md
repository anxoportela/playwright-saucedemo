# Best Practices Guide

This document outlines the best practices for writing and maintaining tests in this Playwright project.

## 🎯 Writing Maintainable Tests

### 1. Use Page Objects

Always encapsulate page interactions in Page Objects.

**✅ Good:**
```javascript
// pages/loginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[data-test="username"]');
    this.passwordInput = page.locator('input[data-test="password"]');
    this.loginButton = page.locator('input[data-test="login-button"]');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

**❌ Bad:**
```javascript
// In test file
test('Login', async ({ page }) => {
  await page.fill('input[data-test="username"]', 'standard_user');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  await page.click('input[data-test="login-button"]');
});
```

### 2. Separate Test Data

Keep test data separate from test logic.

**✅ Good:**
```javascript
// test-data/credentials.js
module.exports = {
  validUser: { username: 'standard_user', password: 'secret_sauce' },
  // ... more test data
};

// test file
test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(credentials.validUser.username, credentials.validUser.password);
});
```

### 3. Use Descriptive Test Names

Test names should clearly describe what they're testing.

**✅ Good:**
```javascript
test('Login with valid credentials redirects to inventory page', async ({ page }) => {
  // ...
});
```

**❌ Bad:**
```javascript
test('Test 1', async ({ page }) => {
  // ...
});
```

### 4. Use Proper Assertions

Choose assertions that clearly express the expected behavior.

**✅ Good:**
```javascript
// Check URL after login
await expect(page).toHaveURL('/inventory.html');

// Check error message
await expect(errorMessage).toHaveText('Expected error message');
```

### 5. Handle Asynchrony Properly

Use Playwright's built-in waiting mechanisms.

**✅ Good:**
```javascript
// Wait for navigation
await page.goto('/');
await page.waitForLoadState('domcontentloaded');

// Wait for element to be visible
await expect(locator).toBeVisible();
```

**❌ Bad:**
```javascript
// Never use arbitrary sleeps
await page.waitForTimeout(5000); // ❌ Avoid this
```

## 📝 Code Style Guidelines

### Naming Conventions

| Component | Convention | Example |
|-----------|------------|---------|
| Test files | `*.spec.js` | `login.spec.js` |
| Page Objects | `PascalCase.js` | `LoginPage.js` |
| Test data files | `camelCase.js` | `credentials.js` |
| Fixtures | `*.js` | `customFixtures.js` |
| Locators | camelCase | `usernameInput` |
| Methods | camelCase | `login()` |

### Commenting

- Use comments to explain **why**, not **what**
- Translate all comments to English
- Keep comments up-to-date with code changes

**✅ Good:**
```javascript
// Navigate to login page - start fresh for each test
async navigate() {
  await this.page.goto(this.constructor.URL);
  await this.page.waitForLoadState('domcontentloaded');
}
```

### Indentation and Formatting

- Use 2 spaces for indentation
- Use semicolons in JavaScript
- Use template literals for string interpolation

## 🔧 Locator Best Practices

### 1. Prefer `data-test` Attributes

**✅ Good:**
```javascript
this.usernameInput = page.locator('input[data-test="username"]');
```

**❌ Avoid:**
```javascript
// Fragile selectors that break easily
this.usernameInput = page.locator('#user-name');
this.usernameInput = page.locator('div > form > input:nth-child(1)');
```

### 2. Use Semantic Locators

**✅ Good:**
```javascript
// Descriptive and stable
this.loginButton = page.locator('button[data-test="login-button"]');
this.errorMessage = page.locator('h3[data-test="error"]');
```

### 3. Avoid Index-Based Locators

**❌ Bad:**
```javascript
// Breaks if DOM order changes
this.firstProduct = page.locator('.inventory_item').first();
```

## 🧪 Test Organization

### 1. Use `test.describe()` for Grouping

```javascript
test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginPage.navigate();
  });

  test('Valid login', async () => { /* ... */ });
  test('Invalid login', async () => { /* ... */ });
});
```

### 2. Use Proper Hooks

```javascript
test.beforeAll(async () => {
  // Setup before all tests in describe
});

test.beforeEach(async ({ page }) => {
  // Setup before each test
});

test.afterEach(async ({ page }) => {
  // Cleanup after each test
});

test.afterAll(async () => {
  // Cleanup after all tests
});
```

### 3. Keep Tests Independent

**✅ Good:**
```javascript
test('Login with valid credentials', async ({ page }) => {
  // Each test navigates and logs in independently
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(credentials.validUser.username, credentials.validUser.password);
});
```

**❌ Bad:**
```javascript
test('Login once, test multiple things', async ({ page }) => {
  // Tests should be independent, not share state
});
```

## 🚨 Error Handling

### 1. Add Test Annotations

```javascript
/**
 * @smoke - Critical test, run on every commit
 * @critical - Business critical functionality
 */
test('Critical feature', async ({ page }) => {
  // ...
});
```

### 2. Handle Expected Errors

```javascript
test('Error handling', async ({ page }) => {
  // Test that errors are properly handled
  const errorMessage = page.locator('.error');
  await expect(errorMessage).toBeVisible();
});
```

### 3. Use Soft Assertions

```javascript
import { softAssertions } from '@playwright/test';

test('Multiple checks', async ({ page }) => {
  await softAssertions.assertionSoft(
    () => expect(page).toHaveTitle('Expected Title'),
    () => expect(locator).toBeVisible(),
    () => expect(text).toContain('Expected Text')
  );
});
```

## 📊 Test Data Management

### 1. Use Factory Pattern for Complex Data

```javascript
// test-data/userFactory.js
function createUser(overrides = {}) {
  return {
    username: 'standard_user',
    password: 'secret_sauce',
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
    ...overrides
  };
}

module.exports = { createUser };
```

### 2. Centralize Test Data

```
test-data/
├── credentials.js      # User credentials
├── products.js         # Product data
├── users.js            # User profiles
└── testDataFactory.js # Data factory functions
```

## 🔄 Test Maintenance

### 1. Review Tests Regularly

- Keep tests up-to-date with application changes
- Remove obsolete tests
- Refactor flaky tests

### 2. Monitor Test Results

- Track test flakiness
- Analyze failures
- Update tests proactively

### 3. Document Changes

- Update documentation when adding tests
- Keep test case docs current
- Document known issues

## 📈 Performance Tips

### 1. Run Tests in Parallel

```javascript
// playwright.config.js
fullyParallel: true,
```

### 2. Use Retries Wisely

```javascript
// playwright.config.js
retries: process.env.CI ? 2 : 0,
```

### 3. Optimize Selectors

- Use fast locators
- Avoid complex DOM traversal
- Cache frequently used elements

## 🔒 Security Best Practices

### 1. Manage Credentials Securely

```javascript
// ❌ Never commit credentials
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

// ✅ Use environment variables
const { username, password } = process.env;
```

### 2. Use .env Files

```bash
# .env (add to .gitignore)
SAUCEDEMO_USERNAME=standard_user
SAUCEDEMO_PASSWORD=secret_sauce
```

## 📚 Related Documentation

- [Architecture](ARCHITECTURE.md)
- [Test Cases](TEST_CASES.md)
- [Configuration](CONFIGURATION.md)
