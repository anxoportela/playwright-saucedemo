# Playwright Saucedemo E2E Testing Project

A comprehensive end-to-end testing project using Playwright for the Saucedemo demo e-commerce website.

## 🚀 Features

- **Page Object Model** - Clean, maintainable test architecture
- **Data-Driven Testing** - Separated test data for easy management
- **Multi-Browser Testing** - Chromium, Firefox, Webkit, and mobile browsers
- **Docker Support** - Run tests in isolated containers
- **Comprehensive Test Coverage** - Login, inventory, cart, checkout, and logout flows
- **Allure Reports** - Rich test reports with screenshots at every step
- **GitHub Actions CI/CD** - Automated testing and GitHub Pages deployment

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

## 🧪 Test Coverage

### Login Tests
- ✅ Valid credentials login
- ✅ Invalid credentials login
- ✅ Empty username login
- ✅ Empty password login

### Inventory Tests
- ✅ Product listing verification
- ✅ Product sorting functionality
- ✅ Product details page

### Cart Tests
- ✅ Add to cart functionality
- ✅ Remove from cart
- ✅ Cart badge updates

### Checkout Tests
- ✅ Checkout flow
- ✅ Order completion

### Logout Tests
- ✅ Logout functionality

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://www.saucedemo.com
# Add other environment variables as needed
```

### Browser Configuration

Edit `playwright.config.js` to customize:
- Base URL
- Test retries
- Reporter settings
- Project configurations

## 📊 Test Reports

This project uses **Allure Reporter** for beautiful, detailed test reports with screenshots at every step.

### Allure Report (Recommended)

Allure provides:
- 📸 **Screenshots at every test step**
- 📈 **Beautiful charts and graphs**
- 📋 **Detailed test descriptions**
- 🔍 **Step-by-step execution flow**
- 🏷️ **Test annotations and categories**

```bash
# Run tests and generate Allure report
npm run test:ci
npx allure generate allure-results --clean -o allure-report

# Open Allure report
npx allure open allure-report
```

Allure results are generated in `allure-results/` and the report is saved to `allure-report/`.

### Standard HTML Report

HTML reports are generated in:
- `playwright-report/` - HTML reports
- `test-results/` - Test result files (JSON, JUnit XML)

## 🤖 GitHub Actions CI/CD

This project includes a comprehensive CI/CD pipeline with:

### Automated Testing
- Runs on every push to main/master and pull requests
- Executes tests on Ubuntu latest with Node.js 20
- Runs all 5 browser projects (Chromium, Firefox, Webkit, Mobile)

### Reports & Artifacts
- Uploads Allure results and report as artifacts
- Uploads test results (JSON)
- Uploads Playwright HTML report
- Uploads traces on failure

### GitHub Pages Deployment
- Automatically deploys Allure reports to GitHub Pages
- Maintains test history with date-based archives
- Creates index.html for easy navigation

### Notifications
- Posts test results as comments on commits
- Posts test results as comments on PRs
- Shows workflow warnings on failures

## 🎯 Best Practices

1. **Use Page Objects** - Encapsulate page interactions
2. **Separate Test Data** - Keep data out of test files
3. **Use Assertions Wisely** - Choose the right assertions
4. **Add Waits** - Wait for elements when needed
5. **Use Data Attributes** - Prefer `data-test` selectors
6. **Clean Up** - Use beforeEach/afterEach hooks

## 📝 Adding New Tests

1. Create new spec file in `e2e/`
2. Create new page object in `pages/` (if needed)
3. Add test data in `test-data/` (if needed)
4. Run tests to verify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests
4. Run the test suite
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

Anxo Portela-Insua Blanco

---

**Happy Testing! 🎉**
