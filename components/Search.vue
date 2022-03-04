<template>
  <div class="searchWrapper" :class="getFocus">
    <div class="searchBlock">
      <svg class="searchImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393.47 393.47" fill="#000000">
        <path d="M383.52,335.43l-102-102c36.94-58.86,29.95-137.61-21.23-188.8-59.45-59.45-156.19-59.46-215.65,0s-59.45,156.19,0,215.65c51.19,51.17,129.94,58.18,188.81,21.24l102,102a34,34,0,1,0,48.08-48.09ZM232.77,232.76a113.64,113.64,0,1,1,0-160.71A113.77,113.77,0,0,1,232.77,232.76Z"/>
      </svg>
      <input id="search" v-model="keyword" class="search" type="text" placeholder="検索" autocomplete="off" @input="setKeyword" @focus="setFocus" @blur="setBlur">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      focus: false,
    };
  },
  computed: {
    getFocus() {
      return { focus: this.focus}
    },
  },
  mounted() {
    setTimeout(this.setInitialKeyword,500);
    this.$nuxt.$on('clearKeyword', this.clearKeyword)
  },
  beforeDestroy() {
    this.$nuxt.$off('clearKeyword', this.clearKeyword)
  },
  methods: {
    setKeyword() {
      this.$store.dispatch('search/pushKeyword',this.keyword)
      // 検索を開始
      this.$emit('search')
    },
    clearKeyword() {
      this.keyword = '';
    },
    setFocus() {
      this.focus = true;
    },
    setBlur() {
      this.focus = false;
    },
    setInitialKeyword() {
      if(this.$store.getters['search/getKeyword']) {
        this.keyword = this.$store.getters['search/getKeyword'];
        this.focus = true;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.searchWrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
  z-index: 15;

  @include responsive(xs) {
    margin-top: 16px;
    width: 280px;
  }
  @include responsive(sm) {
    margin-top: 20px;
    width: 350px;
  }
  @include responsive(md) {
    width: 250px;
    margin-top: 0;
  }
  @include responsive(lg) {
    width: 300px;
  }
  @include responsive(xl) {
    width: 350px;
  }
  @include responsive(xxl) {
  }
}

.searchBlock {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 50px;
  height: 100%;
  border-radius: 50px;
  background-color: var(--search-background);
  padding-left: 10px;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {

    
  }
  @include responsive(lg) {
    
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.searchImage {
  width: 16px;
  margin-right: 10px;
  margin-left: 10px;
  fill: var(--search-icon);
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    
  }
  @include responsive(lg) {
    
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}
.search {
  width: calc(100% - 20px);
  height: 36px;
  border-radius: 4px;
  font-size: var(--font-size-sm);
  color: var(--search-text);
}
::placeholder {
  color: var(--search-placeholder);
}
</style>
