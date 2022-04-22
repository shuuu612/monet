<template>
  <div class="headerWrapper">
    <header class="header">
      <div class="topMenu desktop">
        <h1 class="logo">
          <Logo />
        </h1>
        <Search
        :contents="contents"
        :type="tag.type.contents"
        :impression="tag.impression.contents"
        :industry="tag.industry.contents"
        :pickup="tag.pickup.contents"
        :technique="tag.technique.contents"
        :layout="tag.layout.contents"
        :color="tag.color.contents"
        :scheme="tag.scheme.contents"
        :technology="tag.technology.contents"
        @search="passToTheTopSearch"
        />
        <div class="tool">
          <div class="toolItem">
            <DarkModeButton
            @colormodeChange="darkModeSetting2"
            />
          </div>
          <div class="toolItem">
            <FavoriteButton
            @update="update"
            />
          </div>
          <div class="toolItem">
            <Order />
          </div>
          <div class="toolItem">
            <Setting
            @autoSizing="pushAutoSizing"
            @deviceChange="changeDevice"
            @sliderChange="changeSliderSize"
            @multideviceCancel="monitorReturnToSingledevice"
            @colormodeChange="darkModeSetting"
            />
          </div>
        </div>
      </div>
      <div class="topMenu mobile">
        <h1 class="logo">
          <Logo />
        </h1>
        <div class="tool">
          <div class="toolItem">
            <DarkModeButton
            @colormodeChange="darkModeSetting2"
            />
          </div>
          <div class="toolItem">
            <FavoriteButton
            @update="update"
            />
          </div>
          <div class="toolItem">
            <Order />
          </div>
          <div class="toolItem">
            <Setting
            @autoSizing="pushAutoSizing"
            @deviceChange="changeDevice"
            @sliderChange="changeSliderSize"
            @multideviceCancel="monitorReturnToSingledevice"
            @colormodeChange="darkModeSetting"
            />
          </div>
        </div>
        <Search
        :contents="contents"
        :type="tag.type.contents"
        :impression="tag.impression.contents"
        :industry="tag.industry.contents"
        :pickup="tag.pickup.contents"
        :technique="tag.technique.contents"
        :layout="tag.layout.contents"
        :color="tag.color.contents"
        :scheme="tag.scheme.contents"
        :technology="tag.technology.contents"
        @search="passToTheTopSearch"
        />
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: undefined,
    },
    tag: {
      type: Object,
      required: false,
      default: undefined,
    },
    width: {
      type: Object,
      required: false,
      default: undefined,
    },
    selectedtag: {
      type: String,
      required: false,
      default: undefined,
    },
    selectedsort: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    passToTheTopSearch() {
      this.$emit('search');
    },
    pushAutoSizing() {
      this.$emit('autoSizing');
    },
    changeDevice() {
      this.$emit('deviceChange');
    },
    changeSliderSize() {
      this.$emit('sliderChange');
    },
    monitorReturnToSingledevice() {
      this.$emit('multideviceCancel');
    },
    darkModeSetting() {
      this.$emit('colormodeChange');
    },
    update() {
      this.$emit('update');
    },
    darkModeSetting2() {
      this.$emit('colormodeChange');
    },
  },
};
</script>

<style lang="scss" scoped>
.headerWrapper {
  padding-top: 12px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 1600px;
  width: 90%;
  height: 150px;

  @include responsive(xs) {
  }
  @include responsive(sm) {
  }
  @include responsive(md) {
  }
  @include responsive(lg) {
    height: 55px;
  }
  @include responsive(xl) {
  }
  @include responsive(xxl) {
  }
}

.topMenu {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  transition: transform .25s ease-in;

  @include responsive(xs) {
  }
  @include responsive(sm) {
  }
  @include responsive(md) {
    margin-left: 25px;
  }
  @include responsive(lg) {
    align-items: center;
    flex-direction: row;
    margin-left: 0;
  }
  @include responsive(xl) {
  }
  @include responsive(xxl) {
  }
}
.desktop {
  display: none;

  @include responsive(xs) {
  }
  @include responsive(sm) {
  }
  @include responsive(md) {
  }
  @include responsive(lg) {
    display: flex;
  }
  @include responsive(xl) {
  }
  @include responsive(xxl) {
  }
}
.mobile {
  display: flex;

  @include responsive(xs) {
  }
  @include responsive(sm) {
  }
  @include responsive(md) {
  }
  @include responsive(lg) {
    display: none;
  }
  @include responsive(xl) {
  }
  @include responsive(xxl) {
  }
}
.logo {
  align-self: flex-start;
  width: 100px;

  @include responsive(xs) {
    width: 110px;
  }
  @include responsive(sm) {
    width: 120px;
  }
  @include responsive(md) {
    width: 130px;
  }
  @include responsive(lg) {
    align-self: auto;
    width: calc(60px * 4);
  }
  @include responsive(xl) {
  }
  @include responsive(xxl) {
  }
}

.tool {
  display: flex;
  align-items: flex-start;
  align-self: flex-end;
  justify-content: flex-end;
  padding-right: 50px;

  @include responsive(xs) {
  }
  @include responsive(sm) {
  }
  @include responsive(md) {
    padding-right: 0;
  }
  @include responsive(lg) {
    align-self: auto;
  }
  @include responsive(xl) {
    width: calc(60px * 4);
  }
  @include responsive(xxl) {
  }
}

.toolItem {
  width: 60px;
}

</style>
