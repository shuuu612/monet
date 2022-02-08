<template>
  <transition name="loading">
    <div v-if="getLoadingDisplayed" class="loading">
      <div class="squares">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    getLoadingDisplayed() {
      return !(this.$store.getters["loaded/getLoaded"] && this.$store.getters["loaded/getLoadedImage"]) ;
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
.loading {
  display: block;
  background-color: var(--white);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

}

.squares {
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;

  animation-name: squares;
  animation-duration: 1.25s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  
  @keyframes squares {
    50% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
}

.square {
  width: calc(65px * 0.25 / 1.3);
  height: calc(65px * 0.25 / 1.3);
  margin: auto;
  border: calc(65px * 0.04 / 1.3) solid #000;
  border-image: linear-gradient(to right, #247bb1, #52549e);
  border-image-slice: 1;
  position: absolute;  

  &:nth-child(1) {
    animation-name: square1;
  }
  &:nth-child(2) {
    animation-name: square2;
  }
  &:nth-child(3) {
    animation-name: square3;
  }
  &:nth-child(4) {
    animation-name: square4;
  }
  animation-duration: 1.25s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  
  @keyframes square1 {
    50% {
      transform: translate(150%,150%) scale(2,2);
    }
  }
  @keyframes square2 {
    50% {
      transform: translate(-150%,150%) scale(2,2);
    }
  }
  @keyframes square3 {
    50% {
      transform: translate(-150%,-150%) scale(2,2);
    }
  }
  @keyframes square4 {
    50% {
      transform: translate(150%,-150%) scale(2,2);
    }
  }
}

.loading-leave-active {
  transition: opacity .25s ease-in;
}
.loading-leave-to {
  opacity: 0;
}

</style>