# 🧪 Playwright Saucedemo E2E Testing Project

A comprehensive end-to-end testing project using Playwright for the Saucedemo demo e-commerce website. This project demonstrates industry best practices for automated testing with detailed reporting and CI/CD integration.

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/anxoportela/playwright-saucedemo.git
cd playwright-saucedemo

# Install dependencies
npm install

# Install Playwright browsers
npm run install:browsers

# Run tests
npm test
```

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Page Object Model** | Clean, maintainable test architecture with reusable page objects |
| **Data-Driven Testing** | Separated test data for easy management and maintenance |
| **Multi-Browser Testing** | Chromium, Firefox, Webkit, and mobile browser support |
| **Docker Support** | Run tests in isolated containers with Docker Compose |
| **Allure Reports** | Rich, interactive test reports with screenshots at every step |
| **GitHub Actions CI/CD** | Automated testing, reporting, and GitHub Pages deployment |
| **Docusaurus Documentation** | Beautiful, searchable project documentation |

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized testing)

### Setup

```bash
# Install all dependencies
npm install

# Install Playwright browsers with system dependencies
npm run install:browsers

# Or install a specific browser
npm run install:chromium
```

## 🏃 Running Tests

### Basic Commands

```bash
# Run all tests with default reporter
npm test

# Run tests in CI mode (with retries and single worker)
npm run test:ci

# Run tests and generate JSON report
npm run test:json

# View the last HTML report
npm run test:report

# Run with Allure reporter and open report
npm run test:allure
```

### Browser-Specific Testing

```bash
# Run tests on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run on mobile browsers
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### Specific Test Files

```bash
# Run a single test file
npx playwright test e2e/login.spec.js

# Run tests matching a pattern
npx playwright test --grep="login"
npx playwright test --grep="inventory"
```

## 🐳 Docker Usage

### Quick Commands

```bash
# Start Playwright container
docker-compose up -d

# Run tests in container
docker-compose exec playwright npx playwright test

# Stop container
docker-compose down

# View container logs
docker-compose logs -f playwright
```

### Custom Docker Run

```bash
# Run with custom configuration
docker run --rm \
  -v $(pwd):/workdir \
  -w /workdir \
  mcr.microsoft.com/playwright:v1.48.2-noble \
  npx playwright test
```

## 📁 Project Structure

```
playwright-saucedemo/
├── 📂 e2e/                          # End-to-end test specifications
│   ├── login.spec.js                 # Authentication tests
│   ├── inventory.spec.js            # Product listing and sorting tests
│   ├── cart.spec.js                 # Shopping cart operations
│   ├── checkout.spec.js             # Checkout flow tests
│   └── logout.spec.js              # Session management tests
│
├── 📂 pages/                        # Page Object Model classes
│   ├── loginPage.js                 # Login page interactions
│   ├── inventoryPage.js             # Inventory page interactions
│   ├── cartPage.js                  # Cart page interactions
│   └── checkoutPage.js              # Checkout page interactions
│
├── 📂 fixtures/                     # Custom Playwright fixtures
│   ├── customFixtures.js           # Reusable test utilities
│   ├── allureScreenshots.js        # Allure screenshot attachment
│   └── globalSetup.js              # Test initialization
│
├── 📂 test-data/                    # Test data files
│   ├── credentials.js             # User credentials data
│   └── products.js                 # Product catalog data
│
├── 📂 docs/                         # Docusaurus documentation
│   ├── intro.md                     # Project introduction
│   ├── architecture.md             # Architecture documentation
│   ├── test-cases.md              # Test case documentation
│   ├── best-practices.md          # Testing guidelines
│   └── configuration.md           # Configuration guide
│
├── 📂 .github/workflows/           # CI/CD pipelines
│   └── playwright.yml              # GitHub Actions workflow
│
├── 📂 src/                         # Docusaurus theme source
│   ├── css/custom.css             # Custom styling
│   └── pages/                     # Custom pages
│
├── 📄 playwright.config.js          # Playwright configuration
├── 📄 docusaurus.config.js         # Docusaurus configuration
├── 📄 sidebars.js                  # Documentation sidebar
├── 📄 docker-compose.yml           # Docker services
├── 📄 package.json                 # Dependencies and scripts
└── 📄 README.md                    # This file
```

## 🧪 Test Coverage

| Module | Tests | Description |
|--------|-------|-------------|
| **Login** | 4 tests | Valid/invalid credentials, empty fields |
| **Inventory** | 7 tests | Product listing, sorting (A-Z, Z-A, price) |
| **Cart** | 5 tests | Add/remove items, badge updates |
| **Checkout** | 6 tests | Complete flow, validation, error handling |
| **Logout** | 3 tests | Session termination, re-authentication |
| **Total** | **25 tests** | Comprehensive E2E coverage |

### Browser Matrix

| Browser | Type | Status |
|---------|------|--------|
| Chromium | Desktop | ✅ Supported |
| Firefox | Desktop | ✅ Supported |
| Webkit | Desktop | ✅ Supported |
| Pixel 5 | Mobile | ✅ Supported |
| iPhone 12 | Mobile | ✅ Supported |

## 📊 Reports

### Allure Report (Recommended)

```bash
# Generate and open Allure report
npm run test:allure
```

Allure provides:
- 📸 **Screenshots** at every test step
- 📈 **Charts** and statistical analysis
- 📋 **Test annotations** and categories
- 🔍 **Step-by-step** execution flow
- 🏷️ **Flaky test** identification

### Standard Reports

| Report Type | Location | Command |
|------------|----------|---------|
| HTML | `playwright-report/` | `npm run test:report` |
| JSON | `test-results/results.json` | `npm run test:json` |
| Allure | `allure-results/` | `npm run test:allure` |

### Report Management

```bash
# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open

# Clear all report directories
npm run allure:clear
```

## 🤖 CI/CD Pipeline

### GitHub Actions Workflow

The project includes a comprehensive CI/CD pipeline with:

#### Trigger Conditions
- Push to `main` or `master` branch
- Pull requests to main/master
- Daily scheduled run at 3 AM UTC
- Manual workflow dispatch

#### Pipeline Stages
1. **Test Execution** - Runs all 5 browser projects
2. **Report Generation** - Creates Allure and HTML reports
3. **Artifact Upload** - Stores all reports
4. **Documentation Build** - Builds Docusaurus site
5. **Pages Deployment** - Deploys to GitHub Pages
6. **Notifications** - Comments on PRs and commits

#### Artifacts
| Artifact | Retention | Description |
|----------|-----------|-------------|
| `allure-results` | 90 days | Raw Allure data |
| `allure-report` | 90 days | Generated HTML report |
| `test-results` | 90 days | JSON test results |
| `playwright-report` | 90 days | HTML test report |
| `playwright-traces` | 30 days | Debug traces (failure only) |

#### GitHub Pages
- URL: `https://anxoportela.github.io/playwright-saucedemo/`
- Auto-deployed on main branch updates
- Test history archived by date

## 📚 Documentation

### Available Documentation

| Document | Description |
|----------|-------------|
| [Introduction](docs/intro.md) | Project overview and quick start |
| [Architecture](docs/architecture.md) | Design patterns and project structure |
| [Test Cases](docs/test-cases.md) | Detailed test case documentation |
| [Best Practices](docs/best-practices.md) | Testing guidelines and tips |
| [Configuration](docs/configuration.md) | Configuration options reference |

### Docusaurus Commands

```bash
# Start local development server
npm run docs:start

# Build documentation for production
npm run docs:build

# Customize Docusaurus theme
npm run docs:swizzle
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root:

```env
# Base URL for testing
BASE_URL=https://www.saucedemo.com

# CI environment flag
CI=true

# Custom timeout (milliseconds)
PLAYWRIGHT_TIMEOUT=30000
```

### Playwright Configuration

Key settings in `playwright.config.js`:

```javascript
{
  // Test execution
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporting
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  
  // Browser projects
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } }
  ]
}
```

## 🎯 Best Practices

### Writing Tests

1. **Use Page Objects** - Encapsulate page interactions
2. **Separate Test Data** - Keep data out of test files
3. **Descriptive Names** - Clear, meaningful test names
4. **Proper Assertions** - Choose the right assertions
5. **Avoid Waits** - Use Playwright's auto-waiting
6. **Use Data Attributes** - Prefer `data-test` selectors

### Code Style

| Component | Convention | Example |
|-----------|------------|---------|
| Test files | `*.spec.js` | `login.spec.js` |
| Page Objects | `PascalCase.js` | `LoginPage.js` |
| Test data | `camelCase.js` | `credentials.js` |
| Fixtures | `*.js` | `customFixtures.js` |
| Locators | `camelCase` | `usernameInput` |
| Methods | `camelCase` | `login()` |

### Adding New Tests

1. Create new spec file in `e2e/`
2. Create new page object in `pages/` (if needed)
3. Add test data in `test-data/` (if needed)
4. Run tests to verify

## 🧹 Maintenance

### Cleanup Commands

```bash
# Clear test reports
npm run clean

# Clear everything including node_modules
npm run clean:all

# Clear Allure files
npm run allure:clear
```

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

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

[![Playwright](https://img.shields.io/badge/Playwright-2.48.2-yellow)](https://playwright.dev/)
[![Allure Report](https://img.shields.io/badge/Allure-2.36.0-green)](https://allurereport.org/)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.6.3-purple)](https://docusaurus.io/)

</div>
