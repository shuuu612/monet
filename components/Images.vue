<template>
  <a :href="`${content.url}`" target="_blank" rel="noopener noreferrer" class="images">
    <div class="imageWrapper">
      <template v-for="(step, index) in stepsPc">
        <picture v-if="getDisplaySteps(index, 'pc')" :key="index" :class="getMargin('pc')">
          <source
            :src="`${getPath(content.url)}-pc-${step}.webp?ver=${date}`"
            :srcset="`
            ${getPath(content.url)}-pc-${step}.webp?ver=${date} 1x,
            ${getPath(content.url)}-pc-${step*2}.webp?ver=${date} 2x
            `"
            type="image/webp"
          />
          <img
            class="image"
            :src="`${getPath(content.url)}-pc-${step}.jpg?ver=${date}`"
            :srcset="`
            ${getPath(content.url)}-pc-${step}.jpg?ver=${date} 1x,
            ${getPath(content.url)}-pc-${step*2}.jpg?ver=${date} 2x
            `"
            :width="getWidth('pc')"
            :height="getHeight"
            :alt="`${content.name}`"
            loading="lazy"
            @load="imageLoaded"
          >
        </picture>
      </template>
      <img
        v-if="getPcHide"
        class="image loading"
        :src="`${getPath(content.url)}-pc-50.jpg?ver=${date}`"
        :width="getWidth('pc')"
        :height="getHeight"
        alt="loading-image"
      >
    </div>
    <div class="imageWrapper">
      <template v-for="(step, index) in stepsTb">
        <picture v-if="getDisplaySteps(index, 'tb')" :key="index+100" :class="getMargin('tb')">
          <source
            :src="`${getPath(content.url)}-tb-${step}.webp?ver=${date}`"
            :srcset="`
            ${getPath(content.url)}-tb-${step}.webp?ver=${date} 1x,
            ${getPath(content.url)}-tb-${step*2}.webp?ver=${date} 2x
            `"
            type="image/webp"
          />
          <img
            class="image"
            :src="`${getPath(content.url)}-tb-${step}.jpg?ver=${date}`"
            :srcset="`
            ${getPath(content.url)}-tb-${step}.jpg?ver=${date} 1x,
            ${getPath(content.url)}-tb-${step*2}.jpg?ver=${date} 2x
            `"
            :width="getWidth('tb')"
            :height="getHeight"
            :alt="`${content.name}`"
            loading="lazy"
            @load="imageLoaded"
          >
        </picture>
      </template>
      <img
        v-if="getTbHide"
        class="image loading"
        :src="`${getPath(content.url)}-tb-50.jpg?ver=${date}`"
        :width="getWidth('tb')"
        :height="getHeight"
        alt="loading-image"
      >
    </div>
    <div class="imageWrapper">
      <template v-for="(step, index) in stepsSp">
        <picture v-if="getDisplaySteps(index, 'sp')" :key="index+200" :class="getMargin('sp')">
          <source
            :src="`${getPath(content.url)}-sp-${step}.webp?ver=${date}`"
            :srcset="`
            ${getPath(content.url)}-sp-${step}.webp?ver=${date} 1x,
            ${getPath(content.url)}-sp-${step*2}.webp?ver=${date} 2x
            `"
            type="image/webp"
          />
          <img
            class="image"
            :src="`${getPath(content.url)}-sp-${step}.jpg?ver=${date}`"
            :srcset="`
            ${getPath(content.url)}-sp-${step}.jpg?ver=${date} 1x,
            ${getPath(content.url)}-sp-${step*2}.jpg?ver=${date} 2x
            `"
            :width="getWidth('sp')"
            :height="getHeight"
            :alt="`${content.name}`"
            loading="lazy"
            @load="imageLoaded"
          >
        </picture>
      </template>
      <img
        v-if="getSpHide"
        class="image loading"
        :src="`${getPath(content.url)}-sp-50.jpg?ver=${date}`"
        :width="getWidth('sp')"
        :height="getHeight"
        alt="loading-image"
      >
    </div>
  </a>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      stepsPc: [218, 284, 349, 415, 480, 546, 611, 677, 742, 808, 873],
      stepsTb: [150, 195, 240, 285, 330, 375, 420, 465, 510, 555, 600],
      stepsSp: [92, 120, 148, 175, 203, 231, 258, 286, 314, 341, 369],
      currentStep: 0,
      date: '',
    };
  },
  computed: {
    getPcHide() {
        return this.$store.getters["devicePattern/getActivePC"];
    },
    getTbHide() {
        return this.$store.getters["devicePattern/getActiveTB"];
    },
    getSpHide() {
        return this.$store.getters["devicePattern/getActiveSP"];
    },
    getDisplaySteps() {
      return function(key, type) {
        const steps = this.$store.getters["slider/getDecidedSteps"];
        
        let active
        if(type === 'pc') {
          active = this.$store.getters["devicePattern/getActivePC"]
        }else if(type === 'tb') {
          active = this.$store.getters["devicePattern/getActiveTB"]
        }else if(type === 'sp') {
          active = this.$store.getters["devicePattern/getActiveSP"]
        }

        return steps[key] && active
      }
        
    },
    getMargin() {
        return function (id) {
            const pattern = this.$store.getters["devicePattern/getStatePatternNumber"];
            if (pattern === 1 || pattern === 2 || pattern === 3) {
                return { marginRight: false };
            }
            else if (pattern === 4) {
                if (id === "pc") {
                    return { marginRight: true };
                }
                else if (id === "tb") {
                    return { marginRight: true };
                }
                else if (id === "sp") {
                    return { marginRight: false };
                }
            }
            else if (pattern === 5 || pattern === 6) {
                if (id === "pc") {
                    return { marginRight: true };
                }
                else if (id === "tb") {
                    return { marginRight: false };
                }
                else if (id === "sp") {
                    return { marginRight: false };
                }
            }
            else if (pattern === 7) {
                if (id === "pc") {
                    return { marginRight: false };
                }
                else if (id === "tb") {
                    return { marginRight: true };
                }
                else if (id === "sp") {
                    return { marginRight: false };
                }
            }
        };
    },
    /* getMaxWidth() {
        return function (key) {
            // コンテンツのmax-widthを設定
            const devicePattern = this.$store.getters["devicePattern/getStatePatternNumber"]; // 現在のデバイスパターン
            const windowWidth = this.$store.getters["windowSize/getWindowWidth"]; // ウィンドウサイズ
            let maxWidthPc;
            let maxWidthTb;
            let maxWidthSp;
            if (windowWidth < 375 && this.$store.getters["slider/getAutoSizing"]) {
                switch (devicePattern) {
                    case 1:
                    case 2:
                    case 3:
                        maxWidthPc = "";
                        maxWidthTb = "";
                        maxWidthSp = "";
                        break;
                    case 4: // PC & TB & SP
                        maxWidthPc = `${873 / (873 + 10 + 600 + 10 + 369) * 100 * 0.97}%`;
                        maxWidthTb = `${600 / (873 + 10 + 600 + 10 + 369) * 100 * 0.97}%`;
                        maxWidthSp = `${369 / (873 + 10 + 600 + 10 + 369) * 100 * 0.97}%`;
                        break;
                    case 5: // PC & TB
                        maxWidthPc = `${873 / (873 + 10 + 600) * 100 * 0.978}%`;
                        maxWidthTb = `${600 / (873 + 10 + 600) * 100 * 0.978}%`;
                        maxWidthSp = "";
                        break;
                    case 6: // PC & SP
                        maxWidthPc = `${873 / (873 + 10 + 369) * 100 * 0.975}%`;
                        maxWidthTb = "";
                        maxWidthSp = `${369 / (873 + 10 + 369) * 100 * 0.975}%`;
                        break;
                    case 7: // TB & SP
                        maxWidthPc = "";
                        maxWidthTb = `${600 / (600 + 10 + 369) * 100 * 0.97}%`;
                        maxWidthSp = `${369 / (600 + 10 + 369) * 100 * 0.97}%`;
                        break;
                }
            }
            else {
                maxWidthPc = "";
                maxWidthTb = "";
                maxWidthSp = "";
            }
            if (key === "pc")
                return { maxWidth: maxWidthPc };
            else if (key === "tb")
                return { maxWidth: maxWidthTb };
            else if (key === "sp")
                return { maxWidth: maxWidthSp };
        };
    }, */
    getWidth() {
        return function (key) {
          if(key === 'pc') {
            return `${Math.round(873*this.$store.getters["slider/getValue"])}`
          }else if(key === 'tb') {
            return `${Math.round(600*this.$store.getters["slider/getValue"])}`
          }else if(key === 'sp') {
            return `${Math.round(369*this.$store.getters["slider/getValue"])}`
          }
        };
    },
    getHeight() {
      const windowWidth = this.$store.getters["windowSize/getWindowWidth"]; // ウィンドウサイズ
      if (windowWidth < 375) {
        return ''
      }else {
        return `${Math.round(800*this.$store.getters["slider/getValue"])}`
      }
    },
    getPath() {
      return function(url) {
        // '//'以降を切り出し
        const parts1 = url.substr(url.indexOf('//') + 2);
        // 最後が'/'だったら削除
        const parts2 = parts1.slice(-1) === '/' ? parts1.slice(0,-1) : parts1;
        // '/'を'_'に置換
        const parts3 = parts2.replace(/\//g, '_');
        // ファイルパスを追加
        const parts4 = `/images/site/${parts3}`

        /* // 前半の不要部分を切り取り
        const path1 = `/images/site/${url.substr(url.lastIndexOf('/') + 1)}`
        // .pngを切り取り
        const path2 = path1.substring(0, path1.indexOf(".png")) */
        return parts4
      }
    }
    
  },
  created() {

  },
  mounted() {
    this.setDate();
  },
  beforeDestroy() {

  },
  methods: {
    imageLoaded() {
      // 画像ロード済みフラグの設定
      this.$store.dispatch("loaded/pushLoadedImage");
    },
    setDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const date = today.getDate().toString().padStart(2, "0");
      this.date = year+month+date;
    }
  },
  
};
</script>

<style lang="scss" scoped>
.images {
  display: flex;
  justify-content: center;
  max-width: 100%;
  width: 100%;
  position: relative;
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
.imageWrapper {
  position: relative;
  overflow: hidden;
  /* box-sizing: content-box; */
  @include responsive(xs) {
    overflow: visible;
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
// 注意：createDummyContent関数内で以下のborderの値をハードコーディングで使用しているため、
//      ここの値を変更する場合は、一緒にcreateDummyContentも変更必要（あとで直す）
.image {
  max-width: 100%;
  @include responsive(xs) {
    /* border-radius: 1.5%; */
    /* box-shadow: 1px 1px 5px var(--grey); */
    /* border: 1px var(--site-border) solid; */
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
.marginRight {
  margin-right: 10px;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  /* box-shadow: none; */
  /* filter: blur(2px); */
  border: none;
  z-index: -1;
}

.image-leave-active {
  transition: opacity .5s;
}
.image-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
