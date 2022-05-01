<template>
  <div class="menuBtns">
    <div class="menuBtn bookmark" :class="{ selected: !getSelectedBookmark }">
      <button v-if="getSelectedBookmark" class="menuLink" @click="clickFavorite">
        <svg
          class="buttonImage bookmarkImage"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 451.61 428.07"
          fill="transparent"
          stroke="#231815"
        >
          <title>お気に入り</title>
          <path
            d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z"
            style="stroke-miterlimit: 10; stroke-width: 40px"
          />
        </svg>
      </button>
      <div v-else class="menuLink" @click="update">
        <svg
          class="buttonImage bookmarkImage"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 451.61 428.07"
          fill="transparent"
          stroke="#231815"
        >
          <title>お気に入り</title>
          <path
            d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z"
            style="stroke-miterlimit: 10; stroke-width: 40px"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getSelectedBookmark() {
      return this.$route.query.bookmark === undefined;
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    update() {
      if (this.$store.getters['scroll/getWindowScroll'] === 0) {
        this.$emit('update');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    clickFavorite() {
      // クエリパラメーターを付加
      this.$router.push({ path: '/', query: { bookmark: 1 } });
    },
  },
};
</script>

<style lang="scss" scoped>
.menuBtns {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @include responsive(xs) {
  }
  @include responsive(sm) {
  }
  @include responsive(md) {
  }
  @include responsive(lg) {
  }
  @include responsive(xl) {
  }
  @include responsive(xxl) {
  }
}

.menuBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;

  user-select: none;
  @include hover() {
    background-color: var(--tool-button-hover);
  }
}

.menuLink {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: inherit;
  height: inherit;
  text-decoration: none;
  font-size: var(--font-size-md);
}

.homeImage {
  height: 16px;
}

.homeImageInner {
  .selected & {
    fill: var(--black-dark-forDarkMode);
  }
}

.homeImageOuter {
  fill: var(--black-dark-forDarkMode);
}

.bookmarkImage {
  height: 16px;
  transition: transform .25s;
  stroke: var(--favorite-icon-stroke);
  .selected & {
    fill: var(--favorite-icon-selected);
  }
}

.title {
  margin-left: 10px;
  color: var(--black-forDarkMode);
}

</style>
