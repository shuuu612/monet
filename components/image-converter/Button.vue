<template>
  <button class="button" :class="getClass" :style="getStyle" :disabled="disabled" @click="click">{{text}}</button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: undefined,
    },
    width: {
      type: String,
      required: false,
      default: '120px',
    },
    height: {
      type: String,
      required: false,
      default: '32px',
    },
    type: {
      type: String,
      required: false,
      default: 'white',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    getClass() {
      return { white: this.type === 'white', purple: this.type === 'purple', disabled: this.disabled };
    },
    getStyle() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  border-radius: 50px;
  font-size: var(--font-size-md);
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;

  &.white {
    background-color: var(--white);
    color: var(--gray7);
    border: 1px var(--color3) solid;
    &.disabled {
    }
  }
  &.purple {
    background-color: var(--color4);
    color: var(--white);
    &.disabled {
      background-color: var(--gray4);
    }
  }
}
</style>
