<template>
  <button class="button" :class="{ on: getSwitchOn }" @click="click"></button>
</template>
<script>
export default {
  props: {
    on: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      insideOn: undefined,
    };
  },
  computed: {
    getSwitchOn() {
      if (this.insideOn === undefined) {
        return this.on;
      } else {
        return this.insideOn;
      }
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    click() {
      if (this.insideOn === undefined) {
        this.insideOn = !this.on;
      } else {
        this.insideOn = !this.insideOn;
      }

      this.$emit('click', this.insideOn);
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;

  width: 32px;
  height: 16px;

  transition: background-color .2s;

  border-radius: 50px;
  background-color: var(--gray3);
  &::before {
    position: absolute;
    top: 2px;
    left: 2px;

    width: 12px;
    height: 12px;

    content: '';
    transition: left .2s;

    border-radius: 20px;
    background-color: var(--white);
  }
  &.on {
    background-color: var(--color4);
    &::before {
      left: 18px;
    }
  }
}

</style>
