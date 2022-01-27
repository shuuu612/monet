<template>
  <div v-if="getDesktop">
    <button class="scrollTop" :class="getHide" @click="$moveTop">
      <div class="scrollTopText">Top</div>
      <!-- <img class="scrollTopImage" src="/images/scroll-top.svg" alt=""> -->
      <svg class="scrollTopImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 514.48 411.87" stroke="#000000" fill="#000000">
        <path d="M342.06,45a127.42,127.42,0,1,1,0,254.83" style="fill:none;stroke-miterlimit:10;stroke-width:90px"/>
        <line x1="342.06" y1="45" x2="36.04" y2="45" style="fill:none;stroke-miterlimit:10;stroke-width:90px"/>
        <line x1="342.06" y1="299.83" x2="182.18" y2="299.83" style="fill:none;stroke-miterlimit:10;stroke-width:90px"/>
        <polygon points="10 299.83 189.05 196.46 189.05 403.21 10 299.83" style="stroke-miterlimit:10;stroke-width:10px"/>
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
  box-shadow: 1px 1px 5px var(--scrolltop-button-shadow);
  z-index: 50;
  transition: transform .3s;
  transform: translateY(0);
  &:hover {
    transform: translateY(2px);
  }
  &.hide {
    transform: translateY(130px)
  }
}

.scrollTopText {
  color: var(--scrolltop-text);
  font-size: var(--font-size-xs);
  margin-bottom: 4px;
}

.scrollTopImage {
  width: 40%;
  fill: var(--scrolltop-icon-fill);
  stroke: var(--scrolltop-icon-stroke);
}

</style>