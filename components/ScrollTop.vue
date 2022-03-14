<template>
  <div v-if="getDesktop">
    <button class="scrollTop" :class="getHide" aria-label="scroll top" @click="$moveTop">
      <svg class="scrollTopImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520.18 307.33" fill="#231815">
        <path d="M474.68,307.33a45.34,45.34,0,0,1-32.44-13.59L261.31,109.84,77.41,290.78a45.5,45.5,0,0,1-63.82-64.87L229.92,13.07a45.5,45.5,0,0,1,64.35.52L507.11,229.92a45.49,45.49,0,0,1-32.43,77.41Z"/>
      </svg>
    </button>
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
    getHide() {
      return {hide: !(this.$store.getters['scroll/getWindowScroll'] > this.windowHeight)}
    },
    getDesktop() {
      return this.$store.getters['windowSize/getWindowWidth'] >= 768
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
    setWindowHeight() {
      this.windowHeight = document.documentElement.clientHeight
    }
  },
};
</script>

<style lang="scss" scoped>
.scrollTop {
  position: fixed;
  bottom: 70px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 1px 1px 5px var(--scroll-top-button-shadow);
  background-color: var(--scroll-top-button);
  z-index: 50;
  transition: transform .4s;
  transform: translateY(0);
  display: flex;
  align-items: center;
  justify-content: center;
  @include hover() {
    background-color: var(--scroll-top-button-hover);
  }
  &.hide {
    transform: translateY(280px);
  }
}

.scrollTopImage {
  width: 45%;
  fill: var(--scroll-top-icon);
}
</style>
