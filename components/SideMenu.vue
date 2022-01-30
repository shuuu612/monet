<template>
  <div class="sideMenuWrapper">
    <div v-if="$store.getters['sideMenu/getOpen']" class="mask" @click="clickButton"></div>
    <div id="sideMenu" class="sideMenu" :class="[getOpen,getClose]" @scroll="scrolledSideMenu">
      <div class="tabMenus">
        <div class="tabMenu button" :class="getSelectedTab('tag')" @click="clickTab('tag')">カテゴリー</div>
        <div class="tabMenu button" :class="getSelectedTab('multiple')" @click="clickTab('multiple')">複数選択</div>
        <div class="tabMenu button" :class="getSelectedTab('favorite')" @click="clickTab('favorite')">お気に入り</div>
        <div class="tabMenu button" :class="getSelectedTab('setting')" @click="clickTab('setting')">設定</div>
      </div>
      <div class="sideMenuContents">
        <div v-show="selectedTag" class="sideMenuContent">
          <div class="tagContents">
            <div v-for="name in tagname" :key="name" class="tagContent">
              <div class="sideMenuSubTitle tagStyle">{{name.toUpperCase()}}</div>
              <div class="tagItems">
                <div v-for="item in tag[name].contents" :key="item.id" class="tagItem" :class="getSelectedTag(name, item.id, 1)">
                  <div class="tagLinks" @click="clickButton">
                    <nuxt-link v-if="getSelectedTag(name, item.id, 0)" :to="`/tag/${name}=${item.id}*and`" class="tagLink button">
                      <div v-if="name === 'color'" class="colorImage" :class="`${item.id}`"></div>
                      <div class="tagLinkText">
                        <div>{{item.name}}</div>
                        <div class="tagLinkTextLine"></div>
                      </div>
                    </nuxt-link>
                    <div v-else class="tagLink button" @click="$moveTop">
                      <div v-if="name === 'color'" class="colorImage"></div>
                      <div>{{item.name}}</div>
                    </div>
                    <div class="starButton button" @click.stop="setFavoriteTags(item.id)">
                      <svg class="starImage" :class="getAddedFavoriteTags(item.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 567.13 539.38" fill="transparent" stroke="#ffffff">
                        <polygon points="283.57 45.19 357.91 195.83 524.15 219.99 403.86 337.25 432.26 502.81 283.57 424.64 134.88 502.81 163.27 337.25 42.98 219.99 209.22 195.83 283.57 45.19" style="stroke-miterlimit:10;stroke-width:40px"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="selectedMultiple" class="sideMenuContent">
          <div class="tagContents">
            <div v-for="name in tagname" :key="name" class="tagContent">
              <div class="sideMenuSubTitle tagStyle">{{name.toUpperCase()}}</div>
              <div class="tagItems">
                <div v-for="item in tag[name].contents" :key="item.id" class="tagItem" :class="getMultipleSelected(name, item.id)">
                  <div class="tagLinks" @click.stop="clickMultipleContent(name, item.id)">
                    <div class="tagLink button tagLinkMultiple">
                      <div class="tagLinkText tagLinkTextMultiple">
                        <div>{{item.name}}</div>
                        <!-- <div class="tagLinkTextLine"></div> -->
                      </div>
                    </div>
                    <!-- <div v-else class="tagLink button" @click="$moveTop">{{item.name}}</div> -->
                    <!-- <div class="starButton button" @click.stop="setFavoriteTags(item.id)">
                      <svg class="starImage" :class="getAddedFavoriteTags(item.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 567.13 539.38" fill="transparent" stroke="#ffffff">
                        <polygon points="283.57 45.19 357.91 195.83 524.15 219.99 403.86 337.25 432.26 502.81 283.57 424.64 134.88 502.81 163.27 337.25 42.98 219.99 209.22 195.83 283.57 45.19" style="stroke-miterlimit:10;stroke-width:40px"/>
                      </svg>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="multipleMenu" :class="getMultipleMenuOpen">
            <div class="hitViewWrapper">
              <div class="hitView">{{getMultipleHit}} 件</div>
            </div>
            <div class="multipleMenuButtons">
              <div class="conditionSwitchs button" :class="{selectedOr: selectedOr, selectedAnd: selectedAnd}" @click="clickSwitch">
                <div class="conditionSwitch orSwitch">OR</div>
                <div class="conditionSwitch andSwitch">AND</div>
              </div>
              <button class="multipleMenuButton clearButton button" :class="getClearDeactive" :disabled="getClearDisabled" @click="clickCrear">クリア</button>
              <button class="multipleMenuButton startButton button" :class="getStartDeactive" :disabled="getStartDisabled" @click="clickStart(); clickButton()">決定</button>
            </div>
          </div>
        </div>
        <div v-show="selectedFavorite" class="sideMenuContent">
          <div class="tagContents">
            <div v-if="getNoContent" class="noFavoriteTagsComment">お気に入りのタグは登録されていません</div>
            <template v-for="name in tagname">
              <div v-if="getFavoritedType(name)" :key="name" class="tagContent">
                <div class="sideMenuSubTitle tagStyle">{{name.toUpperCase()}}</div>
                <div class="tagItems">
                  <template v-for="item in tag[name].contents">
                    <div v-if="getFavorited(item.id)" :key="item.id" class="tagItem" :class="getSelectedTag(name, item.id, 1)">
                      <div class="tagLinks" @click="clickButton">
                        <nuxt-link v-if="getSelectedTag(name, item.id, 0)" :to="`/tag/${name}=${item.id}*and`" class="tagLink button">
                          <div class="tagLinkText">
                            <div>{{item.name}}</div>
                            <div class="tagLinkTextLine"></div>
                          </div>
                        </nuxt-link>
                        <div v-else class="tagLink button" @click="$moveTop">{{item.name}}</div>
                        <div class="starButton button" @click.stop="setFavoriteTags(item.id)">
                          <svg class="starImage" :class="getAddedFavoriteTags(item.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 567.13 539.38" fill="transparent" stroke="#ffffff">
                            <polygon points="283.57 45.19 357.91 195.83 524.15 219.99 403.86 337.25 432.26 502.81 283.57 424.64 134.88 502.81 163.27 337.25 42.98 219.99 209.22 195.83 283.57 45.19" style="stroke-miterlimit:10;stroke-width:40px"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div v-show="selectedSetting" class="sideMenuContent">
          <div class="controllerContents">
            <div class="controllerContent">
              <div class="controllerTitle">デバイス</div>
              <div class="controllerItems">
                <button class="controllerItem" :class="getStatePC" :disabled="getDevicePcDisabled" @click="$store.dispatch('devicePattern/pushPC')">
                  <div>
                    <div class="typeImageWrapper">
                      <!-- <img class="typeImagePC" src="/images/PC.svg" alt=""> -->
                      <svg class="typeImage typeImagePC" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 299" fill="#ffffff">
                        <path d="M348.44,0H8.56A8.56,8.56,0,0,0,0,8.56V240.44A8.56,8.56,0,0,0,8.56,249H348.44a8.56,8.56,0,0,0,8.56-8.56V8.56A8.56,8.56,0,0,0,348.44,0ZM331,219.12a4.87,4.87,0,0,1-4.88,4.88H29.88A4.87,4.87,0,0,1,25,219.12V29.88A4.87,4.87,0,0,1,29.88,25H326.12A4.87,4.87,0,0,1,331,29.88Z"/>
                        <rect class="cls-1" x="66" y="274" width="225" height="25" rx="2.6"/>
                      </svg>
                    </div>
                    <div class="typeTitle">デスクトップ</div>
                  </div>
                </button>
                <button class="controllerItem" :class="getStateTB" :disabled="getDeviceTbDisabled" @click="$store.dispatch('devicePattern/pushTB')">
                  <div>
                    <div class="typeImageWrapper">
                      <!-- <img class="typeImageTB" src="/images/TB.svg" alt=""> -->
                      <svg class="typeImage typeImageTB" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 315.88 374.1" fill="#ffffff">
                        <path d="M304.56,0H11.32A11.32,11.32,0,0,0,0,11.32V362.78A11.32,11.32,0,0,0,11.32,374.1H304.56a11.32,11.32,0,0,0,11.32-11.32V11.32A11.32,11.32,0,0,0,304.56,0Zm-17.8,340.3a9.06,9.06,0,0,1-9.05,9.06H37a9.06,9.06,0,0,1-9.06-9.06V37.87a9.06,9.06,0,0,1,9.06-9H277.71a9,9,0,0,1,9.05,9Z"/>
                      </svg>
                    </div>
                    <div class="typeTitle">タブレット</div>
                  </div>
                </button>
                <button class="controllerItem" :class="getStateSP" :disabled="getDeviceSpDisabled" @click="$store.dispatch('devicePattern/pushSP')">
                  <div>
                    <div class="typeImageWrapper">
                      <!-- <img class="typeImageSP" src="/images/SP.svg" alt=""> -->
                      <svg class="typeImage typeImageSP" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.45 386.3" fill="#ffffff">
                        <path d="M207.69,0H8.76A8.76,8.76,0,0,0,0,8.76V377.54a8.76,8.76,0,0,0,8.76,8.76H207.69a8.76,8.76,0,0,0,8.76-8.76V8.76A8.76,8.76,0,0,0,207.69,0Zm-19.8,351a8.21,8.21,0,0,1-8.22,8.21H35.57A8.21,8.21,0,0,1,27.35,351V36.77a8.22,8.22,0,0,1,8.22-8.21h144.1a8.22,8.22,0,0,1,8.22,8.21Z"/>
                        <rect x="75.16" y="9.02" width="63.13" height="37.58" rx="4.34"/>
                      </svg>
                    </div>
                    <div class="typeTitle">スマートフォン</div>
                  </div>
                </button>
              </div>
              <div class="controllerItems checkboxStyle">
                <label class="checkboxWrapper">
                  <input id="checkbox" class="checkbox" type="checkbox" name="check" :checked="getDeviceCheckboxChecked" @input="deviceCheckboxChange">マルチデバイスを有効にする
                </label>
              </div>
            </div>
            <div class="controllerContent">
              <div class="controllerTitle">サイズ</div>
              <div class="controllerItems sliderStyle">
                <img class="sliderImageSmall" src="/images/square-small.svg" alt="">
                <input id="slider" type="range" name="size" min="0.25" max="1" step="0.075" :value="getSliderValue" @input="sliderChange">
                <img class="sliderImageLarge" src="/images/square-large.svg" alt="">
                {{$store.getters["slider/getSteps"].indexOf(true)}}
              </div>
              <div class="controllerItems checkboxStyle">
                <label class="checkboxWrapper">
                  <input id="checkbox" class="checkbox" type="checkbox" name="check" :checked="getSliderCheckboxChecked" @input="sliderCheckboxChange">自動調整を有効にする
                </label>
              </div>
              <div v-if="getNotice" class="sliderNotice">
                <svg class="sliderNoticeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.94 400.94">
                  <circle cx="200.47" cy="117.76" r="28.42"/>
                  <path d="M200.47,188.35c-12.32,0-22.32,7.6-22.32,17v93.22c0,9.38,10,17,22.32,17s22.32-7.61,22.32-17V205.34C222.79,196,212.8,188.35,200.47,188.35Z"/>
                  <circle cx="200.47" cy="200.47" r="180.47" style="fill:none;stroke:#231815;stroke-miterlimit:10;stroke-width:40px"/>
                </svg>
                <div class="sliderNoticeTexts">
                  <div class="sliderNoticeText main">手動調整中</div>
                  <div class="sliderNoticeText sub">ブラウザサイズに変更があった場合は、表示崩れを防止するため手動調整を中止し自動調整が有効になります</div>
                </div>
              </div>
            </div>
            <div class="controllerContent">
              <div class="controllerTitle">ダークモード</div>
              <div class="controllerItems">
                <button class="controllerItem" :class="getDarkmodeOn" :disabled="getDarkmodeOnDisabled" @click="clickDarkmode('on')">
                  <div class="typeTitle typeTitleDarkmode">ON</div>
                </button>
                <button class="controllerItem" :class="getDarkmodeOff" :disabled="getDarkmodeOffDisabled" @click="clickDarkmode('off')">
                  <div class="typeTitle typeTitleDarkmode">OFF</div>
                </button>
                <button class="controllerItem" :class="getDarkmodeOs" :disabled="getDarkmodeOsDisabled" @click="clickDarkmode('os')">
                  <div class="typeTitle typeTitleDarkmode">OSの設定</div>
                </button>
              </div>
            </div>
            <div class="controllerItems working">
              <label class="checkboxWrapper">
                <input id="checkbox" class="checkbox" type="checkbox" name="check" value="test" checked>リンク切れのサイトを表示しない
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: false,
      default: undefined,
    },
    selectedtag: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
  data() {
    return {
      /* open: false, */
      /* controllerOpen: false, */
      /* scrollAmount: 0, */
      /* scrollAmountSideMenu: 0, */
      tagname: [
        'type',
        'industry',
        'impression',
        'layout',
        'color',
        'pickup',
        'technique',
        'technology',
      ],
      selectedTag: true,
      selectedMultiple: false,
      selectedFavorite: false,
      selectedSetting: false,
      selectedOr: true,
      selectedAnd: false,
    };
  },
  computed: {
    getStatePC() {
      return {
        active: this.$store.getters['devicePattern/getActivePC'],
        disabled: this.$store.getters['devicePattern/getDisabledPC']
      };
    },
    getStateTB() {
      return {
        active: this.$store.getters['devicePattern/getActiveTB'],
        disabled: this.$store.getters['devicePattern/getDisabledTB']
      };
    },
    getStateSP() {
      return {
        active: this.$store.getters['devicePattern/getActiveSP'],
        disabled: this.$store.getters['devicePattern/getDisabledSP']
      };
    },
    getDarkmodeOn() {
      return {
        active: this.$store.getters['darkmode/getSelectedOn']
      };
    },
    getDarkmodeOff() {
      return {
        active: this.$store.getters['darkmode/getSelectedOff']
      };
    },
    getDarkmodeOs() {
      return {
        active: this.$store.getters['darkmode/getSelectedOs']
      };
    },
    getDarkmodeOnDisabled() {
      return this.$store.getters['darkmode/getSelectedOn']
    },
    getDarkmodeOffDisabled() {
      return this.$store.getters['darkmode/getSelectedOff']
    },
    getDarkmodeOsDisabled() {
      return this.$store.getters['darkmode/getSelectedOs']
    },
    getStateList() {
      return {
        active: this.$store.getters['viewPattern/getActiveList'],
        disabled: this.$store.getters['viewPattern/getActiveList'],
      };
    },
    getStateGrid() {
      return {
        active: this.$store.getters['viewPattern/getActiveGrid'],
        disabled: this.$store.getters['viewPattern/getActiveGrid'],
      };
    },
    getSliderValue() {
      return  this.$store.getters['slider/getValue']
    },
    /* getCheckboxValue() {
      return  { auto: this.$store.getters['slider/getAutoSizing'] }
    }, */
    getDeviceCheckboxChecked() {
      return  this.$store.getters['devicePattern/getMultidevaice']
    },
    getSliderCheckboxChecked() {
      return  this.$store.getters['slider/getAutoSizing']
    },
    getOpen() {
      return { isOpen: this.$store.getters['sideMenu/getOpen'] }
    },
    getClose() {
      return { isClose: !this.$store.getters['sideMenu/getOpen'] }
    },
    getSelectedTag() {
      return function(name, id) {
        if(name === 'type') {
          return { selected: this.selectedtag.type.includes(id)}
        }else if(name === 'industry') {
          return { selected: this.selectedtag.industry.includes(id)}
        }else if(name === 'impression') {
          return { selected: this.selectedtag.impression.includes(id)}
        }else if(name === 'layout') {
          return { selected: this.selectedtag.layout.includes(id)}
        }else if(name === 'color') {
          return { selected: this.selectedtag.color.includes(id)}
        }else if(name === 'pickup') {
          return { selected: this.selectedtag.pickup.includes(id)}
        }else if(name === 'technique') {
          return { selected: this.selectedtag.technique.includes(id)}
        }else if(name === 'technology') {
          return { selected: this.selectedtag.technology.includes(id)}
        }
        
      }
    },
    getMultipleSelected() {
      return function(name, id) {
        const content = this.$store.getters['multipleSelect/getContents']
        if(name === 'type') {
          return { multipleSelected: content.type.includes(id)}
        }else if(name === 'industry') {
          return { multipleSelected: content.industry.includes(id)}
        }else if(name === 'impression') {
          return { multipleSelected: content.impression.includes(id)}
        }else if(name === 'layout') {
          return { multipleSelected: content.layout.includes(id)}
        }else if(name === 'color') {
          return { multipleSelected: content.color.includes(id)}
        }else if(name === 'pickup') {
          return { multipleSelected: content.pickup.includes(id)}
        }else if(name === 'technique') {
          return { multipleSelected: content.technique.includes(id)}
        }else if(name === 'technology') {
          return { multipleSelected: content.technology.includes(id)}
        }
      }
    },
    /* getSelectedButton() {
      return function(key) {
        if(key === 'home') {
          return { selectedButton: this.$store.getters['sideMenu/getSelectedHome']}
        }else if(key === 'tag') {
          return { selectedButton: this.$store.getters['sideMenu/getSelectedTag']}
        }else if(key === 'search') {
          return { selectedButton: this.$store.getters['sideMenu/getSelectedSearch']}
        }else if(key === 'bookmark') {
          return { selectedButton: this.$store.getters['sideMenu/getSelectedBookmark']}
        }else if(key === 'setting') {
          return { selectedButton: this.$store.getters['sideMenu/getSelectedSetting']}
        }
      }
    }, */
    /* getHide() { 
      return { hide: this.$store.getters['sideMenu/getOpen'] }
    }, */
    getAddedFavoriteTags() {
      return function (id) {
        return { favoriteTagsColor: this.$store.getters['favoriteTags/getInclusionFavoriteTags'](id) }
      }
    },
    getSelectedTab() {
      return function(key) {
        if(key === 'tag') {
          return { selectedTab: this.selectedTag }
        }else if(key === 'setting') {
          return { selectedTab: this.selectedSetting}
        }else if(key === 'multiple') {
          return { selectedTab: this.selectedMultiple}
        }else if(key === 'favorite') {
          return { selectedTab: this.selectedFavorite}
        }
      }
    },
    getMultipleMenuOpen() {
      return { multipleMenuOpen: this.$store.getters['sideMenu/getOpen'] && this.selectedMultiple}
    },
    getMultipleHit() {
      return this.$store.getters['multipleSelect/getHit']
    },
    getClearDeactive() {
      return { deactive: !this.$store.getters['multipleSelect/getActive'] }
    },
    getClearDisabled() {
      return !this.$store.getters['multipleSelect/getActive']
    },
    getStartDeactive() {
      return { deactive: this.$store.getters['multipleSelect/getHit'] === 0 }
    },
    getStartDisabled() {
      return this.$store.getters['multipleSelect/getHit'] === 0
    },
    getDevicePcDisabled() {
      return this.$store.getters['devicePattern/getDisabledPC']
    },
    getDeviceTbDisabled() {
      return this.$store.getters['devicePattern/getDisabledTB']
    },
    getDeviceSpDisabled() {
      return this.$store.getters['devicePattern/getDisabledSP']
    },
    getFavorited() {
      return function (key) {
        return this.$store.getters['favoriteTags/getInclusionFavoriteTags'](key)
      }
    },
    getFavoritedType() {
      return function (key) {
        const tag = this.tag[key].contents
        const result = tag.find((item) => {
          return this.$store.getters['favoriteTags/getInclusionFavoriteTags'](item.id)
        })
        return result !== undefined
      }
    },
    getNoContent() {
      const favorite = this.$store.getters['favoriteTags/getFavoriteTags']
      return favorite.length === 0
    },
    /* getDevice() {
      return { mobile: this.$store.getters['windowSize/getWindowWidth'] < 768, desktop: this.$store.getters['windowSize/getWindowWidth'] >= 768}
    } */
    getNotice() {
      return !this.$store.getters["slider/getAutoSizing"]
    }
  },
  created() {

  },
  mounted() {

    const sliderElement = document.getElementById('slider');
    /* sliderElement.addEventListener('input', this.sliderChange); */

    /* const checkboxElement = document.getElementById('checkbox');
    checkboxElement.addEventListener('input', this.sliderCheckboxChange); */

    /* const sideMenuElement = document.getElementById('sideMenu');
    sideMenuElement.addEventListener('scroll', () => {this.scrolledSideMenu(sideMenuElement)}) */
    
    window.addEventListener('load', () => {this.sliderInitialSet(sliderElement);})
    /* window.addEventListener('scroll', this.scrolledWindow) */
    
    
  },
  beforeDestroy() {
    /* window.removeEventListener('resize', this.setInitialValue); */
    const sliderElement = document.getElementById('slider');
    /* const checkboxElement = document.getElementById('checkbox');
    const sideMenuElement = document.getElementById('sideMenu');
    sliderElement.removeEventListener('input', this.sliderChange);
    checkboxElement.removeEventListener('input', this.sliderCheckboxChange); */
    window.removeEventListener('load', () => {this.sliderInitialSet(sliderElement);})
    /* window.removeEventListener('scroll', this.scrolledWindow) */
    /* sideMenuElement.removeEventListener('scroll', () => {this.scrolledSideMenu(sideMenuElement)}) */
  },
  methods: {
    /* setOpen(value) {
      this.open = value;
    }, */
    clickButton() {
      console.log('clickButton')
      this.$store.dispatch('sideMenu/pushOpen')
    },
    clickTab(key) {
      console.log('clickTab')
      if(key === 'tag') {
        this.selectedTag = true
        this.selectedSetting = false
        this.selectedMultiple = false
        this.selectedFavorite = false
      }else if(key === 'setting') {
        this.selectedTag = false
        this.selectedSetting = true
        this.selectedMultiple = false
        this.selectedFavorite = false
      }else if(key === 'multiple') {
        this.selectedTag = false
        this.selectedSetting = false
        this.selectedMultiple = true
        this.selectedFavorite = false
      }else if(key === 'favorite') {
        this.selectedTag = false
        this.selectedSetting = false
        this.selectedMultiple = false
        this.selectedFavorite = true
      }
    },
    clickMultipleContent(name, id) {
      if(name === 'type') {
        this.$store.dispatch('multipleSelect/pushType', id)
      }else if(name === 'industry') {
        this.$store.dispatch('multipleSelect/pushIndustry', id)
      }else if(name === 'impression') {
        this.$store.dispatch('multipleSelect/pushImpression', id)
      }else if(name === 'layout') {
        this.$store.dispatch('multipleSelect/pushLayout', id)
      }else if(name === 'color') {
        this.$store.dispatch('multipleSelect/pushColor', id)
      }else if(name === 'pickup') {
        this.$store.dispatch('multipleSelect/pushPickup', id)
      }else if(name === 'technique') {
        this.$store.dispatch('multipleSelect/pushTechnique', id)
      }else if(name === 'technology') {
        this.$store.dispatch('multipleSelect/pushTechnology', id)
      }
    },
    clickStart() {
      console.log('clickStart')
      this.$store.dispatch('multipleSelect/pushStart')
    },
    clickCrear() {
      console.log('clickCrear')
      this.$store.dispatch('multipleSelect/pushClear')
    },
    clickSwitch() {
      this.selectedOr = !this.selectedOr
      this.selectedAnd = !this.selectedAnd
      if(this.selectedOr) {
        this.$store.dispatch('multipleSelect/pushCondition','or')
      }else {
        this.$store.dispatch('multipleSelect/pushCondition','and')
      }
      
    },
    sliderChange(event) {
      /* if(this.$store.getters['slider/getStepData'].includes(Number(event.target.value))) {
        this.$store.dispatch('slider/pushSlider',event.target.value)
      }  */

      this.$store.dispatch('slider/pushSlider',event.target.value)
      
      // 自動調整中の場合はチェックを外す
      /* if(this.$store.getters['slider/getAutoSizing']) {
        this.$store.dispatch('slider/pushAutoSizing')
      } */

    },
    sliderInitialSet(data) {
      this.$store.dispatch('slider/pushSliderInitial',data)
    },
    deviceCheckboxChange() {
      this.$store.dispatch('devicePattern/pushMultidevaice')
    },
    sliderCheckboxChange() {
      this.$store.dispatch('slider/pushAutoSizing')
    },
    /* setInitialValue() {
      this.initialValue = 0.625
      this.initialValue = this.$store.getters['slider/getValue']
    } */
    /* openController() {
      this.controllerOpen = !this.controllerOpen
    }, */
    /* scrolledWindow() {
      const scroll = window.pageYOffset
      this.scrollAmount = scroll
    }, */
    scrolledSideMenu(element) {
      const scroll = element.srcElement.scrollTop
      this.$store.dispatch('scroll/pushSideMenuScroll',scroll)
    },
    setFavoriteTags(id) {
      console.log('setFavoriteTags')
      if(!window.localStorage) {
        alert("ブラウザのローカルストレージがOFFになっています。\nお気に入り機能を使用するため、ブラウザの設定でローカルストレージをONにしてください。");
        return;
      }
      this.$store.dispatch('favoriteTags/pushFavoriteTags',id)
    },
    clickDarkmode(key) {
      if(key === 'on') {
        this.$store.dispatch('darkmode/pushDarkmodeOn')
      }else if(key === 'off') {
        this.$store.dispatch('darkmode/pushDarkmodeOff')
      }else if(key === 'os') {
        this.$store.dispatch('darkmode/pushDarkmodeOs')
      }
    }

  },
  
};
</script>

<style lang="scss" scoped>
.sideMenuWrapper {
  
}

.starButton {
  width: 32px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  &:hover {
    background-color: var(--side-menu-favorate-button-hover);
  }
}

.starImage {
  width: 14px;
  stroke: var(--side-menu-favorate-icon);
  transition: fill .2s,stroke .2s;
}

.favoriteTagsColor {
  fill: var(--side-menu-favorate-icon-registered-fill);
  stroke: var(--side-menu-favorate-icon-registered-stroke);
}

/* .selectedButton {
  fill: var(--blue);
  stroke: var(--blue);
} */

.tabMenus {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: var(--side-menu-tab-overall-border) 1px solid;
  /* padding-right: 30px; */
}

.tabMenu {
  padding: 5px 2px;
  color: var(--side-menu-tab-text);
  &:not(:first-child) {
    margin-left: 26px;
  }
}

.selectedTab {
  color: var(--side-menu-tab-text-selected);
  border-bottom: var(--side-menu-tab-border-selected) 2px solid;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--side-menu-mask);
  z-index: 90;
}

.sideMenu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: var(--sideMenuWidth);
  height: 100vh;
  background-color: var(--side-menu-background);
  
  z-index: 100;
  &.isClose {
    transform: translateX(calc(-1 * var(--sideMenuWidth)));
  }
  padding: 50px 15px 40px 15px;
  overflow-y: scroll;
  // スライドバー非表示
  -ms-overflow-style: none;
  scrollbar-width: none;
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    /* width: var(--sideMenuWidth); */
    /* &.isClose {
      transform: translateX(calc(-1 * var(--sideMenuWidth)));
    } */
    padding: 100px 15px 15px 15px;
  }
  @include responsive(lg) {
    
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}
.sideMenu::-webkit-scrollbar {
  // スライドバー非表示
  display:none;
}

.sideMenuContents {
  margin-top: 20px;
}

.sideMenuContent {
  
}

.partitionOpen {
  &:nth-child(4) {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      /* margin: auto 0; */
      background-color: rgba(255, 255, 255, 0.267);
      position: relative;
      /* left: -10px; */
      margin-bottom: 20px;
      margin-top: 20px
    }
  }
}

.sideMenuTitle {
  display: flex;
  position: relative;
  font-size: var(--font-size-lg);
  font-weight: 400;
  margin-left: 10px;
}



/* .sideMenuLink {
  color: var(--white);
  text-decoration: none;
  font-size: var(--font-size-md);
} */

/* .arrowButton {
  width: 12px;
  display: flex;
  align-content: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
}

.arrowButtonImage {
  width: 100%;
  transform: rotate(-90deg);
  transition: transform .25s;
}

.arrowOpen {
  transform: rotate(0);
} */

.controllerContents {
  /* clip-path:inset(0 0 100% 0);
  transition: clip-path .25s;
  display: none; */
  /* padding-bottom: 20px; */
}

/* .controllerContentsOpen {
  clip-path:inset(0 0 0 0);
  display: block;
} */

.tagContents {
  /* clip-path:inset(0 0 100% 0);
  transition: clip-path .25s;
  display: none; */
}

.noFavoriteTagsComment {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.controllerContent {
  &:not(:first-child) {
    margin-top: 40px;
  }
}

.sideMenuSubTitle {
  font-size: var(--font-size-xs);
}

.controllerTitle {
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.controllerItems {
  /* font-size: var(--font-size-xs); */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  width: 100%;
  background-color: var(--side-menu-setting-button);
  border-radius: 5px;
}

.controllerItem {
  /* border-radius: 5px; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow:1;
  height: 50px;
  &:first-child {
    border-radius: 5px 0 0 5px;
  }
  &:last-child {
    border-radius: 0 5px 5px 0;
  }
}

.sliderStyle {
  margin-top: 18px;
  background-color: transparent;
  justify-content: left;
}

.sliderImageSmall {
  width: 12px;
  margin-right: 10px;
}

.sliderImageLarge {
  width: 17px;
  margin-left: 10px;
}

.sliderNotice {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: var(--grey-super-light);
  margin-top: 20px;
  border-radius: 4px;
}

.sliderNoticeIcon {
  width: 21px;
  margin-right: 8px;
}

.sliderNoticeText {
  color: var(--black);
  font-size: var(--font-size-xs);
  &:not(:first-child) {
    margin-top: 3px;
  }
  &.main {
    font-weight: 400;
    font-size: var(--font-size-sm);
  }
}

.checkboxStyle {
  justify-content: left;
  background-color: transparent;
  margin-top: 22px;
}

.tagContent {
  &:not(:first-child) {
    margin-top: 30px;
  }
  
}

.tagStyle {
  font-size: var(--font-size-sm);
  margin-left: 10px;
  font-weight: 500;
}

.tagItems {
  border-radius: 5px;
  background-color: var(--side-menu-category-group-background);
  padding: 10px 0;
  margin-top: 3px;
  
}

.tagItem {
  &:not(:first-child) {
    margin-top: 10px;
  }
  display: flex;
  align-items: center;
  width: 100%;
}

.tagLinks {
  position: relative;
  width: 100%;

}

.colorImage {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--white);
  margin-right: 8px;
  &.red {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-red) 100%);
  }
  &.pink {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-pink) 100%);
  }
  &.purple {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-purple) 100%);
  }
  &.blue {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-blue) 100%);
  }
  &.green {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-green) 100%);
  }
  &.yellow {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-yellow) 100%);
  }
  &.orange {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-orange) 100%);
  }
  &.brown {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-brown) 100%);
  }
  &.white {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-white) 100%);
  }
  &.beige {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-beige) 100%);
  }
  &.grey {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-grey) 100%);
  }
  &.black {
    background: linear-gradient(to bottom, var(--side-menu-color-image-gradation-start) -150%, var(--side-menu-color-image-black) 100%);
  }
  &.colorful {
    background: linear-gradient(to right, var(--side-menu-color-image-red), var(--side-menu-color-image-yellow), var(--side-menu-color-image-blue));
  }
  &.gradation {
    background: linear-gradient(to right, var(--side-menu-color-image-blue), var(--side-menu-color-image-white));
  }
  &.pastel {
      background: linear-gradient(to right, #9796f0, #fbc7d4);
  }
  &.monotone {
    background: linear-gradient(to right, var(--side-menu-color-image-white) 40%, var(--side-menu-color-image-black) 55%);
  }
}

.tagLink {
  display: inline-flex;
  align-items: center;
  padding: 5px 15px;
  text-decoration: none;
  color: var(--side-menu-category-text);
  width: 100%;
  /* height: 30px; */
  &:hover {
    /* color: var(--blue); */
    /* background-color: var(--blue-dark); */
    /* border-bottom: var(--blue) 2px solid; */
  }
  /* .selected &:hover {
    background-color: var(--black-light);
  } */
  .selected & {
    color: var(--side-menu-category-text-selected);
    font-weight: 500;
  }
  .multipleSelected & {
    background-color: var(--side-menu-multiple-background-selected);
    font-weight: 500;
    color: var(--side-menu-multiple-text-selected);
    /* &:hover {
      background-color: var(--blue-dark);
    } */
  }
  border-radius: 50px;
}

.tagLinkMultiple {
  padding: 6px 15px;
  &:hover {
    /* background-color: var(--grey-ultra-light); */
  }

}

.tagLinkText {
  margin-top: 2px;
  .tagLink:hover & {
    font-weight: 400;
  }
}

.tagLinkTextMultiple {
  .tagLink:hover & {
    /* color: var(--black); */
  }
}
.tagLinkTextLine {
  height: 1px;
  width: 0;
  margin-top: 1px;
  background-color: var(--side-menu-category-border-hover);
  /* clip-path:inset(0 100% 0 0); */
  /* transition: clip-path .2s; */
  transition: width .2s;
  .tagLink:hover & {
    /* clip-path:inset(0 0 0 0); */
    width: 100%;
  }
}

.button {
  user-select: none;
  cursor: pointer;
}

.order {
  width: 45px;
  height: 20px;
}

.listImage {
  width: 16px;
  margin-right: 5px;
}

.listTitle {
  margin-bottom: 2px;
  font-size: var(--font-size-xs);
}

.typeImageWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
}

.typeImage {
  fill: var(--side-menu-setting-device-icon);
  .active & {
    fill: var(--side-menu-setting-device-icon-active);
  }
}

.typeImagePC {
  width: 22px;
}

.typeImageTB {
  width: 17px;
}

.typeImageSP {
  width: 12px;
}

.typeTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xxs);
  margin-top: 3px;
  color: var(--side-menu-setting-device-text);
  .active & {
    color: var(--side-menu-setting-device-text-active);
    font-weight: 500;
  }
}

.typeTitleDarkmode {
  font-size: var(--font-size-xs);
}

.active {
  background-color: var(--side-menu-setting-button-selected);
}

.disabled {
  pointer-events: none;
}

.itemImage {
  height: 100%;
  
}

.checkboxWrapper {
  display: flex;
  align-items: center;
  font-size:   var(--font-size-xs);
  margin-left: 0px;
}

.checkbox {
  margin-right: 5px;
}

.hide {
  display: none;
}

.working {
  display: none;
}

// スライダーのスタイル
input[type="range"] {
  -webkit-appearance: none;         // お決まり
  appearance: none;                 // お決まり
  cursor: pointer;                  // カーソル
  outline: none;                    // スライダーのアウトライン
  background: var(--side-menu-setting-slider-background);               // スライダーの背景色
  height: 3px;                      // スライダーの高さ
  width: 60%;                      // スライダーの幅
  border-radius: 10px;              // スライダーの端の丸み
  // -webkit-向けのつまみ
  &::-webkit-slider-thumb {
    -webkit-appearance: none;       // お決まり
    background: var(--side-menu-setting-slider-button);     // 背景色
    width: 16px;                    // 幅
    height: 16px;                   // 高さ
    border-radius: 50%;             // 円形に
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); // 影
  }
  // -moz-向けのつまみ
  &::-moz-range-thumb {
    background: var(--side-menu-setting-slider-button);     // 背景色
    width: 18px;                    // 幅
    height: 18px;                   // 高さ
    border-radius: 50%;             // 円形に
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); // 影
    border: none;                   // デフォルトの線を消す
  }
  // Firefoxで点線が周りに表示されてしまう問題の解消
  &::-moz-focus-outer {
    border: 0;
  }
  // つまみをドラッグしているときのスタイル
  &:active::-webkit-slider-thumb {
    box-shadow: 0px 5px 10px -2px rgba(0, 0, 0, 0.3);
  }
}

.multipleMenu {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  height: 110px;
  width: 100%;
  max-width: var(--sideMenuWidth);
  position: fixed;
  bottom: 40px;
  left: 0;
  z-index: 55;
  background-color: var(--side-menu-multiple-under-menu-background);
  border-top: var(--side-menu-multiple-under-menu-border-top) 1px solid;
  transform: translateY(70px);
  transition: transform .4s;
  padding: 10px 20px;
  &.multipleMenuOpen {
    transform: translateY(0);
  }
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    /* width: var(--sideMenuWidth); */
    bottom: 0;
    height: 150px;
    padding: 15px 20px;
  }
  @include responsive(lg) {
    
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.hitViewWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    margin-bottom: 15px;
  }
  @include responsive(lg) {
    
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.hitView {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  padding: 5px 0;
  /* border-bottom: var(--grey) 1px solid; */
  margin-right: 20px;
  font-size: var(--font-size-lg);
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    padding: 10px 0;
  }
  @include responsive(lg) {
    
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}

.multipleMenuButtons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.conditionSwitchs {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  border-radius: 50px;
  padding: 5px 5px;
  background-color: var(--side-menu-multiple-under-menu-switch-overall-background);
  margin-right: 10px;
  &::after {
    content: '';
    position: absolute;
    top: 4.5px;
    left: 4.5px;
    background-color: var(--side-menu-multiple-under-menu-switch-background-selected);
    width: 42.5px;
    height: 33px;
    border-radius: 50px;
    z-index: 50;
    transition: left .2s;
    /* &.selectedAnd {
      left: 54.5px;
    } */
  }
  &.selectedAnd {
    &::after {
      left: 52.5px;
    }
  }
}

.conditionSwitch {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--side-menu-multiple-under-menu-switch-background);
  padding: 8px 5px;
  border-radius: 50px;
  width: 47px;
  transition: background-color .2s;
  color: var(--side-menu-multiple-under-menu-switch-text);
  &:first-child {
    margin-right: 5px;
  }
  font-size: var(--font-size-xs);
  
}

.orSwitch {
  .selectedOr & {
    background-color: transparent;
    z-index: 60;
    color: var(--side-menu-multiple-under-menu-switch-text-selected);
    font-weight: 400;
  }
  .selectedAnd & {
    
  }
}

.andSwitch {
  .selectedOr & {

  }
  .selectedAnd & {
    background-color: transparent;
    z-index: 60;
    color: var(--side-menu-multiple-under-menu-switch-text-selected);
    font-weight: 400;
  }
}

.multipleMenuButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  padding: 11px 0;
  border-radius: 50px;
  font-weight: 400;
  &:not(:last-child) {
    margin-right: 10px;
  }
  
}

.startButton {
  background-color: var(--side-menu-multiple-under-menu-start-button-background);
}

.clearButton {
  background-color: var(--side-menu-multiple-under-menu-clear-button-background);
}

.deactive {
  background-color: var(--side-menu-multiple-under-menu-button-background-deactive);
  color: var(--side-menu-multiple-under-menu-button-text-deactive);
  font-weight: 300;
  pointer-events: none;
}

</style>