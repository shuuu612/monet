<template>
  <div class="notice" :class="[getDisplay, getType]">
    <svg v-if="getError" class="errorIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 422.05 422.05" fill="#ce6767">
      <path d="M211,421.55c116.27,0,210.5-94.24,210.52-210.52S327.3.52,211,.5.52,94.75.5,211,94.74,421.53,211,421.55ZM318,318a151.18,151.18,0,0,1-190.8,18.88L336.84,127.15A151.19,151.19,0,0,1,318,318ZM104.1,104.09A151.17,151.17,0,0,1,294.91,85.22L85.22,294.91A151.17,151.17,0,0,1,104.1,104.09Z"/>
    </svg>
    <svg v-else-if="getCaution" class="cautionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.11 403.44" fill="#e1d57a">
      <path d="M447.47,341.05,262.57,20.8a41.58,41.58,0,0,0-72,0L5.64,341.05h0a41.6,41.6,0,0,0,36,62.39H411.46a41.6,41.6,0,0,0,36-62.39ZM226,340.7a22.62,22.62,0,1,1,22.61-22.62A22.62,22.62,0,0,1,226,340.7ZM241,282.08h-29l-9.95-134.47H251Z"/>
    </svg>
    <svg v-else-if="getNormal" class="normalIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.15 384.15" fill="#93cb86">
      <path d="M192.07,384.15c106.07,0,192.08-86,192.08-192.08S298.14,0,192.07,0,0,86,0,192.07,86,384.15,192.07,384.15ZM117.28,166.77l52.17,61,123.6-113.17,9.23,10L168.65,288.76l-91.5-89.88Z"/>
    </svg>
    <div class="text" v-text="getText"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    getDisplay() {
      return { display: this.$store.getters['notice/getDisplay'] }
    },
    getText() {
      return this.$store.getters['notice/getText']
    },
    getType() {
      return {
        error: this.$store.getters['notice/getType'] === 1,
        caution: this.$store.getters['notice/getType'] === 2,
        normal: this.$store.getters['notice/getType'] === 3
      }
    },
    getError() {
      return this.$store.getters['notice/getType'] === 1
    },
    getCaution() {
      return this.$store.getters['notice/getType'] === 2
    },
    getNormal() {
      return this.$store.getters['notice/getType'] === 3
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
.notice {
  height: 70px;
  border-radius: 4px;
  position: fixed;
  top: 8px;
  right: 8px;
  padding: 20px;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: left;
  transform: translateX(calc(100% + 20px));
  transition: transform .3s;
}

.display {
  transform: translateX(0);
}

.error {
  background-color: var(--notice-error-background);
  border: 1px var(--notice-error-border) solid;
}

.caution {
  background-color: var(--notice-caution-background);
  border: 1px var(--notice-caution-border) solid;
}

.normal {
  background-color: var(--notice-normal-background);
  border: 1px var(--notice-normal-border) solid;
}

.errorIcon {
  width: 16px;
  fill: #f16874;
}

.cautionIcon {
  width: 18px;
  fill: #ebdc0c;
}

.normalIcon {
  width: 18px;
  fill: #85d461;
}

.text {
  color: var(--black-light);
  font-size: var(--font-size-xs);
  margin-left: 5px;
  margin-bottom: 2px;
}
</style>
