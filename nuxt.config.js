const PRODUCTION_BASE_PATH = '/works/monet';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Monet | Webデザインギャラリー',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'MonetはWebサイトギャラリーです。' },
      { hid: 'keywords', name: 'keywords', content: 'Webデザイン,Web design,ギャラリー' },
      { name: 'format-detection', content: 'telephone=no' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },

      // OGP設定
      { hid: 'og:site_name', property: 'og:site_name', content: 'Monet' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://shuuu.jp/works/monet' },
      { hid: 'og:title', property: 'og:title', content: 'Monet | Webデザインギャラリー' },
      { hid: 'og:description', property: 'og:description', content: 'MonetはWebサイトギャラリーです。' },
      { hid: 'og:image', property: 'og:image', content: 'https://shuuu.jp/works/monet/ogp.png' },

      // Twitter
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@shuuu612' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${process.env.NODE_ENV === 'production' ? PRODUCTION_BASE_PATH : ''}/favicon.ico`,
      },
      {
        rel: 'apple-touch-icon',
        href: `${process.env.NODE_ENV === 'production' ? PRODUCTION_BASE_PATH : ''}/apple-touch-icon.png`,
        sizes: '180x180',
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/ress.scss', '@/assets/scss/common.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/common.js', '@/plugins/storageAvailable.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    'nuxt-microcms-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources', '@nuxtjs/google-gtag'],
  'google-gtag': {
    id: 'G-QDLBX51TVH',
  },

  styleResources: {
    scss: ['@/assets/scss/mixin.scss', '@/assets/scss/font.scss', '@/assets/scss/color.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
        },
      },
    },
  },

  router: {
    base: process.env.NODE_ENV === 'production' ? PRODUCTION_BASE_PATH : '/',
  },

  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_ID,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },

  generate: {
    interval: 300,
  },
};
