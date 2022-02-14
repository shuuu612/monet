<template>
  <div>
    <header class="header">
      <div class="topMenu" :class="[getOpen]">
        <h1 class="logo">
          <nuxt-link class="logoLink" to="/">
            <svg class="logoImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.68 22.48" fill="url(#Gradient)">
              <title>すごーいデザイン</title>
              <defs>
                <linearGradient id="Gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100%" y2="0">
                  <stop class="gradationStart" offset="0%" stop-color="#005c97"/>
                  <stop class="gradationEnd" offset="100%" stop-color="#363795"/>
                </linearGradient>
              </defs>
              <path d="M.08,3.09,0,1.61l3.42-.12L3.33,0,5,.07l-.12,1.5,2.31-.08,0,1.41L4.63,2.73l0,.9a2.19,2.19,0,0,1,.47,1.91A2.58,2.58,0,0,1,3.35,8.72a3.73,3.73,0,0,0,.55-2,1.62,1.62,0,0,1-2.09-1.4A1.58,1.58,0,0,1,3.43,3.59V3ZM3.41,4.61c-.16,0-.34.08-.36.45a.37.37,0,0,0,.26.42c.18,0,.37-.07.4-.44S3.56,4.62,3.41,4.61Z"/>
              <path d="M15.55,1.12s-.79,1.79-1.2,2.74c0,0-.26-.91-.41-1.35a24,24,0,0,0-3.87.09L9.9,1.09S14.37,1,15.55,1.12Zm-.8,4.52.1,2a9.11,9.11,0,0,1-4.66-.1,17.33,17.33,0,0,1,.35-2A4.86,4.86,0,0,0,14.75,5.64ZM16.88,2a2.92,2.92,0,0,0-.53.19l-.23-.94.76-.14Zm.35-.91L18,1l-.07.89a4.77,4.77,0,0,0-.53.19Z"/>
              <path d="M20.31,3.3c3,0,11.21.07,12.84,0l-.22,1.62s-6.65,0-12.25,0Z"/>
              <path d="M36.9,2.49l1.66-.25A8.2,8.2,0,0,0,38.91,5l1.32-.29a15,15,0,0,0-1.92,2.26S36.94,5.78,36.9,2.49Zm6.55,2.77a4.57,4.57,0,0,0-.9-3l1.57-.38a8.81,8.81,0,0,1,.4,4.88,20.84,20.84,0,0,0-2.09-1.36S43.15,5.28,43.45,5.26Z"/>
              <path d="M5,22.26a17.05,17.05,0,0,1-1.62-.6c-.51-.22-1-.48-1.55-.77a10.67,10.67,0,0,0,1.84-2.05,8,8,0,0,0,1.08-2.29c-.45,0-1,.05-1.55.11l-2.16.27L1,15.58l2.29-.07,2.12,0,2.23,0h2.61l-.05,1.32c-1.18-.1-2.15-.16-2.9-.18a12.09,12.09,0,0,1-.42,2.14,12.08,12.08,0,0,1-.76,2A8.25,8.25,0,0,1,5,22.26Zm2.4-8.48c-.28,0-.69.05-1.24.07l-1.95,0H1.84l0-1.28c.69.06,1.34.1,2,.13S5,12.8,5.5,12.8l1.06,0a8.08,8.08,0,0,0,.83-.08Zm.38,1.13c0-.25,0-.53,0-.85s0-.65-.06-1,0-.63-.09-.91l1.52-.11c.08.89.16,1.79.21,2.69Zm1.85-.21c0-.22,0-.49,0-.81s0-.63-.06-1,0-.63-.06-.9L10.93,12c0,.32.08.69.11,1.12s.06.94.09,1.55Z"/>
              <path d="M17.94,22.48l-1.63-1.12a16.45,16.45,0,0,0,1.38-1.89,7.82,7.82,0,0,0,.79-1.73,7.69,7.69,0,0,0,.33-1.84h-1c-.34,0-.64,0-.89,0,0,.64.06,1.28.1,1.92L14.9,18c0-.26-.07-.54-.1-.83s-.06-.59-.09-.92l-.92.16c-.33.06-.68.14-1.06.23l-.12-1.45,2-.15c0-.24,0-.51,0-.82s0-.59,0-.85,0-.45,0-.56c.37,0,.75-.06,1.13-.08l1.15,0c0,.75,0,1.48,0,2.2l1,0h1.05c0-.59,0-1.06,0-1.4s0-.68-.05-1l.84,0v2.37h1.58v.15l.53,0,.68,0,.51.05-.14,1.35L22,16.26c-.29-.05-.6-.09-.91-.12a11.5,11.5,0,0,1-.5,2.42,8.5,8.5,0,0,1-1,2A10.44,10.44,0,0,1,17.94,22.48Zm2.09-8V12l1.35,0c0,.46,0,.92,0,1.36s0,.85,0,1.2Zm3,0-1.34,0V13.7c0-.31,0-.62,0-.93s0-.59,0-.83L23,12q0,.45,0,1.17C23.07,13.6,23.07,14.08,23.07,14.56Z"/>
              <path d="M29.1,22.3c0-1,0-1.88,0-2.75s-.07-1.76-.13-2.68c-.49.37-1,.76-1.46,1.17s-1,.83-1.47,1.28l-1.21-1.47a37.33,37.33,0,0,1,3.31-3.23,38.33,38.33,0,0,1,3.74-2.85c.52.72,1,1.45,1.5,2.19-.79.46-1.52.91-2.17,1.33s-1.24.83-1.76,1.22l1.95-.07c0,.46.07,1,.09,1.51s0,1.1,0,1.67,0,.91,0,1.35,0,.87-.06,1.27Z"/>
              <path d="M35.06,15l.07-2c.45,0,.92.06,1.42.11s1,.09,1.45.15.9.13,1.26.2L39,15c-.62,0-1.27,0-2,0S35.72,15,35.06,15Zm2.4,7c-.35-.35-.67-.7-1-1.07s-.6-.72-.88-1.09a36.55,36.55,0,0,0,3.94-2.68,24.91,24.91,0,0,0,3.06-2.84l1.21.93A21.23,21.23,0,0,1,37.46,22Z"/>
            </svg>
          </nuxt-link>
        </h1>
        <Search
        @search="passToTheTop"
        />
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
    passToTheTop() {
      this.$emit('search')
    }
  },
  
};
</script>

<style lang="scss" scoped>


.topMenu {
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
  transition: transform .25s ease-in;
  &.isOpen {
    transform: translateX(calc(0.5 * var(--sideMenuWidth)));
    transition: transform .25s ease-out;
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
    height: 140px;
    margin-left: 0px;
  }
  @include responsive(xl) {
    height: 150px;
  }
  @include responsive(xxl) {
    height: 160px;
  }
}

.logo {
  width: 100px;
  padding-top: 5px;
  @include responsive(xs) {
    width: 130px;
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    width: 140px;
  }
  @include responsive(lg) {
    width: 160px;
  }
  @include responsive(xl) {
    width: 180px;
  }
  @include responsive(xxl) {
    width: 200px;
  }
}


.logoLink {
  display: block;
  /* width: inherit; */
  padding: 8px;
}

.logoImg {
  display: block;
  width: inherit;
  fill: var(--black-forDarkMode);
}

.gradationStart {
  stop-color : var(--gradation-start);
}
.gradationEnd {
  stop-color : var(--gradation-end);
}

</style>