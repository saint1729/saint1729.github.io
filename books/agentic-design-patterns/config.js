// Import auto-generated navigation order
// This file is created during build from the GitHub repo content
let forcedNavOrder;
try {
  forcedNavOrder = require('./navigation-order.js');
} catch (error) {
  // Fallback if navigation-order.js doesn't exist yet (first build)
  console.warn('navigation-order.js not found, using default navigation order');
  forcedNavOrder = [
    '/',
    '/chapter_01/prompt_chaining',
    '/chapter_02/routing',
    '/chapter_03/parallelization',
    '/chapter_04/reflection'
  ];
}

const config = {
  gatsby: {
    pathPrefix: '/books/agentic-design-patterns',
    siteUrl: 'https://saint1729.me',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: '/books/agentic-design-patterns/logo.jpg',
    logoLink: '/',
    title: "Agentic Design Patterns",
    githubUrl: 'https://github.com/saint1729/agentic-design-patterns',
    helpUrl: '',
    tweetText: '',
    social: ``,
    links: [
      { text: 'Portfolio', link: '/' },
      { text: 'GitHub', link: 'https://github.com/saint1729/agentic-design-patterns' }
    ],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: forcedNavOrder,
    collapsedNav: [],
    links: [
      { text: 'Portfolio', link: '/' },
      { text: 'LinkedIn', link: 'https://www.linkedin.com/in/saint1729/' }
    ],
    frontLine: false,
    ignoreIndex: true,
    title: "Agentic Design Patterns",
  },
  siteMetadata: {
    title: 'Agentic Design Patterns | Sai Nikhil Thirandas',
    description: 'Learning journey through Agentic Design Patterns - exploring key patterns for building AI agents with implementations in LangChain, CrewAI, and Google ADK',
    ogImage: null,
    docsLocation: '',
    favicon: null,
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gatsby Gitbook Starter',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
