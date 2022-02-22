<template>
  <div v-if="getDesktop">
    <div class="buttons" :class="[getDarkMode,getUnset]" :style="getStyle">
      <div class="button">
        <button class="darkButton" @click="clickDark">
          <svg class="darkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326.86 340.32" fill="#231815">
            <path d="M202.61,0a173,173,0,0,1,20.62,82.16A173.82,173.82,0,0,1,0,248.74,173.76,173.76,0,1,0,202.61,0Z"/>
          </svg>
        </button>
      </div>
      <div class="button">
        <button class="lightButton" @click="clickLight">
          <svg class="lightImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402.86 393.73" fill="#231815">
            <path d="M201,308.11A111.25,111.25,0,1,1,312.19,196.86,111.37,111.37,0,0,1,201,308.11Zm0-199.49a88.25,88.25,0,1,0,88.24,88.24A88.34,88.34,0,0,0,201,108.62Z"/>
            <path d="M201,61.22a10.5,10.5,0,0,1-10.5-10.5V10.5a10.5,10.5,0,0,1,21,0V50.72A10.5,10.5,0,0,1,201,61.22Z"/>
            <path d="M201,393.73a10.5,10.5,0,0,1-10.5-10.5V343a10.5,10.5,0,0,1,21,0v40.23A10.5,10.5,0,0,1,201,393.73Z"/>
            <path d="M392.36,207.36H352.13a10.5,10.5,0,0,1,0-21h40.23a10.5,10.5,0,0,1,0,21Z"/>
            <path d="M50.72,207.36H10.5a10.5,10.5,0,0,1,0-21H50.72a10.5,10.5,0,0,1,0,21Z"/>
            <path d="M304.78,104.53a10.5,10.5,0,0,1-7.36-18l28.67-28.21a10.5,10.5,0,1,1,14.73,15l-28.67,28.21A10.5,10.5,0,0,1,304.78,104.53Z"/>
            <path d="M67.76,337.72a10.5,10.5,0,0,1-7.36-18l28.67-28.21a10.5,10.5,0,0,1,14.73,15L75.13,334.71A10.49,10.49,0,0,1,67.76,337.72Z"/>
            <path d="M334.85,343.46a10.43,10.43,0,0,1-7.48-3.13l-28.21-28.67a10.5,10.5,0,1,1,15-14.73l28.21,28.67a10.49,10.49,0,0,1-7.48,17.86Z"/>
            <path d="M95.25,99.94a10.46,10.46,0,0,1-7.48-3.14L59.56,68.13a10.5,10.5,0,0,1,15-14.73l28.21,28.67a10.51,10.51,0,0,1-7.49,17.87Z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="mask" :class="getDarkModeChanging"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lightToDark: false,
      darkToLight: false,
      unset: true,
    };
  },
  computed: {
    getDesktop() {
      return this.$store.getters['windowSize/getWindowWidth'] >= 768
    },
    getDarkMode() {
      return { light: !this.$store.getters['darkmode/getActive'], dark: this.$store.getters['darkmode/getActive'] }
    },
    getDarkModeChanging() {
      return { lightToDark: this.lightToDark, darkToLight: this.darkToLight }
    },
    getStyle() {
      return { transform: `rotateZ(${180*this.$store.getters['darkmode/getClickCount']+45}deg)`}
    },
    getUnset() {
      return { unset: this.unset }
    },
  },
  created() {
  },
  mounted() {
    setTimeout(()=>{this.unset = false},10)
  },
  beforeDestroy() {
    
  },
  methods: {
    clickLight() {
      this.$store.dispatch("darkmode/pushCountUp")
      this.lightToDark = true;
      setTimeout(()=>{this.lightToDark = false},2500)
      setTimeout(()=>{this.$store.dispatch("darkmode/pushDarkmodeOnForPage")},1250)
      
    },
    clickDark(){
      this.$store.dispatch("darkmode/pushCountUp")
      this.darkToLight = true;
      setTimeout(()=>{this.darkToLight = false},2500)
      setTimeout(()=>{this.$store.dispatch("darkmode/pushDarkmodeOffForPage")},1250)
    },
  },
  
};
</script>

<style lang="scss" scoped>
.buttons {
  width: 30px;
  height: 200px;
  position: fixed;
  top: -100px;
  right: -15px;
  transition: transform 2.7s;
  &.unset {
    transition: unset;
  }
}
.button {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lightButton,.darkButton {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightButton {
  margin-top: 60px;
}

.darkButton {
  margin-bottom: 60px;
}

.lightImage {
  width: 18px;
  fill: var(--black);
}
.darkImage {
  width: 18px;
  fill: var(--white);
  transform: rotateZ(135deg);
}

.mask {
  width: 100%;
  height: 100vh;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  &.lightToDark {
    animation-name: maskingLight;
    animation-duration: 2.5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    
    @keyframes maskingLight {
      0% {
        background-color: var(--white);
        opacity: 0;
        visibility: visible;
        z-index: 999;
      }
      20% {
        background-color: var(--white);
        opacity: 1;
        visibility: visible;
        z-index: 999;
      }
      60% {
        background-color: var(--black);
        opacity: 1;
        visibility: visible;
        z-index: 999;
      }
      100% {
        background-color: var(--black);
        opacity: 0;
        visibility: visible;
        z-index: 999;
      }
    }
  }
  &.darkToLight {
    animation-name: maskingDark;
    animation-duration: 2.5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    
    @keyframes maskingDark {
      0% {
        background-color: var(--black);
        opacity: 0;
        visibility: visible;
        z-index: 999;
      }
      20% {
        background-color: var(--black);
        opacity: 1;
        visibility: visible;
        z-index: 999;
      }
      60% {
        background-color: var(--white);
        opacity: 1;
        visibility: visible;
        z-index: 999;
      }
      100% {
        background-color: var(--white);
        opacity: 0;
        visibility: visible;
        z-index: 999;
      }
    }
  }
}

</style>
