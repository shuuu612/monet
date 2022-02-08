/* import { client } from './utils/microcms'; */

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SUUGO | Webデザインギャラリー',
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
      { hid: 'og:site_name', property: 'og:site_name', content: 'SUUGO' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://suugo.jp/' },
      { hid: 'og:title', property: 'og:title', content: 'SUUGO | Webデザインギャラリー' },
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
      { rel: 'preload', href: 'https://fonts.googleapis.com'},
      { rel: 'preload', href: 'https://fonts.gstatic.com', crossorigin: ''},
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
    ['@nuxtjs/google-gtag', {
      id: 'G-JC3657GR7F',
      debug: true,
    }]
  ],

  styleResources: {
    scss: [
      '@/assets/scss/variables.scss'
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

  buildModules: ["nuxt-microcms-module"],

  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_ID,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === "production" ? "server" : "all",
  },

  router: {
    extendRoutes(routes, resolve) {
      /* routes.push({
        path: '/page/:pageId',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'pages',
      });
      routes.push({
        path: '/page/:pageId/sort/:sortId',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'pages-sort',
      });
      routes.push({
        path: '/tag/:tagId/page/:pageId',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'tags',
      });
      routes.push({
        path: '/tag/:tagId/page/:pageId/sort/:sortId',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'tags-sort',
      }); */
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
    interval: 200,
    /* async routes() {
      const data = (
        await client.get({
          endpoint: 'site',
          orders: '-publishedAt',
        })
      );

      return client.get({
          endpoint: 'type',
          queries: {
            limit: 100,
          },
        }).then((res) => {
          return res.contents.map(item => {
            return {
              route: `/tag/type=${item.id}&and`,
              paload: data,
            }
          })
        })
    } */
    /* async routes() {
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      const limit = 50;
      const popularArticles = (
        await client.get({
          endpoint: 'popular-articles',
        })
      ).articles;
      const banner = await client.get({
        endpoint: 'banner',
      });

      // 詳細ページ
      const getArticles = (offset = 0) => {
        return client
          .get({
            endpoint: 'blog',
            queries: {
              offset,
              limit,
              depth: 2,
            },
          })
          .then(async (res) => {
            let articles = [];
            if (res.totalCount > offset + limit) {
              articles = await getArticles(offset + limit);
            }
            return [
              ...res.contents.map((content) => ({
                route: `/${content.id}`,
                payload: { content, popularArticles, banner },
              })),
              ...articles,
            ];
          });
      };
      const articles = await getArticles();

      // 一覧ページ
      const index = {
        route: '/',
        payload: { popularArticles, banner },
      };

      // 一覧のページング
      const pages = await client
        .get({
          endpoint: 'blog',
          queries: {
            limit: 0,
          },
        })
        .then((res) =>
          range(1, Math.ceil(res.totalCount / 10)).map((p) => ({
            route: `/page/${p}`,
            payload: { popularArticles, banner },
          }))
        );

      // 検索ページ
      const search = {
        route: '/search',
        payload: { popularArticles, banner },
      };

      const categories = await client
        .get({
          endpoint: 'categories',
          queries: {
            fields: 'id',
          },
        })
        .then(({ contents }) => {
          return contents.map((content) => content.id);
        });

      // カテゴリーページ
      const categoryPages = await Promise.all(
        categories.map((category) =>
          client
            .get({
              endpoint: 'blog',
              queries: {
                limit: 0,
                filters: `category[equals]${category}`,
              },
            })
            .then((res) => {
              return range(1, Math.ceil(res.totalCount / 10)).map((p) => ({
                route: `/category/${category}/page/${p}`,
                payload: { popularArticles, banner },
              }));
            })
        )
      );
      const flattenCategoryPages = [].concat.apply([], categoryPages);

      const tags = await client
        .get({
          endpoint: 'tags',
          queries: {
            fields: 'id',
            limit: 1000,
          },
        })
        .then(({ contents }) => {
          return contents.map((content) => content.id);
        });

      // タグページ
      const tagPages = await Promise.all(
        tags.map((tag) =>
          client
            .get({
              endpoint: 'blog',
              queries: {
                limit: 0,
                filters: `tag[contains]${tag}`,
              },
            })
            .then((res) => {
              return range(1, Math.ceil(res.totalCount / 10)).map((p) => ({
                route: `/tag/${tag}/page/${p}`,
                payload: { popularArticles, banner },
              }));
            })
        )
      );
      const flattenTagPages = [].concat.apply([], tagPages);

      return [
        index,
        search,
        ...articles,
        ...pages,
        ...flattenCategoryPages,
        ...flattenTagPages,
      ];
    }, */
  }
}
