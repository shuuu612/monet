<template>
  <div v-if="getDesktop">
    <button class="menuBtn main" :class="getOpen" aria-label="Menu Open" @click="clickButton">
      <div class="bars">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </button>
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
      return  { open: this.$store.getters['sideMenu/getOpen']}
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
    clickButton() {
      this.$store.dispatch('sideMenu/pushOpen')
      this.$store.dispatch('slider/pushDecidedSteps');
    },
  },
};
</script>

<style lang="scss" scoped>
.menuBtn {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
}

.main {
  top: 0;
  left: 0;
  width: 70px;
  height: 100vh;
  background-color: var(--side-menu);
  z-index: 100;
  transition: background-color .2s;
  border-right: 2px var(--side-menu-borber) solid;
  @include hover() {
    background-color: var(--side-menu-hover);
  }
}

// ハンバーガーメニュー
.bars {
  position: relative;
  width: 22px;
  height: 18px;
}

.bar {
  background-color: var(--side-menu-icon);
  width: inherit;
  height: 2px;
  position: absolute;
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
}
</style>
