<template>
  <div class="buttons">
    <transition name="dark" mode="out-in">
      <div v-if="getDarkMode" key="dark" class="button">
        <button class="darkButton" aria-label="lightmode" @click="clickDark">
          <svg class="darkImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255.29 347.47" fill="#231815">
            <path d="M255.29,327.19a173.82,173.82,0,0,1-30-319.41,173.76,173.76,0,1,0,30,319.41Z" />
          </svg>
        </button>
      </div>
      <div v-else key="light" class="button">
        <button class="lightButton" aria-label="darkmode" @click="clickLight">
          <svg class="lightImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402.86 393.73" fill="#231815">
            <path
              d="M201,308.11A111.25,111.25,0,1,1,312.19,196.86,111.37,111.37,0,0,1,201,308.11Zm0-199.49a88.25,88.25,0,1,0,88.24,88.24A88.34,88.34,0,0,0,201,108.62Z"
            />
            <path d="M201,61.22a10.5,10.5,0,0,1-10.5-10.5V10.5a10.5,10.5,0,0,1,21,0V50.72A10.5,10.5,0,0,1,201,61.22Z" />
            <path
              d="M201,393.73a10.5,10.5,0,0,1-10.5-10.5V343a10.5,10.5,0,0,1,21,0v40.23A10.5,10.5,0,0,1,201,393.73Z"
            />
            <path d="M392.36,207.36H352.13a10.5,10.5,0,0,1,0-21h40.23a10.5,10.5,0,0,1,0,21Z" />
            <path d="M50.72,207.36H10.5a10.5,10.5,0,0,1,0-21H50.72a10.5,10.5,0,0,1,0,21Z" />
            <path
              d="M304.78,104.53a10.5,10.5,0,0,1-7.36-18l28.67-28.21a10.5,10.5,0,1,1,14.73,15l-28.67,28.21A10.5,10.5,0,0,1,304.78,104.53Z"
            />
            <path
              d="M67.76,337.72a10.5,10.5,0,0,1-7.36-18l28.67-28.21a10.5,10.5,0,0,1,14.73,15L75.13,334.71A10.49,10.49,0,0,1,67.76,337.72Z"
            />
            <path
              d="M334.85,343.46a10.43,10.43,0,0,1-7.48-3.13l-28.21-28.67a10.5,10.5,0,1,1,15-14.73l28.21,28.67a10.49,10.49,0,0,1-7.48,17.86Z"
            />
            <path
              d="M95.25,99.94a10.46,10.46,0,0,1-7.48-3.14L59.56,68.13a10.5,10.5,0,0,1,15-14.73l28.21,28.67a10.51,10.51,0,0,1-7.49,17.87Z"
            />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getDarkMode() {
      return this.$store.getters['darkmode/getActive'];
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    clickLight() {
      this.$store.dispatch('darkmode/pushDarkmodeOnForPage');
      this.$emit('colormodeChange');
    },
    clickDark() {
      this.$store.dispatch('darkmode/pushDarkmodeOffForPage');
      this.$emit('colormodeChange');
    },
  },
};
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightButton,.darkButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 5px;

  @include hover() {
    background-color: var(--tool-button-hover);
  }
}

.lightImage {
  width: 20px;
  fill: var(--barkmode-light-icon);
}

.darkImage {
  margin-top: 1px;
  width: 13px;
  transform: rotate(225deg);
  fill: var(--white);
}

.dark-enter-active {
  transition: opacity .25s ease-out;
}

.dark-leave-active {
  transition: opacity .25s ease-in;
}

.dark-enter,.dark-leave-to {
  opacity: 0;
}

</style>
