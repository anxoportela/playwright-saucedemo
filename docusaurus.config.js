// @ts-check
// Docusaurus configuration for Playwright Saucedemo Documentation

const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Playwright Saucedemo',
  tagline: 'E2E Testing Project Documentation',
  url: 'https://anxoportela.github.io',
  baseUrl: '/playwright-saucedemo/docs/index.html/',
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
