<template>
  <div v-if="getDesktop">
    <div class="menuBtns" :class="getHide">
      <div class="menuBtn home" :class="{selected: !getSelectedHome}">
        <nuxt-link v-if="getSelectedHome" class="menuLink" to="/" @click="clickHome">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" class="homeImage">
            <title>ホーム</title>
            <path class="homeImageInner" d="M324,437.62V307.73a34.36,34.36,0,0,0-34.32-34.32H219a34.36,34.36,0,0,0-34.32,34.32V437.62h-93v-172a34.36,34.36,0,0,0-34.32-34.32H34.61L254.34,21.71,474.06,231.26H451.32A34.36,34.36,0,0,0,417,265.58v172Z" fill="transparent"/>
            <path class="homeImageOuter" d="M254.34,49.35,429.1,216A54.38,54.38,0,0,0,397,265.58v152H344V307.73a54.38,54.38,0,0,0-54.32-54.32H219a54.38,54.38,0,0,0-54.32,54.32V417.62h-53v-152A54.39,54.39,0,0,0,79.58,216L254.34,49.35m0-49.35a15.47,15.47,0,0,0-10.71,4.29L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4a10.26,10.26,0,0,0,7.07-17.68L265,4.29A15.45,15.45,0,0,0,254.34,0Z" fill="#231815"/>
          </svg>
        </nuxt-link>
        <div v-else class="menuLink" @click="update">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" class="homeImage">
            <title>ホーム</title>
            <path class="homeImageInner" d="M324,437.62V307.73a34.36,34.36,0,0,0-34.32-34.32H219a34.36,34.36,0,0,0-34.32,34.32V437.62h-93v-172a34.36,34.36,0,0,0-34.32-34.32H34.61L254.34,21.71,474.06,231.26H451.32A34.36,34.36,0,0,0,417,265.58v172Z" fill="transparent"/>
            <path class="homeImageOuter" d="M254.34,49.35,429.1,216A54.38,54.38,0,0,0,397,265.58v152H344V307.73a54.38,54.38,0,0,0-54.32-54.32H219a54.38,54.38,0,0,0-54.32,54.32V417.62h-53v-152A54.39,54.39,0,0,0,79.58,216L254.34,49.35m0-49.35a15.47,15.47,0,0,0-10.71,4.29L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4a10.26,10.26,0,0,0,7.07-17.68L265,4.29A15.45,15.45,0,0,0,254.34,0Z" fill="#231815"/>
          </svg>
        </div>
      </div>  
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
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowHeight: 0,
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
    getHide() {
      return {hide: !(this.$store.getters['scroll/getWindowScroll'] > this.windowHeight)}
    },
  },
  created() {

  },
  mounted() {
    this.setWindowHeight()
    window.addEventListener("resize",this.setWindowHeight)
  },
  beforeDestroy() {
    window.removeEventListener("resize",this.setWindowHeight)
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
    },
    setWindowHeight() {
      this.windowHeight = document.documentElement.clientHeight
    }
  },
  
};
</script>

<style lang="scss" scoped>
.menuBtns {
  position: fixed;
  bottom: 150px;
  right: 40px;
  width: 60px;
  height: 120px;
  border-radius: 50px;
  box-shadow: 1px 1px 5px var(--menu-button-shadow);
  background-color: var(--menu-button);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: transform .4s;
  transform: translateY(0);
  &.hide {
    transform: translateY(280px);
  }
}
.menuBtn {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  background-color: transparent;
  z-index: 40;
  transition: transform .25s;
  @include hover() {
    transform: translateY(2px);
  }
  &:first-child {
    margin-bottom: 10px;
  }
}

.menuLink {
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  /* color: var(--white); */
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
  stroke: var(--black-dark-forDarkMode);
  .selected & {
    fill: var(--black-dark-forDarkMode);
  }
}

.title {
  margin-left: 10px;
  color: var(--black-forDarkMode);
}

</style>
