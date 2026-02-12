// @ts-check
// Sidebar configuration for Docusaurus documentation

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '📚 Getting Started',
      collapsible: false,
      className: 'category-header',
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: 'Introduction',
        },
        {
          type: 'doc',
          id: 'architecture',
          label: 'Architecture',
        },
      ],
    },
    {
      type: 'category',
      label: '🧪 Test Coverage',
      collapsible: false,
      className: 'category-header',
      items: [
        {
          type: 'doc',
          id: 'test-cases',
          label: 'Test Cases',
        },
        {
          type: 'doc',
          id: 'best-practices',
          label: 'Best Practices',
        },
      ],
    },
    {
      type: 'category',
      label: '⚙️ Configuration',
      collapsible: false,
      className: 'category-header',
      items: [
        {
          type: 'doc',
          id: 'configuration',
          label: 'Configuration Guide',
        },
      ],
    },
  ],
};

module.exports = sidebars;
