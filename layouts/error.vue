<template>
  <div class="errorWrapper">
    <template v-if="error.statusCode === 404">
      <div class="errorCode">404</div>
      <h1 class="comment">ページが見つかりません。</h1>
    </template>
    <template v-else>
      <div class="errorCode">{{ error.statusCode }}</div>
      <h1 class="comment">エラーが発生しました。</h1>
    </template>
    <nuxt-link to="/" class="top">ホームに戻る</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'error', // エラーページ用のカスタムレイアウトを指定できます
  props: ['error'],
  data() {
    return {
      colormode: [],
    };
  },
  head() {
    return {
      htmlAttrs: {
        class: this.colormode,
      },
    };
  },
  mounted() {
    // ローカルストレージの取得
    if (this.$storageAvailable('localStorage')) {
      this.getLocalStorage();
    } else {
      console.log('ブラウザのローカルストレージがオフになっています。');
    }
    // ダークモードの初期設定
    this.darkModeSetting();
  },
  methods: {
    darkModeSetting() {
      if (this.$store.getters['darkmode/getActive']) {
        this.colormode = [this.$store.getters['colormode/getColormode'], 'darkmode'];
      } else {
        this.colormode = [this.$store.getters['colormode/getColormode']];
      }
    },
    getLocalStorage() {
      // ダークモード
      const darkmodeJson = localStorage.getItem('darkmode');
      const darkmode = JSON.parse(darkmodeJson);
      if (darkmode !== null) {
        this.$store.dispatch('darkmode/pushLocalStorage', darkmode);
      }
      // カラーモード
      const colormodeJson = localStorage.getItem('colormode');
      const colormode = JSON.parse(colormodeJson);
      if (colormode !== null) {
        this.$store.dispatch('colormode/pushLocalStorage', colormode);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.errorWrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 200px;
  height: 100vh;
  background-color: var(--background);
  color: var(--site-name);
}
.errorCode {
  text-align: center;
  font-weight: 400;
  font-size: 100px;

  @include responsive(xs) {
    font-size: 120px;
  }
  @include responsive(sm) {
    font-size: 140px;
  }
  @include responsive(md) {
    font-size: 160px;
  }
  @include responsive(lg) {
    font-size: 180px;
  }
  @include responsive(xl) {
    font-size: 200px;
  }
  @include responsive(xxl) {
    font-size: 200px;
  }
}
.comment {
  text-align: center;
  font-size: var(--font-size-3xl);
}
.top {
  margin-top: 50px;
  padding: 8px 20px;
  border-radius: 50px;
  background-color: var(--site-name);
  color: var(--background);
  text-align: center;
  text-decoration: none;
  font-weight: 400;
  font-size: var(--font-size-md);
  cursor: pointer;

  user-select: none;
}

</style>
