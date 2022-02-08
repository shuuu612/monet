<template>
  <div>
    <header class="header">
      <div class="topMenu" :class="[getOpen]">
        <h1 class="logo">
          <nuxt-link class="logoLink" to="/">
            <svg class="logoImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.32 22.9" fill="url(#Gradient)">
              <title>SUUGO</title>
              <defs>
                <linearGradient id="Gradient">
                  <stop offset="0%" stop-color="#005c97"/>
                  <stop offset="100%" stop-color="#363795"/>
                </linearGradient>
              </defs>
              <path d="M0,19.2l3-2.5a6.35,6.35,0,0,0,5.49,2.83c2.76,0,4.68-1.65,4.68-3.6,0-1.28-.77-2-2.36-2.53l-2.19-.7C5.86,11.79,4.58,10,4.58,7.58,4.58,3.33,8.76,0,13.77,0c3.14,0,5.9,1.25,7.08,3.27l-3,2.56a5.15,5.15,0,0,0-4.65-2.46C10.61,3.37,8.76,5,8.76,6.9c0,1.32.77,2.13,2.35,2.63l2.19.71c2.76.87,4.08,2.59,4.08,5C17.38,19.6,13,22.9,8,22.9,4.48,22.9,1.25,21.32,0,19.2Z"/>
              <path d="M21.93,16.06a10.44,10.44,0,0,1,.37-2.72l3.5-13h4.14l-3.6,13.43a8.5,8.5,0,0,0-.3,2c0,2.36,1.41,3.64,3.9,3.64s4.62-1.32,5.56-4.85L39.3.34h4.15L39.64,14.51c-1.55,5.8-4.58,8.39-10,8.39C25.06,22.9,21.93,20.58,21.93,16.06Z"/>
              <path d="M44.7,16.06a10.44,10.44,0,0,1,.37-2.72l3.5-13h4.14l-3.6,13.43a8.5,8.5,0,0,0-.3,2c0,2.36,1.41,3.64,3.9,3.64s4.62-1.32,5.56-4.85L62.07.34h4.15L62.41,14.51c-1.55,5.8-4.58,8.39-10,8.39C47.83,22.9,44.7,20.58,44.7,16.06Z"/>
              <path d="M67,13.5C67,6.57,72.85,0,79.79,0a8.14,8.14,0,0,1,8,5.49l-3.6,2c-1-2.66-2.29-3.94-4.68-3.94-4.85,0-8.18,5.29-8.18,10.21,0,3.67,1.88,5.69,5,5.69a8.17,8.17,0,0,0,3.14-.61,3.11,3.11,0,0,0,1.92-2.39l1.41-5.22h4L84.47,20a12.24,12.24,0,0,1-8.21,2.93C70.3,22.9,67,18.72,67,13.5Z"/>
              <path d="M89.93,13.64C89.93,6.57,95.83,0,102.6,0c5.42,0,8.72,4.24,8.72,9.26,0,7.07-5.93,13.64-12.66,13.64C93.23,22.9,89.93,18.66,89.93,13.64Zm17-4.72c0-3.3-1.75-5.42-4.71-5.42-4.68,0-8,5.32-8,10.48,0,3.3,1.75,5.42,4.71,5.42C103.67,19.4,107,14.08,107,8.92Z"/>
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