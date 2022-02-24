<template>
  <div class="orderOuter">
    <div class="buttonOuter">
      <div class="button" @click.stop="openList">
        <svg class="image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.33 425.69" fill="#231815">
          <polygon points="88.85 141.9 131.85 141.9 131.85 0 88.85 0 88.85 49.45 0 49.45 0 92.45 88.85 92.45 88.85 141.9"/>
          <polygon points="173.41 283.79 216.41 283.79 216.41 141.9 173.41 141.9 173.41 191.34 0 191.34 0 234.34 173.41 234.34 173.41 283.79"/>
          <polygon points="257.97 333.24 0 333.24 0 376.24 257.97 376.24 257.97 425.69 300.97 425.69 300.97 283.79 257.97 283.79 257.97 333.24"/>
          <rect x="260.2" y="191.34" width="196.13" height="43"/>
          <rect x="345.23" y="333.24" width="111.1" height="43"/>
          <rect x="176.46" y="49.45" width="279.86" height="43"/>
        </svg>
        <!-- <div class="title">並べ替え</div> -->
      </div>
    </div>
    <div id="pulldown" class="pulldown">
      <ul class="lists" :class="getOpenList">
        <li class="list" :class="getSelectedNew">
          <nuxt-link :to="`/${tag !== undefined ? `tag/${tag}/` : ''}sort/new`" class="link" :class="getSelectedNew">
              追加日（新しい順）
          </nuxt-link>
        </li>
        <li class="list" :class="getSelectedOld">
          <nuxt-link :to="`/${tag !== undefined ? `tag/${tag}/` : ''}sort/old`" class="link" :class="getSelectedOld">
              追加日（古い順）
          </nuxt-link>
        </li>
        <li class="list" :class="getSelectedUpdate">
          <nuxt-link :to="`/${tag !== undefined ? `tag/${tag}/` : ''}sort/update`" class="link" :class="getSelectedUpdate">
              更新日（新しい順）
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default: undefined,
    },
    sort: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    getSelectedNew() {
      return { selected: this.sort === 'new' || this.sort === undefined}
    },
    getSelectedOld() {
      return { selected: this.sort === 'old' }
    },
    getSelectedUpdate() {
      return { selected: this.sort === 'update' }
    },
    getOpenList() {
      return { open: this.open }
    },

  },
  mounted() {
    /* const selectElement = document.getElementById('order');
    selectElement.addEventListener('change', this.orderChange); */
    window.addEventListener('click', this.closeList);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeList);
  },
  methods: {
    openList() {
      this.open = !this.open
    },
    closeList(event) {
      const targetElement = document.getElementById('pulldown')
      if(!targetElement.contains(event.target)) {
        this.open = false
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.orderOuter {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  z-index: 100;
  /* margin-bottom: 30px; */
  /* position: absolute;
  top: 0;
  right: 50px; */
  position: relative;
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
  /* padding-left: 10px; */
  width: 40px;
  height: 40px;
  border-radius: 5px;
  @include hover() {
    background-color: var(--order-button-hover);
  }
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  /* margin-right: 8px;
  margin-top: 2px; */
  fill: var(--black-forDarkMode);
}

.title {
  color: var(--black-forDarkMode);
}
.pulldown {
  /* width: 130px; */
  /* height: 30px; */
  /* margin-right: 30px; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 40px;
  right: 0;
  width: 140px;
}

.lists {
  clip-path:inset(0 0 100% 0);
  transition: clip-path 0.2s;
  &.open {
    clip-path:inset(0 0 0 0);
  }
}

.list {
  height: 40px;
  display: flex;
  align-items: center;
  user-select: none;
  background-color: var(--grey-ultra-light);
  cursor: pointer;
  padding-left: 10px;
  @include hover() {
    background-color: var(--grey-light);
  }
  &.selected {
    background-color: var(--grey-light);
  }
  &:first-child {
    border-radius: 4px 4px 0 0;
  }
  &:last-child {
    border-radius: 0 0 4px 4px;
  }
}


.link {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: var(--black);
  @include hover() {
    color: var(--white);
  }
  &.selected {
    color: var(--white);
  }
}

.working {
  display: none;
}

</style>
