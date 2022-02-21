<template>
  <div v-if="getDesktop" class="menuBtns">
    <!-- <div class="menuBtn home" :class="{selected: !getSelectedHome}">
      <nuxt-link v-if="getSelectedHome" class="menuLink" to="/" @click="clickHome">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" class="homeImage">
          <title>ホーム</title>
          <path class="homeImageInner" d="M324,437.62V307.73a34.36,34.36,0,0,0-34.32-34.32H219a34.36,34.36,0,0,0-34.32,34.32V437.62h-93v-172a34.36,34.36,0,0,0-34.32-34.32H34.61L254.34,21.71,474.06,231.26H451.32A34.36,34.36,0,0,0,417,265.58v172Z" fill="transparent"/>
          <path class="homeImageOuter" d="M254.34,49.35,429.1,216A54.38,54.38,0,0,0,397,265.58v152H344V307.73a54.38,54.38,0,0,0-54.32-54.32H219a54.38,54.38,0,0,0-54.32,54.32V417.62h-53v-152A54.39,54.39,0,0,0,79.58,216L254.34,49.35m0-49.35a15.47,15.47,0,0,0-10.71,4.29L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4a10.26,10.26,0,0,0,7.07-17.68L265,4.29A15.45,15.45,0,0,0,254.34,0Z" fill="#231815"/>
        </svg>
        <div class="title">ホーム</div>
      </nuxt-link>
      <div v-else class="menuLink" @click="update">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" class="homeImage">
          <title>ホーム</title>
          <path class="homeImageInner" d="M324,437.62V307.73a34.36,34.36,0,0,0-34.32-34.32H219a34.36,34.36,0,0,0-34.32,34.32V437.62h-93v-172a34.36,34.36,0,0,0-34.32-34.32H34.61L254.34,21.71,474.06,231.26H451.32A34.36,34.36,0,0,0,417,265.58v172Z" fill="transparent"/>
          <path class="homeImageOuter" d="M254.34,49.35,429.1,216A54.38,54.38,0,0,0,397,265.58v152H344V307.73a54.38,54.38,0,0,0-54.32-54.32H219a54.38,54.38,0,0,0-54.32,54.32V417.62h-53v-152A54.39,54.39,0,0,0,79.58,216L254.34,49.35m0-49.35a15.47,15.47,0,0,0-10.71,4.29L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4a10.26,10.26,0,0,0,7.07-17.68L265,4.29A15.45,15.45,0,0,0,254.34,0Z" fill="#231815"/>
        </svg>
        <div class="title">ホーム</div>
      </div>
    </div>   -->
    <div class="menuBtn bookmark" :class="{selected: !getSelectedBookmark}">
      <nuxt-link v-if="getSelectedBookmark" class="menuLink" to="/tag/bookmark" @click="clickFavorite">
        <svg class="buttonImage bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.61 428.07" fill="transparent" stroke="#231815">
          <title>お気に入り</title>
          <path d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z" style="stroke-miterlimit:10;stroke-width:40px"/>
        </svg>
        <!-- <div class="title">お気に入り</div> -->
      </nuxt-link>
      <div v-else class="menuLink" @click="update">
        <svg class="buttonImage bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.61 428.07" fill="transparent" stroke="#231815">
          <title>お気に入り</title>
          <path d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z" style="stroke-miterlimit:10;stroke-width:40px"/>
        </svg>
        <!-- <div class="title">お気に入り</div> -->
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
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  background-color: var(--menu-button);
  box-shadow: 1px 1px 5px var(--menu-button-shadow);
  z-index: 40;
  width: 55px;
  height: 55px;
  border-radius: 50px;
  /* @include hover() {
    &:after {
      width: 100%;
    }
  }
  &:after {
    content: '';
    width: 0;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--color);
    transition: width .25s;
  } */
  /* &.home {
    top: 35px;
    left: 170px;
  } */
  &.bookmark {
    top: 85px;
    right: 170px;
  }
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    /* &.home {
      top: 25px;
      left: 140px;
    } */
    &.bookmark {
      top: 70px;
      right: 140px;
    }
  }
  @include responsive(lg) {
    /* &.home {
      top: 35px;
      left: 160px;
    } */
    &.bookmark {
      top: 85px;
      right: 160px;
    }
  }
  @include responsive(xl) {
    /* &.home {
      top: 60px;
      left: 170px;
    } */
    &.bookmark {
      top: 60px;
      right: 40px;
    }
  }
  @include responsive(xxl) {
    
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
