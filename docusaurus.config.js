/**
 * MIT License
 * Copyright (c) 2024 Anxo Portela-Insua Blanco
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
// @ts-check
// Docusaurus configuration for Playwright Saucedemo Documentation

const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Playwright Saucedemo',
  tagline: 'E2E Testing Project Documentation',
  url: 'https://anxoportela.github.io',
  baseUrl: '/playwright-saucedemo/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/anxoportela/playwright-saucedemo/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Navigation
      navbar: {
        title: 'Playwright Saucedemo',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/anxoportela/playwright-saucedemo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      // Footer
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Playwright Saucedemo. Built with Docusaurus.`,
      },
      // Prism
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
      // Color mode
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // Announcement
      announcementBar: {
        id: 'test_reports',
        content: '📊 View Allure Test Reports for detailed test results',
        backgroundColor: '#667eea',
        textColor: '#ffffff',
        isCloseable: true,
      },
    }),
};

module.exports = config;
