<template>
  <div class="searchWrapper" :class="[getFocus,getSearchOpen,getDevice]">
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
    getSearchOpen() {
      return { open: this.$store.getters['search/getOpen'] && this.$store.getters['windowSize/getWindowWidth'] < 768}
    },
    getDevice() {
      return { mobile: this.$store.getters['windowSize/getWindowWidth'] < 768, desktop: this.$store.getters['windowSize/getWindowWidth'] >= 768}
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
      console.log(this.$store.getters['search/getKeyword'])
      if(this.$store.getters['search/getKeyword']) {
        console.log('検索キーワードを復活')
        this.keyword = this.$store.getters['search/getKeyword'];
        this.focus = true;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.searchWrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: var(--white-transparent-low);
  padding: 14px 10px;
  transform: translateY(-70px);
  border-bottom: 2px var(--black-transparent-high) solid;
  &.open {
    transform: translateY(0);
  }
  &.mobile {
    transition: transform .2s;
  }
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 30px;
    left: auto;
    right: 80px;
    width: 200px;
    height: 50px;
    z-index: 15;
    padding: 10px;
    
    background-color: transparent;
    border-bottom: 0;

    &.focus {
      /* width: 450px; */
    }
    &.desktop {
      transition: width .2s;
      transform: translateY(0);
    }
  }
  @include responsive(lg) {
    width: 250px;
    right: 100px;
  }
  @include responsive(xl) {
    width: 300px;
    right: 110px;
  }
  @include responsive(xxl) {
    right: 120px;
  }
}

.searchBlock {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background-color: var(--black-transparent-high);
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    /* display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; */
    height: auto;
    border-radius: 0;
    border-bottom: var(--search-border) 1px solid;
    border-image: linear-gradient(to right, #247bb1, #52549e);
    border-image-slice: 1;
    padding-left: 10px;
    background-color: transparent;
    .searchWrapper.focus & {
      border-bottom: var(--search-border-focus) 2px solid;
    }
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
    /* width: 16px;
    margin-right: 10px;
    fill: var(--search-icon); */
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
</style>