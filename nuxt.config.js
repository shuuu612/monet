/* import { client } from './utils/microcms'; */

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Monet | Webデザインギャラリー',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'keywords', name: 'keywords', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      
      // OGP設定
      { hid: 'og:site_name', property: 'og:site_name', content: 'Monet' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://mitsukaru-design.com/' },
      { hid: 'og:title', property: 'og:title', content: 'Monet | Webデザインギャラリー' },
      { hid: 'og:description', property: 'og:description', content: 'サイトの説明' },
      { hid: 'og:image', property: 'og:image', content: 'サイトURL' },

      // Facebook
      { hid: 'fb:app_id', property: 'fb:app_id', content: 'App-ID' },
      // Twitter
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@Twitter' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicons/icon-192x192.png' },
      { rel: 'apple-touch-icon', type: 'image/png', href: '/favicons/apple-touch-icon-180x180.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/ress.scss',
    '@/assets/scss/common.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/common.js',
    '@/plugins/storageAvailable.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  /* buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ], */

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/google-gtag', 
  ],
  'google-gtag': {
    id: 'G-QDLBX51TVH',
  },

  styleResources: {
    scss: [
      '@/assets/scss/mixin.scss',
      '@/assets/scss/font.scss',
      '@/assets/scss/color.scss',
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === "production"
        }
      }
    }
  },

  buildModules: [
    'nuxt-microcms-module',
  ],

  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_ID,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === "production" ? "server" : "all",
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/tag/:tagId',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'tags',
      });
      routes.push({
        path: '/sort/:sortId',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'sorts',
      });
      routes.push({
        path: '/tag/:tagId/sort/:sortId',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'tag-sort',
      });
    },
  },

  generate: {
    interval: 300,
  }
}
