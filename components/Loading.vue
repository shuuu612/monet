<template>
  <div class="loaded" :class="getLoadingDisplayed"></div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    getLoadingDisplayed() {
      return { loading: !this.$store.getters["loaded/getLoadingDisplayed"] };
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

.loaded {
  display: none;
}

.loading {
  display: block;
  background: linear-gradient(to bottom, #404957 50%, #6f88ad 100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  opacity: 1;
  animation-name: loading;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  
  @keyframes loading {
    0% {
      
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  &:before {
    content: '';
    position: fixed;
    top: 50vh;
    left: 0;
    width: 100%;
    height: 2px;
    z-index: 999;
    background-color: var(--white);
    clip-path:inset(0 100% 0 0);
    animation-name: loadingLine;
    animation-duration: 1.5s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    
    @keyframes loadingLine {
      0% {
        
      }
      10% {
        clip-path:inset(0 100% 0 0);
      }
      30% {
        clip-path:inset(0 0 0 0);
      }
      40% {
        clip-path:inset(0 0 0 0);
      }
      60% {
        clip-path:inset(0 0 0 100%);
      }
      100% {
        
      }
    }
  }
}

</style>