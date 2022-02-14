<template>
  <div class="orderOuter">
    <div id="pulldown" class="pulldown">
      <div class="button" @click="openList">
        <!-- <svg class="image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.33 425.69" stroke="#231815">
          <line y1="70.95" x2="122.73" y2="70.95" style="fill:none;stroke-miterlimit:10;stroke-width:43px"/>
          <line x1="110.35" x2="110.35" y2="141.9" style="fill:none;stroke-miterlimit:10;stroke-width:43px"/>
          <line x1="194.91" y1="141.9" x2="194.91" y2="283.79" style="fill:none;stroke-miterlimit:10;stroke-width:43px"/>
          <line x1="279.47" y1="283.79" x2="279.47" y2="425.69" style="fill:none;stroke-miterlimit:10;stroke-width:43px"/>
          <line y1="212.84" x2="181.29" y2="212.84" style="fill:none;stroke-miterlimit:10;stroke-width:43px"/>
          <line x1="260.2" y1="212.84" x2="456.33" y2="212.84" style="fill:none;stroke-miterlimit:10;stroke-width:43px"/>
          <line x1="345.23" y1="354.74" x2="456.33" y2="354.74" style="fill:none;stroke-miterlimit:10;stroke-width:43px"/>
          <line x1="176.46" y1="70.95" x2="456.33" y2="70.95" style="fill:none;stroke-miterlimit:10;stroke-width:43px"/>
          <line y1="354.74" x2="260.2" y2="354.74" style="fill:none;stroke-miterlimit:10;stroke-width:43px"/>
        </svg> -->
        <svg class="image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.33 425.69" fill="#231815">
          <polygon points="88.85 141.9 131.85 141.9 131.85 0 88.85 0 88.85 49.45 0 49.45 0 92.45 88.85 92.45 88.85 141.9"/>
          <polygon points="173.41 283.79 216.41 283.79 216.41 141.9 173.41 141.9 173.41 191.34 0 191.34 0 234.34 173.41 234.34 173.41 283.79"/>
          <polygon points="257.97 333.24 0 333.24 0 376.24 257.97 376.24 257.97 425.69 300.97 425.69 300.97 283.79 257.97 283.79 257.97 333.24"/>
          <rect x="260.2" y="191.34" width="196.13" height="43"/>
          <rect x="345.23" y="333.24" width="111.1" height="43"/>
          <rect x="176.46" y="49.45" width="279.86" height="43"/>
        </svg>
        <div class="title">並べ替え</div>
      </div>
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
  justify-content: flex-end;
  z-index: 100;
  /* margin-bottom: 30px; */
  position: absolute;
  top: 0;
  right: 0;
}
.pulldown {
  width: 130px;
  height: 30px;
  margin-right: 30px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: inherit;
  user-select: none;
  cursor: pointer;
  padding-left: 10px;
}

.image {
  width: 16px;
  margin-right: 8px;
  margin-top: 2px;
  fill: var(--order-icon);
}

.title {
  color: var(--order-title);
}

.lists {
  clip-path:inset(0 0 100% 0);
  transition: clip-path 0.2s;
}

.open {
  clip-path:inset(0 0 0 0);
}

.list {
  height: 40px;
  display: flex;
  align-items: center;
  user-select: none;
  background-color: var(--order-list-background);
  cursor: pointer;
  padding-left: 10px;
  @include hover() {
    background-color: var(--order-list-background-hover);
  }
  &.selected {
    background-color: var(--order-list-background-selected);
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
  color: var(--order-list-text);
  @include hover() {
    color: var(--order-list-text-hover);
  }
  &.selected {
    color: var(--order-list-text-selected);
  }
}

.working {
  display: none;
}

</style>