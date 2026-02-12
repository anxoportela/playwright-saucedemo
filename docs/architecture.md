---
id: architecture
title: Architecture
sidebar_label: Architecture
description: Project architecture and design patterns
---

# 🏗️ Project Architecture

This document describes the architecture and design patterns used in this Playwright testing project.

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Execution Layer                      │
│                  (e2e/*.spec.js files)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Page Object Layer                         │
│                  (pages/*.js files)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  LoginPage  │  InventoryPage  │  CartPage  │  ...      │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Playwright Test Layer                     │
│              (playwright.config.js + fixtures)               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Browser Layer                             │
│              (Chromium │ Firefox │ Webkit)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Under Test                     │
│                  (https://www.saucedemo.com)                  │
└─────────────────────────────────────────────────────────────┘
```

## 📐 Design Patterns

### 1. Page Object Model (POM)

The Page Object Model is used to encapsulate all interactions with a particular page.

**Benefits:**
- **Reusability** - Methods can be reused across multiple tests
- **Maintainability** - Changes to UI only require updates in one place
- **Readability** - Tests read like natural language
- **DRY Principle** - Don't Repeat Yourself

**Example:**
```javascript
// pages/loginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[data-test="username"]');
    this.passwordInput = page.locator('input[data-test="password"]');
    this.loginButton = page.locator('input[data-test="login-button"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### 2. Data-Driven Testing

Test data is separated from test logic for better maintainability.

**Benefits:**
- **Easy Updates** - Change data without touching test code
- **Data Reuse** - Same data used across multiple tests
- **Data Variety** - Easy to add new test scenarios
- **Clear Separation** - Data and logic are independent

**Example:**
```javascript
// test-data/credentials.js
module.exports = {
  validUser: { username: 'standard_user', password: 'secret_sauce' },
  invalidCredentials: { username: 'user', password: 'wrong' },
  emptyUsername: { username: '', password: 'secret_sauce' }
};
```

### 3. Custom Fixtures

Custom fixtures provide reusable setup and teardown logic.

**Benefits:**
- **Consistent Setup** - Same initialization for all tests
- **Resource Management** - Proper cleanup after tests
- **Configuration** - Easy to configure test environments

## 📁 Directory Structure

```
├── e2e/                           # End-to-end tests
│   └── login.spec.js              # Test specifications
│
├── pages/                         # Page Objects
│   └── loginPage.js               # Login page interactions
│
├── test-data/                     # Test data
│   └── credentials.js             # User credentials
│
├── fixtures/                      # Custom fixtures
│   └── customFixtures.js          # Reusable test fixtures
│
├── docs/                          # Documentation
│   ├── ARCHITECTURE.md            # This file
│   ├── TEST_CASES.md              # Test case documentation BEST_PRACTICES
│   ├──.md          # Testing guidelines
│   └── CONFIGURATION.md           # Configuration guide
│
├── playwright.config.js           # Playwright configuration
├── docker-compose.yml            # Docker setup
└── package.json                  # Dependencies
```

## 🔧 Component Responsibilities

### Test Files (e2e/*.spec.js)
- Define test cases
- Use Page Objects for interactions
- Make assertions
- Handle test lifecycle

### Page Objects (pages/*.js)
- Encapsulate page interactions
- Define locators
- Implement business logic
- Handle waiting/loading states

### Test Data (test-data/*.js)
- Store test data
- Define test users
- Store expected values

### Fixtures (fixtures/*.js)
- Custom test setup
- Authentication helpers
- Database connections
- API clients

## 🎯 Key Principles

### 1. Single Responsibility
Each component has one clear responsibility.

### 2. DRY (Don't Repeat Yourself)
Reuse code through page objects and fixtures.

### 3. Readability
Tests should be self-documenting and easy to understand.

### 4. Maintainability
Changes to the application should require minimal test updates.

### 5. Reliability
Tests should be stable and not produce flaky results.

## 📈 Scaling Considerations

### Adding New Pages
1. Create new Page Object in `pages/`
2. Implement all page interactions
3. Add to test files as needed

### Adding New Tests
1. Identify which page object to use
2. Create test case in appropriate spec file
3. Add test data if needed
4. Run tests to verify

### Adding New Browsers
1. Update `playwright.config.js`
2. Add new project configuration
3. Test on new browser
