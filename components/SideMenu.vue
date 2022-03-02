<template>
  <div class="sideMenuWrapper">
    <transition name="mask">
      <div v-if="$store.getters['sideMenu/getOpen']" class="mask" @click="clickButton">
        <button class="modalButton">
          <span class="modalBar"></span>
          <span class="modalBar"></span>
        </button>
      </div>
    </transition>
    <div id="sideMenu" class="sideMenu" :class="getOpen" @scroll="scrolledSideMenu">
      <div class="tabMenus">
        <div class="tabMenu button" :class="getSelectedTab('tag')" @click="clickTab('tag')">カテゴリー</div>
        <div class="tabMenu button" :class="getSelectedTab('search')" @click="clickTab('search')">カテゴリー検索</div>
        <div class="tabMenu button" :class="getSelectedTab('favorite')" @click="clickTab('favorite')">お気に入り</div>
        <div class="tabMenu button" :class="getSelectedTab('setting')" @click="clickTab('setting')">設定</div>
      </div>
      <div class="sideMenuContents">
        <!-- カテゴリー -->
        <transition name="tab">
          <div v-if="selectedTag" key="tag" class="sideMenuContent">
            <div class="tagContents">
              <div v-for="name in tagname" :key="name" class="tagContent">
                <div class="sideMenuSubTitle tagStyle">{{name.toUpperCase()}}</div>
                <div class="tagItems">
                  <div v-for="item in tag[name].contents" :key="item.id" class="tagItem" :class="getSelectedTag(item.id)">
                    <div class="tagLinks" @click="clickTagButton">
                      <nuxt-link :to="`/tag/${item.id}`" class="tagLink button">
                        <div v-if="name === 'color'" class="colorImage" :class="`${item.id}`"></div>
                        <div class="tagLinkText">
                          <div>{{item.name}}</div>
                          <!-- <div class="tagLinkTextLine"></div> -->
                        </div>
                      </nuxt-link>
                      <!-- <div v-else class="tagLink button" @click="$moveTop">
                        <div v-if="name === 'color'" class="colorImage"></div>
                        <div>{{item.name}}</div>
                      </div> -->
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
        </transition>
        <!-- カテゴリー検索 -->
        <transition name="tab">
          <div v-if="selectedSearch" key="search" class="sideMenuContent">
            <div class="searchBlock">
              <svg class="searchImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393.47 393.47" fill="#000000">
                <path d="M383.52,335.43l-102-102c36.94-58.86,29.95-137.61-21.23-188.8-59.45-59.45-156.19-59.46-215.65,0s-59.45,156.19,0,215.65c51.19,51.17,129.94,58.18,188.81,21.24l102,102a34,34,0,1,0,48.08-48.09ZM232.77,232.76a113.64,113.64,0,1,1,0-160.71A113.77,113.77,0,0,1,232.77,232.76Z"/>
              </svg>
              <input id="categorySearch" v-model="keyword" class="search" type="text" placeholder="カテゴリーを検索" autocomplete="off" @input="setKeyword" @focus="setFocus" @blur="setBlur">
            </div>
            <div v-for="item in keywordContents" :key="item.id" class="tagItem">
                <div class="tagLinks" @click="clickTagButton">
                  <nuxt-link :to="`/tag/${item.id}`" class="tagLink button">
                    <div v-if="getColorMark(item)" class="colorImage" :class="`${item.id}`"></div>
                    <div class="tagLinkText">
                      <div>{{item.name}}</div>
                      <!-- <div class="tagLinkTextLine"></div> -->
                    </div>
                  </nuxt-link>
                  <div class="starButton button" @click.stop="setFavoriteTags(item.id)">
                    <svg class="starImage" :class="getAddedFavoriteTags(item.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 567.13 539.38" fill="transparent" stroke="#ffffff">
                      <polygon points="283.57 45.19 357.91 195.83 524.15 219.99 403.86 337.25 432.26 502.81 283.57 424.64 134.88 502.81 163.27 337.25 42.98 219.99 209.22 195.83 283.57 45.19" style="stroke-miterlimit:10;stroke-width:40px"/>
                    </svg>
                  </div>
                </div>
              </div>
          </div>
        </transition>
        <!-- お気に入り -->
        <transition name="tab">
          <div v-if="selectedFavorite" key="favorite" class="sideMenuContent">
            <div class="tagContents">
              <div v-if="getNoContent" class="noFavoriteTagsComment">お気に入りのタグは登録されていません</div>
              <template v-for="name in tagname">
                <div v-if="getFavoritedType(name)" :key="name" class="tagContent">
                  <div class="sideMenuSubTitle tagStyle">{{name.toUpperCase()}}</div>
                  <div class="tagItems">
                    <template v-for="item in tag[name].contents">
                      <div v-if="getFavorited(item.id)" :key="item.id" class="tagItem" :class="getSelectedTag(item.id)">
                        <div class="tagLinks" @click="clickTagButton">
                          <nuxt-link :to="`/tag/${item.id}`" class="tagLink button">
                            <div class="tagLinkText">
                              <div>{{item.name}}</div>
                              <!-- <div class="tagLinkTextLine"></div> -->
                            </div>
                          </nuxt-link>
                          <!-- <div v-else class="tagLink button" @click="$moveTop">{{item.name}}</div> -->
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
        </transition>
        <!-- 設定 -->
        <transition name="tab">
          <div v-if="selectedSetting" key="setting" class="sideMenuContent">
            <div class="controllerContents">
              <div class="controllerContent">
                <div class="controllerTitle">デバイス</div>
                <div class="controllerItems">
                  <button class="controllerItem" :class="getStatePC" :disabled="getDevicePcDisabled" @click="clickDevicePc">
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
                  <button class="controllerItem" :class="getStateTB" :disabled="getDeviceTbDisabled" @click="clickDeviceTb">
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
                  <button class="controllerItem" :class="getStateSP" :disabled="getDeviceSpDisabled" @click="clickDeviceSp">
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
                <div class="check" :class="[getDeviceCheckboxChecked,getMultideviceDisabled]">
                  <div class="text">マルチデバイスを有効にする</div>
                  <button class="checkboxOuter" @click="deviceCheckboxChange">
                    <div class="switch"></div>
                    <div class="background"></div>
                  </button>
                </div>
                <div v-if="multideviceDisabled" class="sliderNotice">
                  <div>
                    <svg class="sliderNoticeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.94 400.94">
                      <circle cx="200.47" cy="117.76" r="28.42"/>
                      <path d="M200.47,188.35c-12.32,0-22.32,7.6-22.32,17v93.22c0,9.38,10,17,22.32,17s22.32-7.61,22.32-17V205.34C222.79,196,212.8,188.35,200.47,188.35Z"/>
                      <circle cx="200.47" cy="200.47" r="180.47" style="fill:none;stroke:#231815;stroke-miterlimit:10;stroke-width:40px"/>
                    </svg>
                  </div>
                  <div class="sliderNoticeTexts">
                    <div class="sliderNoticeText sub">ご使用の端末ではマルチデバイスはご利用いただくことができません。</div>
                    <div class="sliderNoticeText sub">マルチデバイスのご利用にはウィンドウ幅が576px以上の端末が必要です。</div>
                  </div>
                </div>
              </div>
              <div class="partitionLine"></div>
              <div class="controllerContent">
                <div class="controllerTitleWrapper">
                  <div class="controllerTitle">サイズ</div>
                  <div class="selectableRange">現在の選択可能範囲：{{`1 〜 ${gatMaxValue}`}}</div>
                </div>
                <div class="controllerItems sliderStyle">
                  <button class="sliderButton" :class="getSliderDownButtonDisabled" @click="sliderDown">
                    <svg class="sliderImageMinus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.2 68.03" fill="#fff">
                      <rect width="425.2" height="68.03" rx="8.5"/>
                    </svg>
                  </button>
                  <input id="slider" class="slider" type="range" name="size" min="0.25" max="1" step="0.075" :value="getSliderValue" @input="sliderChange">
                  <button class="sliderButton" :class="getSliderUpButtonDisabled" @click="sliderUp">
                    <svg class="sliderImagePlus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.2 425.2" fill="#fff">
                      <path d="M416.69,178.58H246.61V8.5a8.5,8.5,0,0,0-8.5-8.5h-51a8.51,8.51,0,0,0-8.51,8.5V178.58H8.5A8.51,8.51,0,0,0,0,187.09v51a8.5,8.5,0,0,0,8.5,8.5H178.58V416.69a8.51,8.51,0,0,0,8.51,8.51h51a8.5,8.5,0,0,0,8.5-8.51V246.61H416.69a8.5,8.5,0,0,0,8.51-8.5v-51A8.51,8.51,0,0,0,416.69,178.58Z"/>
                    </svg>
                  </button>
                  <div class="scale">{{getScaleValue}}</div>
                  <!-- {{$store.getters["slider/getSteps"].indexOf(true)}} -->
                </div>
                <div class="check" :class="getSliderCheckboxChecked">
                  <div class="text">自動調整を有効にする</div>
                  <button class="checkboxOuter" @click="sliderCheckboxChange">
                    <div class="switch"></div>
                    <div class="background"></div>
                  </button>
                </div>
                <div v-if="getNotice" class="sliderNotice">
                  <div>
                    <svg class="sliderNoticeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.94 400.94">
                      <circle cx="200.47" cy="117.76" r="28.42"/>
                      <path d="M200.47,188.35c-12.32,0-22.32,7.6-22.32,17v93.22c0,9.38,10,17,22.32,17s22.32-7.61,22.32-17V205.34C222.79,196,212.8,188.35,200.47,188.35Z"/>
                      <circle cx="200.47" cy="200.47" r="180.47" style="fill:none;stroke:#231815;stroke-miterlimit:10;stroke-width:40px"/>
                    </svg>
                  </div>
                  <div class="sliderNoticeTexts">
                    <div class="sliderNoticeText main">手動調整中</div>
                    <div class="sliderNoticeText sub">表示崩れを防止するため、手動調整中であってもブラウザのサイズ変更を検知すると、手動調整を中止し自動調整が有効になります。</div>
                  </div>
                </div>
              </div>
              <div class="partitionLine"></div>
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
              <div class="partitionLine"></div>
              <div class="controllerContent">
                <div class="controllerTitle">カラーモード</div>
                <div class="colors">
                  <button class="color color1" :class="getColor1Checked" @click="colormodeChange(1)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color2" :class="getColor2Checked" @click="colormodeChange(2)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color5" :class="getColor5Checked" @click="colormodeChange(5)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color6" :class="getColor6Checked" @click="colormodeChange(6)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color7" :class="getColor7Checked" @click="colormodeChange(7)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color4" :class="getColor4Checked" @click="colormodeChange(4)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color3" :class="getColor3Checked" @click="colormodeChange(3)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color9" :class="getColor9Checked" @click="colormodeChange(9)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color11" :class="getColor11Checked" @click="colormodeChange(11)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color12" :class="getColor12Checked" @click="colormodeChange(12)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color8" :class="getColor8Checked" @click="colormodeChange(8)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                  <button class="color color10" :class="getColor10Checked" @click="colormodeChange(10)">
                    <svg class="invalid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435.35 435.35" fill="#231815">
                      <path d="M371.59,63.76A217.67,217.67,0,1,0,63.76,371.59,217.67,217.67,0,1,0,371.59,63.76ZM42,217.67A174.8,174.8,0,0,1,79,110L325.34,356.4a174.85,174.85,0,0,1-107.66,37C120.81,393.35,42,314.54,42,217.67ZM355.2,326.86,108.49,80.15A174.82,174.82,0,0,1,217.68,42c96.86,0,175.67,78.81,175.67,175.67A174.8,174.8,0,0,1,355.2,326.86Z"/>
                    </svg>
                  </button>
                </div>
                <div>
                  <div class="comment">ダークモードOFF時のテーマカラーを選択できます。</div>
                  <div class="comment">複数チェックは、選択された色をランダムで表示します。</div>
                  <div class="comment">チェックなしは、全ての色をランダムで表示します。</div>
                </div>
              </div>
              <div class="controllerItems working">
                <label class="checkboxWrapper">
                  <input id="checkbox" class="checkbox" type="checkbox" name="check" value="test" checked>リンク切れのサイトを表示しない
                </label>
              </div>
            </div>
          </div>
        </transition>
          
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
      type: String,
      required: false,
      default: undefined,
    },
    contentswidth: {
      type: Number,
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
        'impression',
        'industry',
        'pickup',
        'technique',
        'layout',
        'color',
        'scheme',
        'technology',
      ],
      selectedTag: true,
      selectedSearch: false,
      selectedFavorite: false,
      selectedSetting: false,
      keyword: '',
      keywordContents: [],
      focus: false,
      /* selectedOr: true,
      selectedAnd: false, */
      multideviceDisabled: false,
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
      return  { on: this.$store.getters['devicePattern/getMultidevaice'], off: !this.$store.getters['devicePattern/getMultidevaice'] }
    },
    getSliderCheckboxChecked() {
      return  { on: this.$store.getters['slider/getAutoSizing'], off: !this.$store.getters['slider/getAutoSizing'] }
    },
    getColor1Checked() {
      return  { on: this.$store.getters['colormode/getColor1'], off: !this.$store.getters['colormode/getColor1'] }
    },
    getColor2Checked() {
      return  { on: this.$store.getters['colormode/getColor2'], off: !this.$store.getters['colormode/getColor2'] }
    },
    getColor3Checked() {
      return  { on: this.$store.getters['colormode/getColor3'], off: !this.$store.getters['colormode/getColor3'] }
    },
    getColor4Checked() {
      return  { on: this.$store.getters['colormode/getColor4'], off: !this.$store.getters['colormode/getColor4'] }
    },
    getColor5Checked() {
      return  { on: this.$store.getters['colormode/getColor5'], off: !this.$store.getters['colormode/getColor5'] }
    },
    getColor6Checked() {
      return  { on: this.$store.getters['colormode/getColor6'], off: !this.$store.getters['colormode/getColor6'] }
    },
    getColor7Checked() {
      return  { on: this.$store.getters['colormode/getColor7'], off: !this.$store.getters['colormode/getColor7'] }
    },
    getColor8Checked() {
      return  { on: this.$store.getters['colormode/getColor8'], off: !this.$store.getters['colormode/getColor8'] }
    },
    getColor9Checked() {
      return  { on: this.$store.getters['colormode/getColor9'], off: !this.$store.getters['colormode/getColor9'] }
    },
    getColor10Checked() {
      return  { on: this.$store.getters['colormode/getColor10'], off: !this.$store.getters['colormode/getColor10'] }
    },
    getColor11Checked() {
      return  { on: this.$store.getters['colormode/getColor11'], off: !this.$store.getters['colormode/getColor11'] }
    },
    getColor12Checked() {
      return  { on: this.$store.getters['colormode/getColor12'], off: !this.$store.getters['colormode/getColor12'] }
    },
    getRandomChecked() {
      return  { on: this.$store.getters['colormode/getRandom'], off: !this.$store.getters['colormode/getRandom'] }
    },
    getOpen() {
      return { isOpen: this.$store.getters['sideMenu/getOpen'] }
    },
    getClose() {
      return { isClose: !this.$store.getters['sideMenu/getOpen'] }
    },
    /* getSelectedTag() {
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
    }, */
    getSelectedTag() {
      return function(id) {
        return { selected: this.selectedtag === id}
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
        }else if(key === 'favorite') {
          return { selectedTab: this.selectedFavorite}
        }else if(key === 'search') {
          return { selectedTab: this.selectedSearch}
        }
      }
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
    getMultideviceDisabled() {
      return { disabled: this.multideviceDisabled }
    },
    getMultideviceCancelLine() {
      return { cancelLine : this.multideviceDisabled}
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
    },
    getColorMark() {
      return function(key) {
        return this.tag.color.contents.includes(key)
      }
    },
    /* getPosition() {
      const steps = this.$store.getters["slider/getSteps"]
      return {
        scale0: steps[0],
        scale1: steps[1],
        scale2: steps[2],
        scale3: steps[3],
        scale4: steps[4],
        scale5: steps[5],
        scale6: steps[6],
        scale7: steps[7],
        scale8: steps[8],
        scale9: steps[9],
        scale10: steps[10],
      }
    }, */
    getScaleValue() {
      const steps = this.$store.getters["slider/getSteps"]
      return steps[0] ? 1 : steps[1] ? 2 : steps[2] ? 3 : steps[3] ? 4 : steps[4] ? 5 : steps[5] ? 6 : steps[6] ? 7 : steps[7] ? 8 : steps[8] ? 9 : steps[9] ? 10 : steps[10] ? 11 : ''
    },
    getSliderDownButtonDisabled() {
      // 現在のスライダーステップが０だったら無効化
      return { disabled: this.$store.getters["slider/getSteps"][0]}
    },
    getSliderUpButtonDisabled() {
      // 現在のスライダーステップが最大値だったら無効化
      return { disabled: this.$store.getters["slider/getValue"] === this.$store.getters["slider/getMaxValue"]}
    },
    gatMaxValue() {
      return this.$store.getters["slider/getMaxSteps"]
    }
  },
  created() {

  },
  mounted() {
    window.addEventListener('load', this.sliderInitialSet)
    
    window.matchMedia("(min-width:576px)").addEventListener("change", this.changeMultideviceDisabled);
    
  },
  beforeDestroy() {
    window.removeEventListener('load', this.sliderInitialSet)

    window.matchMedia("(min-width:576px)").removeEventListener("change", this.changeMultideviceDisabled);
  },
  methods: {
    /* setOpen(value) {
      this.open = value;
    }, */
    clickButton() {
      this.$store.dispatch('sideMenu/pushOpen');
      this.$store.dispatch('slider/pushDecidedSteps');
    },
    clickTagButton() {
      this.$store.dispatch('sideMenu/pushOpen');
      this.$store.dispatch("status/pushSearchTag");
    },
    clickTab(key) {
      if(key === 'tag') {
        this.selectedTag = true
        this.selectedSetting = false
        this.selectedFavorite = false
        this.selectedSearch = false
      }else if(key === 'setting') {
        this.selectedTag = false
        this.selectedSetting = true
        this.selectedFavorite = false
        this.selectedSearch = false
      }else if(key === 'favorite') {
        this.selectedTag = false
        this.selectedSetting = false
        this.selectedFavorite = true
        this.selectedSearch = false
      }else if(key === 'search') {
        this.selectedTag = false
        this.selectedSetting = false
        this.selectedFavorite = false
        this.selectedSearch = true
      }
    },
    sliderChange(event) {

      this.$store.dispatch('slider/pushSlider',event.target.value)

      // 親コンポーネントでダミーコンテンツ作成関数を実行
      this.$emit('sliderChange')

    },
    sliderUp() {
      const nowValue = this.$store.getters["slider/getValue"]
      if(nowValue < 1) {
        this.$store.dispatch('slider/pushSlider',(nowValue*1000 + 0.075*1000)/1000)
      }
    },
    sliderDown() {
      const nowValue = this.$store.getters["slider/getValue"]
      if(nowValue > 0.25) {
        this.$store.dispatch('slider/pushSlider',(nowValue*1000 - 0.075*1000)/1000)
      }
    },
    sliderInitialSet() {
      this.$store.dispatch('slider/pushSliderInitial')

      // マルチデバイスの利用可否の初期値を設定
      this.changeMultideviceDisabled();
    },
    clickDevicePc() {
      this.$store.dispatch('devicePattern/pushPC')
      this.$emit('deviceChange')
    },
    clickDeviceTb() {
      this.$store.dispatch('devicePattern/pushTB')
      this.$emit('deviceChange')
    },
    clickDeviceSp() {
      this.$store.dispatch('devicePattern/pushSP')
      this.$emit('deviceChange')
    },
    deviceCheckboxChange() {
      this.$store.dispatch('devicePattern/pushMultidevaice')
      if(!this.$store.getters["devicePattern/getMultidevaice"]) {
        this.$emit('deviceChange')
      }
    },
    sliderCheckboxChange() {
      this.$store.dispatch('slider/pushAutoSizing')
      this.$emit('autoSizing')
    },
    colormodeChange(key) {
      if(key === 1) {
        this.$store.dispatch('colormode/pushColor1')
      }else if(key === 2) {
        this.$store.dispatch('colormode/pushColor2')
      }else if(key === 3) {
        this.$store.dispatch('colormode/pushColor3')
      }else if(key === 4) {
        this.$store.dispatch('colormode/pushColor4')
      }else if(key === 5) {
        this.$store.dispatch('colormode/pushColor5')
      }else if(key === 6) {
        this.$store.dispatch('colormode/pushColor6')
      }else if(key === 7) {
        this.$store.dispatch('colormode/pushColor7')
      }else if(key === 8) {
        this.$store.dispatch('colormode/pushColor8')
      }else if(key === 9) {
        this.$store.dispatch('colormode/pushColor9')
      }else if(key === 10) {
        this.$store.dispatch('colormode/pushColor10')
      }else if(key === 11) {
        this.$store.dispatch('colormode/pushColor11')
      }else if(key === 12) {
        this.$store.dispatch('colormode/pushColor12')
      }else {
        this.$store.dispatch('colormode/pushRandom')
      }
      this.$store.dispatch('darkmode/pushDarkmodeOff')
      this.$emit('colormodeChange')
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
      if(!this.$storageAvailable('localStorage')) {
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
      this.$emit('colormodeChange')
    },
    setKeyword() {
      this.searchByKeyword();
    },
    setFocus() {
      this.focus = true;
    },
    setBlur() {
      this.focus = false;
    },
    searchByKeyword() {
      const key = this.keyword;
      const tags = [
        ...this.tag.type.contents,
        ...this.tag.industry.contents,
        ...this.tag.impression.contents,
        ...this.tag.layout.contents,
        ...this.tag.color.contents,
        ...this.tag.pickup.contents,
        ...this.tag.technique.contents,
        ...this.tag.technology.contents,
        ...this.tag.scheme.contents,
      ]
      // キーワードを一度入力してから削除したとき
      if (!key) {
          this.keywordContents.length = 0;
          return;
      }
      // キーワードでフィルター（大文字・小文字・ひらがな・カタカナを区別しない）
      const searchFuzzy = tags.filter(function (content) {
          // 検索対象を抽出
          const id = content.id !== undefined ? content.id.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : "";
          const name = content.name !== undefined ? content.name.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : "";
          const keyword = content.keyword !== undefined ? content.keyword.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96)) : "";
          const lowerKey = key.toLowerCase().replace(/[ぁ-ゖ]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));
          
          // 一致判定
          const result = (id.length !== 0 ? id.includes(lowerKey) : false) ||
                         (name.length !== 0 ? name.includes(lowerKey) : false) ||
                         (keyword.length !== 0 ? keyword.includes(lowerKey) : false);
          return result;
      });
      this.keywordContents = searchFuzzy;
    },
    changeMultideviceDisabled() {
      console.log('changeMultideviceDisabled')
      const windowWidth = window.innerWidth // ウィンドウサイズ
      if(windowWidth < 576) {
        this.multideviceDisabled = true;
        // マルチデバイスが有効になっている場合は解除する
        if(this.$store.getters["devicePattern/getMultidevaice"]) {
          // 手動調整中の場合は自動調整にする
          if (!this.$store.getters["slider/getAutoSizing"]) {
            this.$store.dispatch("slider/pushAutoSizing");
          }
          this.deviceCheckboxChange();
          this.$emit('multideviceCancel')
        }
      }else {
        this.multideviceDisabled = false;
      }
    },

  },
  
};
</script>

<style lang="scss" scoped>

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--black-transparent-low);
  z-index: 90;
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
.modalButton {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  .modalBar {
    background-color: var(--white);
    width: 25px;
    height: 2px;
    position: absolute;
    &:nth-child(1) {
      top: 14px;
      left: 2px;
      transform: rotate(45deg);
    }
    &:nth-child(2) {
      top: 14px;
      left: 2px;
      transform: rotate(135deg);
    }
  }
  @include hover() {
    .modalBar {
      background-color: var(--grey-super-light);
    }
  }
}

.sideMenu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: var(--sideMenuWidth);
  height: 100vh;
  background-color: var(--black);
  transition: transform .25s ease-in;
  z-index: 100;
  color: var(--white);
  transform: translateX(calc(-1 * var(--sideMenuWidth)));
  border-right: 2px var(--black-super-light) solid;
  &.isOpen {
    transform: translateX(0);
    transition: transform .25s ease-out;
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
    padding: 50px 15px 15px 15px;
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
.tabMenus {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: var(--black-super-light) 1px solid;
  /* padding-right: 30px; */
}

.tabMenu {
  padding: 5px 2px;
  color: var(--grey-super-light);
  &:not(:first-child) {
    margin-left: 26px;
  }
  &.selectedTab {
    color: var(--white);
    font-weight: 400;
    border-bottom: var(--color) 2px solid;
  }
}




.sideMenuContents {
  margin-top: 20px;
  position: relative;
}

.tab-enter-active {
  transition: opacity .15s .15s ease-out;
}
.tab-leave-active {
  transition: opacity .1s ease-in;
}
.tab-enter, .tab-leave-to {
  opacity: 0;
}

.sideMenuContent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.noFavoriteTagsComment {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.sideMenuSubTitle {
  font-size: var(--font-size-xs);
  color: var(--white);
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
  @include hover() {
    background-color: var(--black-super-light);
  }
}

.starImage {
  width: 14px;
  stroke: var(--black-ultra-light);
  transition: fill .2s,stroke .2s;
}

.favoriteTagsColor {
  fill: var(--yellow);
  stroke: var(--yellow);
}
.controllerTitleWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
}

.controllerTitle {
  font-size: var(--font-size-xs);
  font-weight: 500;
}
.warning {
  font-size: var(--font-size-sm);
  font-weight: 500;
  margin-left: 20px;
}
.controllerItems {
  /* font-size: var(--font-size-xs); */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  width: 100%;
  background-color: var(--black-super-light);
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
  &.active {
    background-color: var(--white);
  }

  &.disabled {
    pointer-events: none;
  }
}
.slider {
  margin: 0 10px;
}
.selectableRange {
  border-radius: 3px;
  background-color: var(--black-super-light);
  font-size: var(--font-size-xs);
  margin-left: 20px;
  padding: 4px 6px;
}

.sliderStyle {
  margin-top: 28px;
  margin-left: 10px;
  background-color: transparent;
  justify-content: left;
  position: relative;
}
.sliderButton {
  width: 24px;
  height: 24px;
  border-radius: 3px;
  background-color: var(--black-super-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color .2s;
  @include hover() {
    background-color: var(--black-hover);
  }
  &.disabled {
    @include hover() {
      background-color: var(--black-super-light);
    }
    pointer-events: none;
  }
}

.sliderImageMinus {
  width: 12px;
  fill: var(--grey-ultra-light)
}

.sliderImagePlus {
  width: 12px;
  fill: var(--grey-ultra-light)
}
.scale {
  /* position: absolute;
  top: 0;
  right: 20px; */
  width: 24px;
  height: 24px;
  background-color: var(--black-super-light);
  border-radius: 2px;
  display: none;
  align-items: center;
  justify-content: center;
  padding-bottom: 1px;
  margin-left: 16px;
  /* &.scale0 {
    left: 32px;
  }
  &.scale1 {
    left: 54px;
    left: calc(32px + (20.65px * 1));
  }
  &.scale2 {
    left: calc(32px + (20.65px * 2));
  }
  &.scale3 {
    left: calc(32px + (20.65px * 3));
  }
  &.scale4 {
    left: calc(32px + (20.65px * 4));
  }
  &.scale5 {
    left: calc(32px + (20.65px * 5));
  }
  &.scale6 {
    left: calc(32px + (20.65px * 6));
  }
  &.scale7 {
    left: calc(32px + (20.65px * 7));
  }
  &.scale8 {
    left: calc(32px + (20.65px * 8));
  }
  &.scale9 {
    left: calc(32px + (20.65px * 9));
  }
  &.scale10 {
    left: calc(32px + (20.65px * 10));
  } */
  @include responsive(xs) {
    display: flex;
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
  width: 16px;
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
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: transparent;
  margin-top: 22px;
}
.check {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 22px;
  position: relative;
  width: 100%;
  padding-right: 10px;
  .text {
    font-size: var(--font-size-xs);
  }
  .checkboxOuter {
    width: 32px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .switch {
    width: 18px;
    height: 18px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform .2s, background-color .2s;
  }
  .background {
    width: 32px;
    height: 12px;
    border-radius: 10px;
    transition: background-color .2s;
  }
  &.on {
    .switch {
      transform: translateX(15px);
      background-color: var(--color-light);
    }
    .background {
      background-color: var(--color-transparent);
    }
  }
  &.off {
    .switch {
      background-color: var(--grey-ultra-light);
    }
    .background {
      background-color: var(--white-transparent);
    }
  }
  &.disabled {
    .checkboxOuter {
      /* cursor: default; */
      pointer-events: none;
    }
  }
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
  background-color: var(--black-light);
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
  background-color: var(--white-forDarkMode);
  margin-right: 8px;
  &.red {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-red) 100%);
  }
  &.pink {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-pink) 100%);
  }
  &.purple {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-purple) 100%);
  }
  &.blue {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-blue) 100%);
  }
  &.green {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-green) 100%);
  }
  &.yellow {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-yellow) 100%);
  }
  &.orange {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-orange) 100%);
  }
  &.brown {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-brown) 100%);
  }
  &.white {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-white) 100%);
  }
  &.beige {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-beige) 100%);
  }
  &.grey {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-grey) 100%);
  }
  &.black {
    background: linear-gradient(to bottom, var(--white) -150%, var(--color-image-black) 100%);
  }
  &.colorful {
    background: linear-gradient(to right,
                                var(--color-image-red),
                                var(--color-image-orange),
                                var(--color-image-yellow),
                                var(--color-image-green),
                                var(--color-image-blue),
                                var(--color-image-purple)
                                );
  }
  &.gradation {
    background: linear-gradient(to right, var(--color-image-black), var(--color-image-grey), var(--color-image-white));
  }
  &.pastel {
      background: linear-gradient(to right, #9796f0, #fbc7d4);
  }
  &.monotone {
    background: linear-gradient(to right, var(--color-image-white) 40%, var(--color-image-black) 55%);
  }
}

.tagLink {
  display: inline-flex;
  align-items: center;
  padding: 7px 15px;
  text-decoration: none;
  color: var(--white);
  width: 100%;
  @include hover() {
    background-color: var(--black-super-light);
  }
  .selected & {
    font-weight: 500;
    background-color: var(--black-super-light);
  }
  /* border-radius: 50px; */
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
  fill: var(--black-ultra-light);
  .active & {
    fill: var(--black);
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
  color: var(--black-ultra-light);
  font-weight: 400;
  .active & {
    color: var(--black);
    font-weight: 500;
  }
}

.typeTitleDarkmode {
  font-size: var(--font-size-xs);
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
.multideviceText {
  &.cancelLine {
    text-decoration: line-through;
  }
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
  background: var(--black-super-light);               // スライダーの背景色
  height: 3px;                      // スライダーの高さ
  width: 222px;                      // スライダーの幅
  border-radius: 10px;              // スライダーの端の丸み
  // -webkit-向けのつまみ
  &::-webkit-slider-thumb {
    -webkit-appearance: none;       // お決まり
    background: var(--white);     // 背景色
    width: 16px;                    // 幅
    height: 16px;                   // 高さ
    border-radius: 50%;             // 円形に
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); // 影
  }
  // -moz-向けのつまみ
  &::-moz-range-thumb {
    background: var(--white);     // 背景色
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

.searchBlock {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 50px;
  background-color: var(--black-light);
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
  fill: var(--grey-light);
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
  border-radius: 20px;
  font-size: var(--font-size-sm);
  color: var(--white);
}
::placeholder {
  color: var(--black-ultra-light);
}

.partitionLine {
  width: 100%;
  height: 1px;
  margin: 30px auto 20px auto;
  background-color: var(--black-ultra-light);
}
.comment {
  font-size: var(--font-size-xs);
  color: var(--grey-ultra-light);
  &:nth-child(1) {
    margin-top: 20px;
  }
  &:not(:nth-child(1)) {
    margin-top: 4px;
  }
}
.textOuter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  &.color {
    width: 50px;
    margin-bottom: 2px;
  }
}
.colors {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.color {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-top: 10px;
  
  &.on {
    &.color1 {
      background-color: var(--colormode1);
    }
    &.color2 {
      background-color: var(--colormode2);
    }
    &.color3 {
      background-color: var(--colormode3);
    }
    &.color4 {
      background-color: var(--colormode4);
    }
    &.color5 {
      background-color: var(--colormode5);
    }
    &.color6 {
      background-color: var(--colormode6);
    }
    &.color7 {
      background-color: var(--colormode7);
    }
    &.color8 {
      background-color: var(--colormode8);
    }
    &.color9 {
      background-color: var(--colormode9);
    }
    &.color10 {
      background-color: var(--colormode10);
    }
    &.color11 {
      background-color: var(--colormode11);
    }
    &.color12 {
      background-color: var(--colormode12);
    }
  }
  &.off {
    &.color1 {
      background-color: var(--colormode1-transparent);
    }
    &.color2 {
      background-color: var(--colormode2-transparent);
    }
    &.color3 {
      background-color: var(--colormode3-transparent);
    }
    &.color4 {
      background-color: var(--colormode4-transparent);
    }
    &.color5 {
      background-color: var(--colormode5-transparent);
    }
    &.color6 {
      background-color: var(--colormode6-transparent);
    }
    &.color7 {
      background-color: var(--colormode7-transparent);
    }
    &.color8 {
      background-color: var(--colormode8-transparent);
    }
    &.color9 {
      background-color: var(--colormode9-transparent);
    }
    &.color10 {
      background-color: var(--colormode10-transparent);
    }
    &.color11 {
      background-color: var(--colormode11-transparent);
    }
    &.color12 {
      background-color: var(--colormode12-transparent);
    }
  }
  /* &.random {
    background: linear-gradient(to right,
                                var(--colormode1) calc(100% * (1/12)),
                                var(--colormode2) calc(100% * (1/12)),
                                var(--colormode2) calc(100% * (2/12)),
                                var(--colormode3) calc(100% * (2/12)),
                                var(--colormode3) calc(100% * (3/12)),
                                var(--colormode4) calc(100% * (3/12)),
                                var(--colormode4) calc(100% * (4/12)),
                                var(--colormode5) calc(100% * (4/12)),
                                var(--colormode5) calc(100% * (5/12)),
                                var(--colormode6) calc(100% * (5/12)),
                                var(--colormode6) calc(100% * (6/12)),
                                var(--colormode7) calc(100% * (6/12)),
                                var(--colormode7) calc(100% * (7/12)),
                                var(--colormode8) calc(100% * (7/12)),
                                var(--colormode8) calc(100% * (8/12)),
                                var(--colormode9) calc(100% * (8/12)),
                                var(--colormode9) calc(100% * (9/12)),
                                var(--colormode10) calc(100% * (9/12)),
                                var(--colormode10) calc(100% * (10/12)),
                                var(--colormode11) calc(100% * (10/12)),
                                var(--colormode11) calc(100% * (11/12)),
                                var(--colormode12) calc(100% * (11/12)),
                                );
  } */
}
.invalid {

  .on & {
    fill: transparent;
  }
  .off.color1 & {
    fill: var(--colormode1);
  }
  .off.color2 & {
    fill: var(--colormode2);
  }
  .off.color3 & {
    fill: var(--colormode3);
  }
  .off.color4 & {
    fill: var(--colormode4);
  }
  .off.color5 & {
    fill: var(--colormode5);
  }
  .off.color6 & {
    fill: var(--colormode6);
  }
  .off.color7 & {
    fill: var(--colormode7);
  }
  .off.color8 & {
    fill: var(--colormode8);
  }
  .off.color9 & {
    fill: var(--colormode9);
  }
  .off.color10 & {
    fill: var(--colormode10);
  }
  .off.color11 & {
    fill: var(--colormode11);
  }
  .off.color12 & {
    fill: var(--colormode12);
  }
}

</style>
