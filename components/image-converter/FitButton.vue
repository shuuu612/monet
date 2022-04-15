<template>
  <button class="button" :class="{selected: selected}" @click="click">
    <div class="text">{{type.toUpperCase()}}</div>
  </button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: undefined,
    },
    selected: {
      type: Boolean,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
    };
  },
  computed: {

  },
  created() {
  },
  mounted() {
    
  },
  beforeDestroy() {
  },
  methods: {
    click() {
      this.$emit('click');
    }
  },
};
</script>

<style lang="scss" scoped>
.button {
  border-radius: 5px;
  font-size: var(--font-size-sm);
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px var(--gray5) solid;
  color: var(--gray8);
  width: 70px;
  height: 50px;
  padding: 5px;
  &:not(:first-child) {
    margin-left: 10px;
  }
  &.selected {
    background-color: var(--color5);
  }
}

</style>
