<template>
  <div v-if="getDesktop" class="menuBtns">
    <div class="menuBtn bookmark" :class="{selected: !getSelectedBookmark}">
      <nuxt-link v-if="getSelectedBookmark" class="menuLink" to="/tag/bookmark" @click="clickFavorite">
        <svg class="buttonImage bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.61 428.07" fill="transparent" stroke="#231815">
          <title>お気に入り</title>
          <path d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z" style="stroke-miterlimit:10;stroke-width:40px"/>
        </svg>
      </nuxt-link>
      <div v-else class="menuLink" @click="update">
        <svg class="buttonImage bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.61 428.07" fill="transparent" stroke="#231815">
          <title>お気に入り</title>
          <path d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z" style="stroke-miterlimit:10;stroke-width:40px"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    getSelectedHome() {
      return !(this.$store.getters['url/getTag'] === '' && this.$store.getters['url/getSort'] === '')
    },
    getSelectedBookmark() {
      return this.$store.getters['url/getTag'] !== 'bookmark'
    },
    getDesktop() {
      return this.$store.getters['windowSize/getWindowWidth'] >= 768
    },
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    update() {
      if(this.$store.getters['scroll/getWindowScroll'] === 0) {
        this.$emit('update')
      }else {
        window.scrollTo ({top: 0,behavior: "smooth"})
      }
    },
    clickHome() {
      this.$store.dispatch("status/pushSearchTag");
    },
    clickFavorite() {
      this.$store.dispatch("status/pushSearchTag");
    }
  },
};
</script>

<style lang="scss" scoped>
.menuBtns {
  display: flex;
  align-items: center;
  justify-content: center;

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
  user-select: none;
  cursor: pointer;
  z-index: 40;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  
  @include hover() {
    background-color: var(--tool-button-hover);
  }
}

.menuLink {
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: var(--font-size-md);
  padding: 5px;
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
  stroke: var(--favorite-icon-stroke);
  transition: transform .25s;
  .selected & {
    fill: var(--favorite-icon-selected);
  }
}

.title {
  margin-left: 10px;
  color: var(--black-forDarkMode);
}
</style>
