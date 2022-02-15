<template>
  <div v-if="getMobile" class="menuBtns">
    <button class="menuBtn" :class="[getOpen,getSelected('menu')]" @click="clickButton">
      <div class="icon">
        <div class="bars">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <!-- <svg class="openImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485.26 289.43"  fill="#231815">
          <polygon points="485.26 144.71 292.33 0 292.33 92.26 0 92.26 0 197.16 292.33 197.16 292.33 289.43 485.26 144.71"/>
        </svg> -->
      </div>
      <div class="title">メニュー</div>
    </button>
    <button class="menuBtn link" :class="getSelected('home')" @click="setClose">
      <nuxt-link v-if="getSelectedHome" class="menuLink" to="/">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" class="homeImage">
            <path class="homeImageInner" d="M324,437.62V307.73a34.36,34.36,0,0,0-34.32-34.32H219a34.36,34.36,0,0,0-34.32,34.32V437.62h-93v-172a34.36,34.36,0,0,0-34.32-34.32H34.61L254.34,21.71,474.06,231.26H451.32A34.36,34.36,0,0,0,417,265.58v172Z" fill="transparent"/>
            <path class="homeImageOuter" d="M254.34,49.35,429.1,216A54.38,54.38,0,0,0,397,265.58v152H344V307.73a54.38,54.38,0,0,0-54.32-54.32H219a54.38,54.38,0,0,0-54.32,54.32V417.62h-53v-152A54.39,54.39,0,0,0,79.58,216L254.34,49.35m0-49.35a15.47,15.47,0,0,0-10.71,4.29L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4a10.26,10.26,0,0,0,7.07-17.68L265,4.29A15.45,15.45,0,0,0,254.34,0Z" fill="#231815"/>
          </svg>
        </div>
        <div class="title">ホーム</div>
      </nuxt-link>
      <div v-else class="menuLink" @click="update">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" class="homeImage">
            <path class="homeImageInner" d="M324,437.62V307.73a34.36,34.36,0,0,0-34.32-34.32H219a34.36,34.36,0,0,0-34.32,34.32V437.62h-93v-172a34.36,34.36,0,0,0-34.32-34.32H34.61L254.34,21.71,474.06,231.26H451.32A34.36,34.36,0,0,0,417,265.58v172Z" fill="transparent"/>
            <path class="homeImageOuter" d="M254.34,49.35,429.1,216A54.38,54.38,0,0,0,397,265.58v152H344V307.73a54.38,54.38,0,0,0-54.32-54.32H219a54.38,54.38,0,0,0-54.32,54.32V417.62h-53v-152A54.39,54.39,0,0,0,79.58,216L254.34,49.35m0-49.35a15.47,15.47,0,0,0-10.71,4.29L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4a10.26,10.26,0,0,0,7.07-17.68L265,4.29A15.45,15.45,0,0,0,254.34,0Z" fill="#231815"/>
          </svg>
        </div>
        <div class="title">ホーム</div>
      </div>
    </button>
    <button class="menuBtn link" :class="getSelected('favorite')" @click="setClose">
        <nuxt-link v-if="getSelectedBookmark" class="menuLink" to="/tag/bookmark">
          <div class="icon">
            <svg class="bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.61 428.07" fill="transparent" stroke="#231815">
              <path d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z" style="stroke-miterlimit:10;stroke-width:40px"/>
            </svg>
          </div>
          <div class="title">お気に入り</div>
        </nuxt-link>
        <div v-else class="menuLink" @click="update">
          <div class="icon">
            <svg class="bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.61 428.07" fill="transparent" stroke="#231815">
              <path d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z" style="stroke-miterlimit:10;stroke-width:40px"/>
            </svg>
          </div>
          <div class="title">お気に入り</div>
        </div>
    </button>
    <button class="menuBtn" :class="getSelected('search')" @click="clickSearch">
      <div class="icon">
        <svg class="searchImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393.47 393.47" fill="#000000">
          <path d="M383.52,335.43l-102-102c36.94-58.86,29.95-137.61-21.23-188.8-59.45-59.45-156.19-59.46-215.65,0s-59.45,156.19,0,215.65c51.19,51.17,129.94,58.18,188.81,21.24l102,102a34,34,0,1,0,48.08-48.09ZM232.77,232.76a113.64,113.64,0,1,1,0-160.71A113.77,113.77,0,0,1,232.77,232.76Z"/>
        </svg>
      </div>
      <div class="title">検索</div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default: undefined,
    },
    sort: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {

    };
  },
  computed: {
    getScrollHideSide() {
      return  { scrollHide: this.$store.getters['scroll/getSideMenuScroll'] > 50 && this.$store.getters['sideMenu/getOpen']}
    },
    getOpen() {
      return  { open: this.$store.getters['sideMenu/getOpen']}
    },
    getSelectedHome() {
      return !(this.tag === undefined && this.sort === undefined)
    },
    getSelectedBookmark() {
      return this.tag !== 'bookmark'
    },
    getMobile() {
      return this.$store.getters['windowSize/getWindowWidth'] < 768
    },
    getSelected() {
      return function(key) {
        if(key === 'menu') {
          return { selected: this.$store.getters['sideMenu/getOpen']}
        }else if(key === 'home') {
          return { selected: this.tag === undefined && this.sort === undefined}
        }else if(key === 'favorite') {
          return { selected: this.tag === 'bookmark'}
        }else if(key === 'search') {
          return { selected: this.$store.getters['search/getOpen']}
        }
      }
    }
  },
  created() {

  },
  mounted() {
    
  },
  beforeDestroy() {

  },
  methods: {
    clickButton() {
      this.$store.dispatch('sideMenu/pushOpen')
      this.$store.dispatch('slider/pushDecidedSteps');
    },
    update() {
      if(this.$store.getters['scroll/getWindowScroll'] === 0) {
        this.$emit('update')
      }else {
        window.scrollTo ({top: 0,behavior: "smooth"})
      }
    },
    setClose() {
      if(this.$store.getters['sideMenu/getOpen']) {
        this.$store.dispatch("sideMenu/pushOpen");
      }
    },
    clickSearch() {
      this.$store.dispatch('search/pushOpen')
    }
  },
  
};
</script>

<style lang="scss" scoped>
.menuBtns {
  width: 100%;
  height: 45px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: var(--color-dark-transparent-low);
  z-index: 110;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.menuBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 4px 0;
  @include hover() {
    background-color: var(--white-transparent-high);
  }
  &.selected {
    background-color: var(--white-transparent-high);
  }
  &.link {
    padding: 0;
  }
}
.icon {
  height: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
}
.title {
  height: 35%;
  font-size: var(--font-size-xxs);
  color: var(--white);
}


.menuLink {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-decoration: none;
  font-size: var(--font-size-md);
  padding: 4px 0;
}

.homeImage {
  height: 16px;
}
.homeImageInner {
  .selected & {
    fill: var(--white);
  }
}
.homeImageOuter {
  fill: var(--white);
}
.bookmarkImage {
  height: 16px;
  stroke: var(--white);
  .selected & {
    fill: var(--white);
  }
}

.openImage {
  width: 22px;
  fill: var(--white);
  transition: transform .2s;
  .open & {
    transform: rotate(-180deg);
  }
}

.searchImage {
  width: 16px;
  fill: var(--white);
}

// ハンバーガーメニュー
.bars {
  position: relative;
  width: 20px;
  height: 16px;
}

.bar {
  background-color: var(--white);;
  width: inherit;
  height: 2px;
  position: absolute;
  transition: transform .3s;
  display: block;
  border-radius: 5px;
  &:nth-child(1) {
    top: 0;
    left: 0;
  }
  &:nth-child(2) {
    top: 7px;
    left: 0;
  }
  &:nth-child(3) {
    top: 14px;
    left: 0;
  }
  .open & {
    background-color: var(--white);
    &:nth-child(1) {
      top: 8px;
      left: 0;
      transform: rotate(135deg);
    }
    &:nth-child(2) {
      display: none;
    }
    &:nth-child(3) {
      top: 8px;
      left: 0;
      transform: rotate(-135deg);
    }
  }
}

</style>
