# Playwright Saucedemo E2E Testing Project

A comprehensive end-to-end testing project using Playwright for the Saucedemo demo e-commerce website.

## 🚀 Features

- **Page Object Model** - Clean, maintainable test architecture
- **Data-Driven Testing** - Separated test data for easy management
- **Multi-Browser Testing** - Chromium, Firefox, Webkit, and mobile browsers
- **Docker Support** - Run tests in isolated containers
- **Comprehensive Test Coverage** - Login, inventory, cart, and checkout flows

## 📦 Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run install:browsers
```

## 🏃 Running Tests

```bash
# Run all tests with default reporter
npm test

# Run tests in CI mode (line reporter, retries enabled)
npm run test:ci

# Run with specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific test file
npx playwright test e2e/login.spec.js

# Run with debug mode
npx playwright test --debug

# Run with headed mode
npx playwright test --headed
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
├── e2e/                    # End-to-end test files
│   └── login.spec.js       # Login functionality tests
├── pages/                  # Page Object Model classes
│   └── loginPage.js        # Login page interactions
├── test-data/              # Test data files
│   └── credentials.js      # User credentials data
├── fixtures/               # Custom test fixtures
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md     # Project architecture
│   ├── TEST_CASES.md       # Test case documentation
│   ├── BEST_PRACTICES.md   # Testing best practices
│   └── CONFIGURATION.md    # Configuration guide
├── playwright.config.js    # Playwright configuration
├── docker-compose.yml      # Docker configuration
└── package.json            # Project dependencies
```

## 🧪 Test Coverage

### Login Tests
- ✅ Valid credentials login
- ✅ Invalid credentials login
- ✅ Empty username login
- ✅ Empty password login

### Inventory Tests
- Product listing verification
- Product sorting functionality
- Product details page

### Cart Tests
- Add to cart functionality
- Remove from cart
- Cart badge updates

### Checkout Tests
- Checkout flow
- Order completion

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
npm run test:allure

# Generate report from existing results
npm run allure:generate

# Open Allure report in browser
npm run allure:open

# Clear Allure results and report
npm run allure:clear
```

Allure results are generated in `allure-results/` and the report is saved to `allure-report/`.

### Standard HTML Report

```bash
# Run tests with HTML reporter
npm run test:html

# View the HTML report
npm run test:report
```

HTML reports are generated in:
- `playwright-report/` - HTML reports
- `test-results/` - Test result files (JSON, JUnit XML)

## 🎯 Best Practices


1. **Use Page Objects** - Encapsulate page interactions
2. **Separate Test Data** - Keep data out of test files
3. **Use Assertions Wisely** - Choose the right assertions
4. **Add Waits** - Wait for elements when needed
5. **Use Data Attributes** - Prefer `data-test` selectors
6. **Clean Up** - Use beforeEach/afterEach hooks

## 🧹 Cleanup Commands

```bash
# Clean test reports and results
npm run clean

# Clean everything including node_modules
npm run clean:all

# Show test report
npm run test:report
```

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
