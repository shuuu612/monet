<template>
  <div>
    <header class="header">
      <div class="topMenu" :class="[getOpen]">
        <h1 class="logo">
          <nuxt-link class="logoLink" to="/">
            <svg class="logoImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.49 37.29">
              <defs>
                <linearGradient id="Gradient">
                  <stop offset="0%" stop-color="#005c97"/>
                  <stop offset="100%" stop-color="#363795"/>
                </linearGradient>
              </defs>
              <text class="logoImgColor" transform="translate(0.57 27.96)" style="font-size:33.68355941772461px;font-family:Bilo-MediumItalic, Bilo;font-weight:500;font-style:italic" fill="url(#Gradient)">SUUGO</text>
            </svg>
          </nuxt-link>
        </h1>
        <Search />
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    /* getScrollHide() {
      return { scrollHide: this.$store.getters['scroll/getWindowScroll'] > 0 || this.$store.getters['modal/getOpen']}
    }, */
    getOpen() {
      return { isOpen: this.$store.getters['sideMenu/getOpen'] }
    },
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
  },
  
};
</script>

<style lang="scss" scoped>


.topMenu {
  /* position: fixed;
  top: 0;
  right: 0; */
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
  transition: transform .2s, opacity .2s;
  opacity: 1;
  &.isOpen {
    transform: translateX(calc(0.5 * var(--sideMenuWidth)));
  }
  &.scrollHide {
    opacity: 0;
    visibility: hidden;
  }
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    height: 100px;
  }
  @include responsive(md) {
    height: 120px;
    margin-left: 25px;
  }
  @include responsive(lg) {
    margin-left: 0px;
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.logo {
  width: 100px;
  padding-top: 5px;
  @include responsive(xs) {
    width: 110px;
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    width: 120px;
  }
  @include responsive(lg) {
    
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}


.logoLink {
  display: block;
  width: inherit;
}

.logoImg {
  display: block;
  width: inherit;
}
.logoImgColor {
  /* fill: var(--header-logo); */
}

</style>