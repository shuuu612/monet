<template>
  <div v-if="getMobile" class="menuBtns">
    <button class="menuBtn" :class="{selected: !getSelectedHome}" @click="setClose">
      <nuxt-link v-if="getSelectedHome" class="menuLink" to="/">
        <!-- <svg class="homeImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" fill="#040000">
          <path d="M505.47,233.58,265,4.29a15.5,15.5,0,0,0-21.41,0L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4A10.26,10.26,0,0,0,505.47,233.58Z"/>
        </svg> -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" class="homeImage">
          <path class="homeImageInner" d="M324,437.62V307.73a34.36,34.36,0,0,0-34.32-34.32H219a34.36,34.36,0,0,0-34.32,34.32V437.62h-93v-172a34.36,34.36,0,0,0-34.32-34.32H34.61L254.34,21.71,474.06,231.26H451.32A34.36,34.36,0,0,0,417,265.58v172Z" fill="transparent"/>
          <path class="homeImageOuter" d="M254.34,49.35,429.1,216A54.38,54.38,0,0,0,397,265.58v152H344V307.73a54.38,54.38,0,0,0-54.32-54.32H219a54.38,54.38,0,0,0-54.32,54.32V417.62h-53v-152A54.39,54.39,0,0,0,79.58,216L254.34,49.35m0-49.35a15.47,15.47,0,0,0-10.71,4.29L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4a10.26,10.26,0,0,0,7.07-17.68L265,4.29A15.45,15.45,0,0,0,254.34,0Z" fill="#231815"/>
        </svg>
      </nuxt-link>
      <div v-else class="menuLink" @click="$moveTop">
        <!-- <svg class="homeImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" fill="#040000">
          <path d="M505.47,233.58,265,4.29a15.5,15.5,0,0,0-21.41,0L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4A10.26,10.26,0,0,0,505.47,233.58Z"/>
        </svg> -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" class="homeImage">
          <path class="homeImageInner" d="M324,437.62V307.73a34.36,34.36,0,0,0-34.32-34.32H219a34.36,34.36,0,0,0-34.32,34.32V437.62h-93v-172a34.36,34.36,0,0,0-34.32-34.32H34.61L254.34,21.71,474.06,231.26H451.32A34.36,34.36,0,0,0,417,265.58v172Z" fill="transparent"/>
          <path class="homeImageOuter" d="M254.34,49.35,429.1,216A54.38,54.38,0,0,0,397,265.58v152H344V307.73a54.38,54.38,0,0,0-54.32-54.32H219a54.38,54.38,0,0,0-54.32,54.32V417.62h-53v-152A54.39,54.39,0,0,0,79.58,216L254.34,49.35m0-49.35a15.47,15.47,0,0,0-10.71,4.29L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4a10.26,10.26,0,0,0,7.07-17.68L265,4.29A15.45,15.45,0,0,0,254.34,0Z" fill="#231815"/>
        </svg>
      </div>
    </button>
    <button class="menuBtn" :class="{selected: !getSelectedBookmark}" @click="setClose">
      <nuxt-link v-if="getSelectedBookmark" class="menuLink" to="/tag/bookmark">
        <svg class="bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.61 428.07" fill="transparent" stroke="#231815">
          <path d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z" style="stroke-miterlimit:10;stroke-width:40px"/>
        </svg>
      </nuxt-link>
      <div v-else class="menuLink" @click="redisplay">
        <svg class="bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.61 428.07" fill="transparent" stroke="#231815">
          <path d="M328.66,20C282,20,244.47,43.3,225.55,83.13,206.7,43.3,169.53,20,123.42,20,66.39,20,20,65.5,20,121.42,20,186,57.06,233.7,95,277,132,319,203.44,390.25,220.41,406.24a6.76,6.76,0,0,0,4.62,1.83h1a6.76,6.76,0,0,0,4.62-1.83C248.93,389,320.58,317.9,356.53,277c38-43.35,75.08-91.08,75.08-155.59C431.61,64.56,386.4,20,328.66,20Z" style="stroke-miterlimit:10;stroke-width:40px"/>
        </svg>
      </div>
    </button>
    <button class="menuBtn" :class="getOpen" @click="clickButton">
      <div class="bars">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </button>




    <!-- <button class="menuBtn main" :class="[getScrollHideSide, getOpen]" @click="clickButton">
      <div class="bars">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </button>
    <div class="menuBtn sub">
      <nuxt-link v-if="getSelectedHome" class="menuLink" to="/">
        <svg class="buttonImage homeImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" fill="#040000">
          <path d="M505.47,233.58,265,4.29a15.5,15.5,0,0,0-21.41,0L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4A10.26,10.26,0,0,0,505.47,233.58Z"/>
        </svg>
      </nuxt-link>
      <div v-else class="menuLink" @click="$moveTop">
        <svg class="buttonImage homeImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.67 457.62" fill="#040000">
          <path d="M505.47,233.58,265,4.29a15.5,15.5,0,0,0-21.41,0L3.2,233.58a10.26,10.26,0,0,0,7.08,17.68H57.35a14.32,14.32,0,0,1,14.32,14.32V443.31A14.32,14.32,0,0,0,86,457.62H190.36a14.32,14.32,0,0,0,14.32-14.31V307.73A14.32,14.32,0,0,1,219,293.41h70.67A14.32,14.32,0,0,1,304,307.73V443.31a14.32,14.32,0,0,0,14.32,14.31H422.68A14.32,14.32,0,0,0,437,443.31V265.58a14.32,14.32,0,0,1,14.32-14.32H498.4A10.26,10.26,0,0,0,505.47,233.58Z"/>
        </svg>
      </div>
    </div>  
    <div class="menuBtn sub">
      <nuxt-link v-if="getSelectedBookmark" class="menuLink" to="/tag/bookmark">
        <svg class="buttonImage bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350.55 435.76" fill="#040000">
          <path d="M309.55,41V355.57L199.28,275.93l-24-17.34-24,17.34L41,355.57V41H309.55M336,0H14.61A14.61,14.61,0,0,0,0,14.61V435.76L175.28,309.17,350.55,435.76V14.61A14.61,14.61,0,0,0,336,0Z" />
        </svg>
      </nuxt-link>
      <div v-else class="menuLink" @click="redisplay">
        <svg class="buttonImage bookmarkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350.55 435.76" fill="#040000">
          <path d="M309.55,41V355.57L199.28,275.93l-24-17.34-24,17.34L41,355.57V41H309.55M336,0H14.61A14.61,14.61,0,0,0,0,14.61V435.76L175.28,309.17,350.55,435.76V14.61A14.61,14.61,0,0,0,336,0Z" />
        </svg>
      </div>
    </div> -->
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
    },
    redisplay() {
      this.$store.dispatch("redisplay/pushRedisplay")
    },
    setClose() {
      if(this.$store.getters['sideMenu/getOpen']) {
        this.$store.dispatch("sideMenu/pushOpen");
      }
    }
  },
  
};
</script>

<style lang="scss" scoped>
.menuBtns {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: var(--black-transparent-low);
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menuBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
}


.menuLink {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: var(--font-size-md);
}

.bars {
  position: relative;
  width: 18px;
  height: 18px;
}

.bar {
  background-color: var(--main-button-bar-close);
  width: inherit;
  height: 2px;
  position: absolute;
  transition: transform .3s;
  display: block;
  border-radius: 5px;
  &:nth-child(1) {
    top: 8px;
    left: 0;
    transform: rotate(90deg)
  }
  &:nth-child(2) {
    display: none;
  }
  &:nth-child(3) {
    top: 8px;
    left: 0;
  }
  .open & {
    background-color: var(--main-button-bar-open);
    &:nth-child(1) {
      top: 8px;
      left: 0;
      transform: rotate(45deg);
    }
    &:nth-child(2) {
      display: none;
    }
    &:nth-child(3) {
      top: 8px;
      left: 0;
      transform: rotate(-45deg);
    }
  }
}

// ハンバーガーメニュー
/* .bars {
  position: relative;
  width: 22px;
  height: 18px;
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
    top: 8px;
    left: 0;
  }
  &:nth-child(3) {
    top: 16px;
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
} */

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

</style>