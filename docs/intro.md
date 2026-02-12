---
id: intro
title: Introduction
sidebar_label: Introduction
description: Playwright Saucedemo E2E Testing Project Overview
license: MIT
---

# 🧪 Playwright Saucedemo E2E Testing Project

<div class="hero">
  <p class="hero__subtitle">
    A comprehensive end-to-end testing project using Playwright for the Saucedemo demo e-commerce website. This project demonstrates industry best practices for automated testing with detailed reporting and CI/CD integration.
  </p>
</div>

## 📦 Installation

### Prerequisites

| Requirement | Version | Description |
|-------------|---------|-------------|
| Node.js | 18+ | JavaScript runtime |
| npm | 9+ | Package manager |
| Docker | 20+ | Container platform (optional) |
| Git | 2+ | Version control |

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/anxoportela/playwright-saucedemo.git
cd playwright-saucedemo

# Install dependencies
npm install

# Install Playwright browsers with system dependencies
npm run install:browsers
```

### Browser Installation

```bash
# Install all browsers
npm run install:browsers

# Install specific browsers
npm run install:chromium
npm run install:firefox
npm run install:webkit
```

## 🏃 Running Tests

### Basic Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests with default reporter |
| `npm run test:ci` | Run tests in CI mode |
| `npm run test:json` | Generate JSON report |
| `npm run test:html` | Generate HTML report |
| `npm run test:allure` | Generate and open Allure report |
| `npm run test:report` | View last HTML report |

### Browser-Specific Testing

```bash
# Run on specific browser
npx playwright test --project=chromium    # Chrome
npx playwright test --project=firefox     # Firefox
npx playwright test --project=webkit       # Safari

# Run on mobile browsers
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### Filtering Tests

```bash
# Run specific test file
npx playwright test e2e/login.spec.js

# Run tests matching pattern
npx playwright test --grep="login"
npx playwright test --grep="checkout"

# Run smoke tests
npm run test:smoke
npm run test:smoke:chromium
```

## 🐳 Docker Usage

### Quick Commands

```bash
# Start container
docker-compose up -d

# Run tests in container
docker-compose exec playwright npx playwright test

# Stop container
docker-compose down

# View logs
docker-compose logs -f playwright
```

### Manual Docker Run

```bash
docker run --rm \
  -v $(pwd):/workdir \
  -w /workdir \
  mcr.microsoft.com/playwright:v1.48.2-noble \
  npx playwright test
```

## 📁 Project Structure

```
playwright-saucedemo/
├── 📂 e2e/                          # Test specifications
│   ├── login.spec.js                 # Authentication tests
│   ├── inventory.spec.js            # Product tests
│   ├── cart.spec.js                 # Cart tests
│   ├── checkout.spec.js             # Checkout tests
│   └── logout.spec.js              # Session tests
│
├── 📂 pages/                        # Page Object Models
│   ├── loginPage.js                 # Login page
│   ├── inventoryPage.js             # Inventory page
│   ├── cartPage.js                  # Cart page
│   └── checkoutPage.js              # Checkout page
│
├── 📂 fixtures/                     # Custom fixtures
│   ├── customFixtures.js           # Test utilities
│   ├── allureScreenshots.js        # Allure integration
│   └── globalSetup.js              # Initialization
│
├── 📂 test-data/                    # Test data
│   ├── credentials.js              # User credentials
│   └── products.js                 # Product catalog
│
├── 📂 docs/                         # Documentation
│   ├── intro.md                    # This file
│   ├── architecture.md             # Architecture guide
│   ├── test-cases.md              # Test documentation
│   ├── best-practices.md          # Testing guidelines
│   └── configuration.md           # Configuration reference
│
├── 📂 .github/workflows/           # CI/CD
│   └── playwright.yml              # GitHub Actions
│
├── 📂 src/                         # Docusaurus theme
│   ├── css/custom.css             # Custom styles
│   └── pages/                     # Custom pages
│
├── 📄 playwright.config.js          # Playwright config
├── 📄 docusaurus.config.js         # Docusaurus config
├── 📄 sidebars.js                  # Documentation sidebar
├── 📄 docker-compose.yml           # Docker config
└── 📄 package.json                 # Dependencies
```

## 🧪 Test Coverage

### Test Modules

| Module | Tests | Coverage |
|--------|-------|----------|
| Login | 4 | Valid/invalid credentials, empty fields |
| Inventory | 7 | Products, sorting (A-Z, Z-A, price) |
| Cart | 5 | Add/remove, badge updates |
| Checkout | 6 | Flow, validation, errors |
| Logout | 3 | Session management |
| **Total** | **25** | Full E2E coverage |

### Supported Browsers

| Browser | Type | Platform |
|---------|------|----------|
| Chromium | Desktop | Windows, macOS, Linux |
| Firefox | Desktop | Windows, macOS, Linux |
| Webkit | Desktop | macOS |
| Pixel 5 | Mobile | Android |
| iPhone 12 | Mobile | iOS |

## 📊 Reports

### Allure Report

```bash
# Generate and open
npm run test:allure

# Or use separate commands
npm run allure:generate
npm run allure:open
npm run allure:serve
npm run allure:clear
```

Allure Features:
- 📸 Screenshots at every step
- 📈 Statistics and charts
- 📋 Test annotations
- 🔍 Execution traces
- 🏷️ Categorization

### Report Locations

| Type | Location | Command |
|------|----------|---------|
| HTML | `playwright-report/` | `npm run test:report` |
| JSON | `test-results/results.json` | `npm run test:json` |
| Allure | `allure-results/` | `npm run test:allure` |

## 🤖 CI/CD Pipeline

### Workflow Triggers

| Trigger | Description |
|---------|-------------|
| Push to main/master | Run all tests |
| Pull requests | Run tests with PR comments |
| Scheduled (3 AM UTC) | Daily smoke tests |
| Manual dispatch | On-demand execution |

### Pipeline Jobs

1. **test** - Runs all browser tests
2. **deploy-docs** - Deploys to GitHub Pages
3. **notify** - Posts results on failure

### GitHub Pages

- URL: `https://anxoportela.github.io/playwright-saucedemo/`
- Auto-deployed from main branch
- Test history archives by date

## 📚 Available Documentation

| Document | Description |
|----------|-------------|
| [Introduction](intro) | Project overview (you are here) |
| [Architecture](architecture) | Design patterns and structure |
| [Test Cases](test-cases) | Detailed test documentation |
| [Best Practices](best-practices) | Testing guidelines |
| [Configuration](configuration) | Configuration reference |

## 🎯 Best Practices

### Writing Tests

1. **Use Page Objects** - Encapsulate page interactions
2. **Separate Test Data** - Keep data external
3. **Descriptive Names** - Clear test descriptions
4. **Proper Assertions** - Specific assertions
5. **Avoid Waits** - Use auto-waiting
6. **Data Attributes** - Use `data-test` selectors

### Code Conventions

| Component | Pattern | Example |
|-----------|----------|---------|
| Test files | `*.spec.js` | `login.spec.js` |
| Page Objects | `PascalCase.js` | `LoginPage.js` |
| Test data | `camelCase.js` | `credentials.js` |
| Locators | `camelCase` | `usernameInput` |
| Methods | `camelCase` | `login()` |

## 🧹 Maintenance

### Cleanup Commands

```bash
# Clear reports only
npm run clean

# Clear everything
npm run clean:all

# Clear Allure files
npm run allure:clear
```

### Adding New Tests

1. Create spec file in `e2e/`
2. Create page object in `pages/` (if needed)
3. Add test data in `test-data/` (if needed)
4. Run tests to verify

## 🔧 Configuration

### Environment Variables

```env
BASE_URL=https://www.saucedemo.com
CI=true
PLAYWRIGHT_TIMEOUT=30000
```

### Key Settings

```javascript
// playwright.config.js
{
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30000,
  // ... more options
}
```

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](https://github.com/anxoportela/playwright-saucedemo/blob/main/LICENSE) file for details.

### Acknowledgments

| Library | License | Repository |
|---------|---------|------------|
| [Docusaurus](https://docusaurus.io/) | MIT | [facebook/docusaurus](https://github.com/facebook/docusaurus) |
| [Playwright](https://playwright.dev/) | Apache 2.0 | [microsoft/playwright](https://github.com/microsoft/playwright) |
| [Allure Report](https://allurereport.org/) | Apache 2.0 | [allure-framework/allure-js](https://github.com/allure-framework/allure-js) |

## 👤 Author

**Anxo Portela-Insua Blanco**

---

<div align="center">

**Happy Testing!** 🧪✨

[![Playwright](https://img.shields.io/badge/Playwright-1.48.2-yellow)](https://playwright.dev/)
[![Allure](https://img.shields.io/badge/Allure-2.36.0-green)](https://allurereport.org/)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.6.3-purple)](https://docusaurus.io/)

</div>
