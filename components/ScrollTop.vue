<template>
  <div v-if="getDesktop">
    <button class="scrollTop" :class="getHide" @click="$moveTop">
      <div class="scrollTopText">Top</div>
      <svg class="scrollTopImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 514.48 411.87" fill="#000000">
        <path d="M342.06,0H36V90h306a82.42,82.42,0,1,1,0,164.83h-148v-67L0,299.83l194.05,112v-67h148c95.07,0,172.42-77.34,172.42-172.41S437.13,0,342.06,0Z"/>
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
}

</style>