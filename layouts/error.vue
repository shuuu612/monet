<template>
  <div class="errorWrapper">
    <template v-if="error.statusCode === 404">
      <div class="errorCode">404</div>
      <h1 class="comment">ページが見つかりません。</h1>
    </template>
    <template v-else>
      <div class="errorCode">{{error.statusCode}}</div>
      <h1 class="comment">エラーが発生しました。</h1>
    </template>
    <a href="https://monet-design.com/" class="top">ホームに戻る</a>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error', // エラーページ用のカスタムレイアウトを指定できます
    data() {
      return {   
        colormode: [],
      };
    },
    head() {
      return {
        htmlAttrs: {
          class: this.colormode
        },
      };
    },
    mounted(){
      // ローカルストレージの取得
      if (this.$storageAvailable('localStorage')) {
          this.getLocalStorage();
      }
      else {
          console.log("ブラウザのローカルストレージがオフになっています。");
      }
      // ダークモードの初期設定
      this.darkModeSetting();
    },
    methods: {
      darkModeSetting() {
        if(this.$store.getters["darkmode/getActive"]) {
          this.colormode = [this.$store.getters["colormode/getColormode"],'darkmode']
        }else {
          this.colormode = [this.$store.getters["colormode/getColormode"]];
        }
      },
      getLocalStorage() {
            // ダークモード
            const darkmodeJson = localStorage.getItem("darkmode");
            const darkmode = JSON.parse(darkmodeJson);
            if (darkmode !== null) {
                this.$store.dispatch("darkmode/pushLocalStorage", darkmode);
            }
            // カラーモード
            const colormodeJson = localStorage.getItem("colormode");
            const colormode = JSON.parse(colormodeJson);
            if (colormode !== null) {
                this.$store.dispatch("colormode/pushLocalStorage", colormode);
            }
        },
    }
  }
</script>

<style lang="scss" scoped>
.errorWrapper {
  background-color: var(--background);
  color: var(--site-name);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-bottom: 200px;
}
.errorCode {
  font-size: 100px;
  text-align: center;
  font-weight: 400;
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
  font-size: var(--font-size-xxl);
  text-align: center;
}
.top {
  font-size: var(--font-size-md);
  text-align: center;
  text-decoration: none;
  background-color: var(--site-name);
  color: var(--background);
  margin-top: 50px;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 400;
  user-select: none;
  cursor: pointer;
}
</style>
