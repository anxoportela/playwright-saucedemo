---
id: intro
title: Introduction
sidebar_label: Introduction
description: Welcome to Playwright Saucedemo E2E Testing Project
---

# 🚀 Playwright Saucedemo E2E Testing Project

A comprehensive end-to-end testing project using Playwright for the Saucedemo demo e-commerce website.

<div class="feature-box">

## ✨ Features

- **Page Object Model** - Clean, maintainable test architecture
- **Data-Driven Testing** - Separated test data for easy management
- **Multi-Browser Testing** - Chromium, Firefox, Webkit, and mobile browsers
- **Docker Support** - Run tests in isolated containers
- **Comprehensive Test Coverage** - Login, inventory, cart, checkout, and logout flows
- **Allure Reports** - Rich test reports with screenshots at every step
- **GitHub Actions CI/CD** - Automated testing and GitHub Pages deployment

</div>

## 📦 Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🏃 Running Tests

```bash
# Run all tests with default reporter
npm test

# Run tests in CI mode
npm run test:ci

# Run tests and generate JSON report
npm run test:json

# Run with specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific test file
npx playwright test e2e/login.spec.js

# View HTML report
npm run test:report
```

## 🐳 Docker Usage

```bash
# Start Playwright container
docker-compose up -d

# Run tests in container
docker-compose exec playwright npx playwright test

# Stop container
docker-compose down
```

## 📁 Project Structure

```
playwright-saucedemo/
├── e2e/                      # End-to-end test files
│   ├── login.spec.js         # Login functionality tests
│   ├── inventory.spec.js     # Inventory page tests
│   ├── cart.spec.js          # Cart functionality tests
│   ├── checkout.spec.js      # Checkout flow tests
│   └── logout.spec.js        # Logout functionality tests
├── pages/                    # Page Object Model classes
│   ├── loginPage.js          # Login page interactions
│   ├── inventoryPage.js      # Inventory page interactions
│   ├── cartPage.js           # Cart page interactions
│   └── checkoutPage.js       # Checkout page interactions
├── test-data/                # Test data files
│   ├── credentials.js        # User credentials data
│   └── products.js           # Product data
├── fixtures/                 # Custom test fixtures
│   ├── customFixtures.js     # Reusable test utilities
│   ├── allureScreenshots.js  # Screenshot attachment fixture
│   └── globalSetup.js        # Test initialization
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md       # Project architecture
│   ├── TEST_CASES.md         # Test case documentation
│   ├── BEST_PRACTICES.md     # Testing best practices
│   └── CONFIGURATION.md      # Configuration guide
├── .github/
│   └── workflows/
│       └── playwright.yml    # GitHub Actions CI/CD workflow
├── playwright.config.js      # Playwright configuration
├── docker-compose.yml        # Docker configuration
└── package.json             # Project dependencies
```

## 🎯 Best Practices

1. **Use Page Objects** - Encapsulate page interactions
2. **Separate Test Data** - Keep data out of test files
3. **Use Assertions Wisely** - Choose the right assertions
4. **Add Waits** - Wait for elements when needed
5. **Use Data Attributes** - Prefer `data-test` selectors
6. **Clean Up** - Use beforeEach/afterEach hooks

## 👤 Author

**Anxo Portela-Insua Blanco**

---

**Happy Testing! 🎉**
