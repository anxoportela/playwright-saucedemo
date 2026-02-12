---
id: configuration
title: Configuration
sidebar_label: Configuration
description: Configuration guide for Playwright testing
---

# ⚙️ Configuration Guide

This document provides detailed information about configuring the Playwright testing project.

## 📁 Configuration Files

### Playwright Configuration (`playwright.config.js`)

The main configuration file for Playwright test execution.

```javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    acceptDownloads: true,
    locale: 'en-US',
    timezoneId: 'America/New_York',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  timeout: 30000,
  expect: { timeout: 5000 },
});
```

## 🐳 Docker Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  playwright:
    image: mcr.microsoft.com/playwright:v1.58.2-noble
    container_name: playwright-container
    ports:
      - "3000:3000"
    working_dir: /home/pwuser/project
```

## 📊 Reporter Options

| Reporter | Description |
|----------|-------------|
| `list` | Console output |
| `html` | HTML report |
| `json` | JSON output |
| `allure` | Allure report |

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
]
```

### Mobile Browsers

```javascript
projects: [
  {
    name: 'iPhone 12',
    use: { ...devices['iPhone 12'] },
  },
]
```

## 🔧 Environment Variables

```bash
# .env
BASE_URL=https://www.saucedemo.com
CI=true
```

## 🚀 Performance Tuning

```javascript
fullyParallel: true,
workers: process.env.CI ? 1 : undefined,
timeout: 30000,
```
