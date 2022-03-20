<template>
  <div class="orderOuter">
    <transition name="mask">
      <div v-if="open" class="mask" @click="closeList">
      </div>
    </transition>
    <div class="buttonOuter">
      <div class="button" :class="{selected: openDelay}" @click.stop="openList">
        <svg class="image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.33 425.69" fill="#231815">
          <polygon points="88.85 141.9 131.85 141.9 131.85 0 88.85 0 88.85 49.45 0 49.45 0 92.45 88.85 92.45 88.85 141.9"/>
          <polygon points="173.41 283.79 216.41 283.79 216.41 141.9 173.41 141.9 173.41 191.34 0 191.34 0 234.34 173.41 234.34 173.41 283.79"/>
          <polygon points="257.97 333.24 0 333.24 0 376.24 257.97 376.24 257.97 425.69 300.97 425.69 300.97 283.79 257.97 283.79 257.97 333.24"/>
          <rect x="260.2" y="191.34" width="196.13" height="43"/>
          <rect x="345.23" y="333.24" width="111.1" height="43"/>
          <rect x="176.46" y="49.45" width="279.86" height="43"/>
        </svg>
      </div>
    </div>
    <div id="pulldown" class="pulldown">
      <ul class="lists" :class="getOpenList">
        <li class="list" :class="getSelectedNew">
          <button class="link" :class="getSelectedNew" @click="clickButton('new')">
              追加日（新しい順）
          </button>
        </li>
        <li class="list" :class="getSelectedOld">
          <button class="link" :class="getSelectedOld" @click="clickButton('old')">
              追加日（古い順）
          </button>
        </li>
        <li class="list" :class="getSelectedUpdate">
          <button class="link" :class="getSelectedUpdate" @click="clickButton('update')">
              更新日（新しい順）
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      openDelay: false,
    };
  },
  computed: {
    getSelectedNew() {
      return { selected: this.$route.query.sort === 'new' || this.$route.query.sort === undefined}
    },
    getSelectedOld() {
      return { selected: this.$route.query.sort === 'old' }
    },
    getSelectedUpdate() {
      return { selected: this.$route.query.sort === 'update' }
    },
    getOpenList() {
      return { open: this.open }
    },
  },
  mounted() {
    window.addEventListener('click', this.closeList);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeList);
  },
  methods: {
    openList() {
      this.open = !this.open;
      if(this.openDelay) {
        setTimeout(()=>{this.openDelay = false},260);
      }else {
        this.openDelay = true;
      }
    },
    closeList() {
      this.open = false;
      setTimeout(()=>{this.openDelay = false},260);
    },
    clickButton(key) {
      // クエリパラメーターを付加
      const query = { ...this.$route.query};
      query.sort = key;
      
      this.$router.push({ path: '/', query: { ...query} });
    }
  },
}
</script>

<style lang="scss" scoped>
.mask {
  background-color: var(--black-transparent);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}

.mask-enter-active {
  transition: opacity .25s ease-out;
}

.mask-leave-active {
  transition: opacity .25s ease-in;
}

.mask-enter, .mask-leave-to {
  opacity: 0;
}
.orderOuter {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  z-index: 50;
  position: relative;
  height: 40px;
}

.buttonOuter {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  @include hover() {
    background-color: var(--tool-button-hover);
  }
  &.selected {
    z-index: 150;
  }
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  fill: var(--favorite-icon-stroke);
}

.title {
  color: var(--black-forDarkMode);
}

.pulldown {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 40px;
  right: 0;
  width: 140px;
}

.lists {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: opacity .2s, transform .2s;
  border: 1px var(--menu-border) solid;
  z-index: 150;
  &.open {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
}

.list {
  height: 40px;
  display: flex;
  align-items: center;
  user-select: none;
  background-color: var(--menu-background);
  cursor: pointer;
  padding-left: 10px;
  @include hover() {
    background-color: var(--menu-item-selected);
  }
  &.selected {
    background-color: var(--menu-item-selected);
  }
}

.link {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: var(--menu-text);
}

</style>
