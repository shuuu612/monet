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
  background-color: var(--color-dark-transparent-low);
  z-index: 100;
  /* transition: background-color .2s, transform .25s ease-in; */
  transition: background-color .2s;
  @include hover() {
    background-color: var(--color-dark-transparent-low-hover);
  }
  &.open {
    /* transform: translateX(var(--sideMenuWidth));
    transition: background-color .2s, transform .25s ease-out; */
  }
}

// プラスメニュー
/* .bars {
  position: relative;
  width: 22px;
  height: 18px;
}

.bar {
  background-color: var(--white);
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
} */

// ハンバーガーメニュー
.bars {
  position: relative;
  width: 22px;
  height: 18px;
}

.bar {
  background-color: var(--white);;
  width: inherit;
  height: 2px;
  position: absolute;
  /* transition: transform .3s; */
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
  /* .open & {
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
  } */
}

</style>
