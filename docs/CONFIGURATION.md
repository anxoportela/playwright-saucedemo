# Configuration Guide

This document provides detailed information about configuring the Playwright testing project.

## 📁 Configuration Files

### Playwright Configuration (`playwright.config.js`)

The main configuration file for Playwright test execution.

```javascript
// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Directory containing test files
  testDir: './e2e',
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Fail build on CI if test.only is left
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,
  
  // Number of workers
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['list'],  // Console output
    ['html', { open: 'always' }]  // HTML report
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL for all tests
    baseURL: 'https://www.saucedemo.com',
    
    // Trace recording on failure
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video recording
    video: 'retain-on-failure',
    
    // Accept downloads
    acceptDownloads: true,
    
    // Locale settings
    locale: 'en-US',
    
    // Timezone
    timezoneId: 'America/New_York',
  },
  
  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile projects
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  // Local development server
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

### Docker Configuration (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  playwright:
    image: mcr.microsoft.com/playwright:v1.48.2-noble
    container_name: playwright-container
    ports:
      - "3000:3000"
    working_dir: /home/pwuser/project
    command: /bin/sh -c "cd /home/pwuser/project && npx -y playwright@1.48.1 run-server --port 3000 --host 0.0.0.0"
    networks:
      - playwright-network

networks:
  playwright-network:
    driver: bridge
```

### Package Configuration (`package.json`)

```json
{
  "name": "playwright-saucedemo",
  "version": "1.0.0",
  "scripts": {
    "test": "PW_TEST_CONNECT_WS_ENDPOINT=ws://127.0.0.1:3000/ npx playwright test",
    "test:ci": "npx playwright test --reporter=line",
    "test:report": "npx playwright show-report",
    "install: browsers": "npx playwright install",
    "clean": "rm -rf test-results playwright-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.48.2",
    "@types/node": "^22.9.0"
  }
}
```

## ⚙️ Configuration Options

### Reporter Options

| Reporter | Description | Options |
|----------|-------------|---------|
| `list` | Console output | - |
| `html` | HTML report | `open: 'always' \| 'never' \| 'on-failure'` |
| `json` | JSON output | `outputFile: 'results.json'` |
| `junit` | JUnit XML | `outputFile: 'results.xml'` |
| `allure` | Allure report | - |

### Trace Options

| Value | Description |
|-------|-------------|
| `off` | No tracing |
| `on` | Record trace for every test |
| `on-first-retry` | Record trace only on first retry |
| `retain-on-failure` | Retain trace for failed tests |

### Screenshot Options

| Value | Description |
|-------|-------------|
| `off` | No screenshots |
| `on` | Always capture screenshots |
| `only-on-failure` | Capture on failure only |

### Video Options

| Value | Description |
|-------|-------------|
| `off` | No video |
| `on` | Always record video |
| `retain-on-failure` | Retain video for failed tests |
| `on-first-retry` | Record video on first retry |

## 🔧 Environment Variables

### System Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CI` | Running in CI environment | `false` |
| `PLAYWRIGHT_BROWSERS_PATH` | Browser installation path | `0` (default) |
| `PW_TEST_CONNECT_WS_ENDPOINT` | WebSocket endpoint for remote connection | - |

### Custom Variables

Create a `.env` file:

```bash
# .env
BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
```

## 🌐 Browser Configuration

### Desktop Browsers

```javascript
projects: [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1280, height: 720 },
    },
  },
  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      viewport: { width: 1280, height: 720 },
    },
  },
  {
    name: 'webkit',
    use: {
      ...devices['Desktop Safari'],
      viewport: { width: 1280, height: 720 },
    },
  },
]
```

### Mobile Browsers

```javascript
projects: [
  {
    name: 'iPhone 12',
    use: {
      ...devices['iPhone 12'],
    },
  },
  {
    name: 'Pixel 5',
    use: {
      ...devices['Pixel 5'],
    },
  },
]
```

## 🐳 Docker Configuration

### Building Custom Image

```dockerfile
FROM mcr.microsoft.com/playwright:v1.48.2-noble

WORKDIR /app
COPY . .

RUN npm install
RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test"]
```

### Running in CI

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test --reporter=line
```

## 📊 Reporting Configuration

### HTML Report Customization

```javascript
reporter: [
  ['html', {
    open: 'never',  // Don't auto-open
    outputFolder: 'custom-report-folder',
  }]
]
```

### Multiple Reporters

```javascript
reporter: [
  ['list'],  // Console
  ['html', { open: 'never' }],  // HTML
  ['json', { outputFile: 'test-results.json' }],  // JSON
]
```

## 🔒 Security Configuration

### Ignoring HTTPS Errors

```javascript
use: {
  ignoreHTTPSErrors: true,
}
```

### Custom Headers

```javascript
use: {
  extraHTTPHeaders: {
    'Authorization': 'Bearer token',
  },
}
```

### Proxy Configuration

```javascript
use: {
  proxy: {
    server: 'http://my-proxy.com:8080',
    bypass: 'http://localhost',
  },
}
```

## 🚀 Performance Tuning

### Parallel Execution

```javascript
fullyParallel: true,
workers: process.env.CI ? 1 : undefined,  // Let Playwright decide locally
```

### Test Isolation

```javascript
use: {
  // Clean storage between tests
  storageState: undefined,
}
```

### Timeout Configuration

```javascript
// Global timeout
timeout: 30000,

// Per-test timeout
test.setTimeout(30000),

// Assertion timeout
expect: {
  timeout: 5000,
},
```

## 📝 Related Documentation

- [Architecture](ARCHITECTURE.md)
- [