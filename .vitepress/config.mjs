import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Agentic Earth',
  description: 'Developer documentation for the Agentic Earth CLI and Python SDK',
  cleanUrls: true,

  themeConfig: {
    logo: '/logo.jpg',
    siteTitle: 'Agentic Earth Docs',

    nav: [
      { text: 'Quickstart', link: '/quickstart' },
      { text: 'CLI', link: '/cli' },
      { text: 'Python SDK', link: '/sdk/' },
      { text: 'agenticearth.app', link: 'https://agenticearth.app' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Quickstart', link: '/quickstart' },
        ],
      },
      {
        text: 'CLI',
        items: [
          { text: 'Overview', link: '/cli' },
          { text: 'Commands', link: '/cli#commands' },
          { text: 'In-session commands', link: '/cli#in-session-commands' },
        ],
      },
      {
        text: 'Python SDK',
        items: [
          { text: 'Overview', link: '/sdk/' },
          { text: 'API Reference', link: '/sdk/reference' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/agenticearth/agenticearth-python' },
    ],

    footer: {
      message: 'Agentic Earth — 150+ live geospatial datasets via natural language.',
      copyright: '© 2026 Agentic Earth',
    },

    search: {
      provider: 'local',
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }],
    ['meta', { property: 'og:title', content: 'Agentic Earth Docs' }],
    ['meta', { property: 'og:description', content: 'CLI and Python SDK reference for Agentic Earth.' }],
  ],
})
