<template>
  <div class="menuBtns">
    <transition name="mask">
      <div v-if="menuOpen" class="mask" @click="closeMenu">
      </div>
    </transition>
    <div class="menuBtn" :class="{selected: menuOpenDelay}">
      <button class="menuLink" @click.stop="openMenu">
        <svg class="buttonImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.93 371.93" fill="#231815">
          <title>設定</title>
          <path d="M371.93,212.17V159.76H327.77a143.81,143.81,0,0,0-23-55.59L336,73l-37-37L267.73,67.12a143.12,143.12,0,0,0-55.57-23V0h-52.4V44.16a143.32,143.32,0,0,0-55.59,23L73,35.94,36,73l31.18,31.2a143.57,143.57,0,0,0-23,55.57H0v52.41H44.16a143.51,143.51,0,0,0,23,55.57L36,298.94l37,37,31.2-31.17a143,143,0,0,0,55.59,23v44.14h52.4V327.79a143.34,143.34,0,0,0,55.6-23L299,336l37-37L304.8,267.76a143.88,143.88,0,0,0,23-55.59ZM235.35,235.35A69.71,69.71,0,1,1,255.86,186,69.55,69.55,0,0,1,235.35,235.35Z"/>
        </svg>
      </button>
    </div>
    <div id="setting" class="menu" :class="{open: menuOpen}">
      <div class="controllerContent">
        <div class="controllerTitle">デバイス</div>
        <div class="controllerItems">
          <button class="controllerItem threeItems" :class="getStatePC" :disabled="getDevicePcDisabled" @click="clickDevicePc">
            <div class="controllerButton">
              <div class="typeImageWrapper">
                <svg class="typeImage typeImagePC" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 299" fill="#ffffff">
                  <path d="M348.44,0H8.56A8.56,8.56,0,0,0,0,8.56V240.44A8.56,8.56,0,0,0,8.56,249H348.44a8.56,8.56,0,0,0,8.56-8.56V8.56A8.56,8.56,0,0,0,348.44,0ZM331,219.12a4.87,4.87,0,0,1-4.88,4.88H29.88A4.87,4.87,0,0,1,25,219.12V29.88A4.87,4.87,0,0,1,29.88,25H326.12A4.87,4.87,0,0,1,331,29.88Z"/>
                  <rect class="cls-1" x="66" y="274" width="225" height="25" rx="2.6"/>
                </svg>
              </div>
              <div class="typeTitle">デスクトップ</div>
            </div>
            <div class="activeButton" :class="getStatePC"></div>
          </button>
          <button class="controllerItem threeItems" :class="getStateTB" :disabled="getDeviceTbDisabled" @click="clickDeviceTb">
            <div class="controllerButton">
              <div class="typeImageWrapper">
                <svg class="typeImage typeImageTB" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 315.88 374.1" fill="#ffffff">
                  <path d="M304.56,0H11.32A11.32,11.32,0,0,0,0,11.32V362.78A11.32,11.32,0,0,0,11.32,374.1H304.56a11.32,11.32,0,0,0,11.32-11.32V11.32A11.32,11.32,0,0,0,304.56,0Zm-17.8,340.3a9.06,9.06,0,0,1-9.05,9.06H37a9.06,9.06,0,0,1-9.06-9.06V37.87a9.06,9.06,0,0,1,9.06-9H277.71a9,9,0,0,1,9.05,9Z"/>
                </svg>
              </div>
              <div class="typeTitle">タブレット</div>
            </div>
            <div class="activeButton" :class="getStateTB"></div>
          </button>
          <button class="controllerItem threeItems" :class="getStateSP" :disabled="getDeviceSpDisabled" @click="clickDeviceSp">
            <div class="controllerButton">
              <div class="typeImageWrapper">
                <svg class="typeImage typeImageSP" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.45 386.3" fill="#ffffff">
                  <path d="M207.69,0H8.76A8.76,8.76,0,0,0,0,8.76V377.54a8.76,8.76,0,0,0,8.76,8.76H207.69a8.76,8.76,0,0,0,8.76-8.76V8.76A8.76,8.76,0,0,0,207.69,0Zm-19.8,351a8.21,8.21,0,0,1-8.22,8.21H35.57A8.21,8.21,0,0,1,27.35,351V36.77a8.22,8.22,0,0,1,8.22-8.21h144.1a8.22,8.22,0,0,1,8.22,8.21Z"/>
                  <rect x="75.16" y="9.02" width="63.13" height="37.58" rx="4.34"/>
                </svg>
              </div>
              <div class="typeTitle">スマートフォン</div>
            </div>
            <div class="activeButton" :class="getStateSP"></div>
          </button>
        </div>
        <div class="check" :class="[getDeviceCheckboxChecked,getMultideviceDisabled]">
          <div class="text">マルチデバイスを有効にする</div>
          <button class="checkboxOuter" @click="deviceCheckboxChange">
            <div class="switch"></div>
            <div class="background"></div>
          </button>
        </div>
        <div>
          <div v-if="getDisplay" class="comment">マルチデバイスは画面の横幅が576px以上の端末でご利用いただけます。(ご利用の端末は{{$store.getters['windowSize/getWindowWidth']}}pxです。)</div>
        </div>
      </div>
      <div class="partitionLine"></div>
      <div class="controllerContent">
        <div class="controllerTitleWrapper">
          <div class="controllerTitle">サイズ調整</div>
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
        </div>
        <div class="check" :class="getSliderCheckboxChecked">
          <div class="text">自動調整を有効にする</div>
          <button class="checkboxOuter" @click="sliderCheckboxChange">
            <div class="switch"></div>
            <div class="background"></div>
          </button>
        </div>
        <div>
          <div class="comment">表示崩れを防止するため、自動調整が無効の場合でもブラウザのサイズ変更を検知すると自動調整が有効になります。</div>
        </div>
      </div>
      <div class="partitionLine"></div>
      <div class="controllerContent">
        <div class="controllerTitle">ダークモード</div>
        <div class="controllerItems">
          <button class="controllerItem threeItems" :class="getDarkmodeOn" :disabled="getDarkmodeOnDisabled" @click="clickDarkmode('on')">
            <div class="typeTitle darkmode controllerButton">ON</div>
            <div class="activeButton" :class="getDarkmodeOn"></div>
          </button>
          <button class="controllerItem threeItems" :class="getDarkmodeOff" :disabled="getDarkmodeOffDisabled" @click="clickDarkmode('off')">
            <div class="typeTitle darkmode controllerButton">OFF</div>
            <div class="activeButton" :class="getDarkmodeOff"></div>
          </button>
          <button class="controllerItem threeItems" :class="getDarkmodeOs" :disabled="getDarkmodeOsDisabled" @click="clickDarkmode('os')">
            <div class="typeTitle darkmode controllerButton">OSの設定</div>
            <div class="activeButton" :class="getDarkmodeOs"></div>
          </button>
        </div>
      </div>
      <div class="partitionLine"></div>
      <div class="controllerContent">
        <div class="controllerTitle">テーマカラー</div>
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
          <div class="comment">テーマカラーはダークモードOFF時に利用されます。</div>
          <div class="comment">複数の選択がある場合は選択された色からのランダム表示、選択なしの場合はすべての色からのランダム表示となります。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multideviceDisabled: false,
      menuOpen: false,
      menuOpenDelay: false,
    };
  },
  computed: {
    getDesktop() {
      return this.$store.getters['windowSize/getWindowWidth'] >= 768
    },
    getDisplay() {
      return this.$store.getters['windowSize/getWindowWidth'] < 576
    },
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
    getSliderValue() {
      return  this.$store.getters['slider/getValue']
    },
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
    },
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
    openMenu() {
      this.menuOpen = !this.menuOpen;
      if(this.menuOpenDelay) {
        setTimeout(()=>{this.menuOpenDelay = false},260);
      }else {
        this.menuOpenDelay = true;
      }
      if(!this.menuOpen) this.$store.dispatch('slider/pushDecidedSteps');
    },
    closeMenu() {
        this.menuOpen = false;
        setTimeout(()=>{this.menuOpenDelay = false},260);
        this.$store.dispatch('slider/pushDecidedSteps');
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
        // 親コンポーネントでダミーコンテンツ作成関数を実行
        this.$emit('sliderChange')
      }
    },
    sliderDown() {
      const nowValue = this.$store.getters["slider/getValue"]
      if(nowValue > 0.25) {
        this.$store.dispatch('slider/pushSlider',(nowValue*1000 - 0.075*1000)/1000)
        // 親コンポーネントでダミーコンテンツ作成関数を実行
        this.$emit('sliderChange')
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
    changeMultideviceDisabled() {
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
.menuBtns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}

.menuBtn {
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

.menuLink {
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: var(--font-size-md);
  padding: 5px;
}

.buttonImage {
  height: 18px;
  fill: var(--favorite-icon-stroke);
  transition: transform .25s;
}

.title {
  margin-left: 10px;
  color: var(--black-forDarkMode);
}
.menu {
  width: 400px;
  max-width: 95vw;
  border: 1px var(--menu-border) solid;
  position: absolute;
  top: 45px;
  right: -66px;
  margin: auto;
  background-color: var(--menu-background);
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: opacity .2s, transform .2s;
  overflow-y: auto;
  z-index: 150;
  color: var(--menu-text);
  &.open {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
  @include responsive(xs) {
    
  }
  @include responsive(sm) {
    
  }
  @include responsive(md) {
    position: absolute;
    top: 45px;
    right: 0;
    left: auto;
  }
  @include responsive(lg) {
    
  }
  @include responsive(xl) {
    
  }
  @include responsive(xxl) {
    
  }
}
.sideMenuContent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: 100px;
}

.controllerTitleWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
}

.controllerTitle {
  color: var(--menu-text);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.controllerItems {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  width: 100%;
  background-color: var(--menu-button-background);
  border-radius: 5px;
}

.controllerItem {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow:1;
  height: 50px;
  position: relative;
  &:first-child {
    border-radius: 5px 0 0 5px;
  }
  &:last-child {
    border-radius: 0 5px 5px 0;
  }
  &.disabled {
    pointer-events: none;
  }
  &.threeItems {
    width: 33.3%
  }
}
.controllerButton {
  z-index: 10;
}
.activeButton {
  position: absolute;
  top: 0;
  left: 0;
  width: 93.1%;
  height: 42px;
  margin: 4px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity .2s;
  &.active {
    opacity: 1;
    background-color: var(--menu-button-active);
  }
}

.slider {
  margin: 0 10px;
}

.selectableRange {
  border-radius: 3px;
  background-color: var(--menu-button-background);
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
  background-color: var(--menu-button-background);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color .2s;
  @include hover() {
    background-color: var(--menu-button-active);
  }
  &.disabled {
    @include hover() {
      background-color: var(--menu-button-background);
    }
    pointer-events: none;
  }
}

.sliderImageMinus {
  width: 12px;
  fill: var(--menu-comment);
}

.sliderImagePlus {
  width: 12px;
  fill: var(--menu-comment);
}
.scale {
  width: 24px;
  height: 24px;
  background-color: var(--menu-button-background);
  border-radius: 2px;
  display: none;
  align-items: center;
  justify-content: center;
  padding-bottom: 1px;
  margin-left: 16px;
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
    transition: transform .1s, background-color .1s;
  }
  .background {
    width: 32px;
    height: 12px;
    border-radius: 10px;
    transition: background-color .1s;
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
      background-color: var(--grey-super-light);
    }
    .background {
      background-color: var(--grey-ultra-light);
    }
  }
  &.disabled {
    .checkboxOuter {
      pointer-events: none;
    }
  }
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
    fill: var(--menu-text);
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
    color: var(--menu-text);
    font-weight: 500;
  }
  &.darkmode {
    font-size: var(--font-size-sm);
  }
}

// スライダーのスタイル
input[type="range"] {
  -webkit-appearance: none;                                 // お決まり
  appearance: none;                                         // お決まり
  cursor: pointer;                                          // カーソル
  outline: none;                                            // スライダーのアウトライン
  background: var(--menu-button-background);                // スライダーの背景色
  height: 3px;                                              // スライダーの高さ
  width: 222px;                                             // スライダーの幅
  border-radius: 10px;                                      // スライダーの端の丸み
  // -webkit-向けのつまみ
  &::-webkit-slider-thumb {
    -webkit-appearance: none;                               // お決まり
    background: var(--menu-button-active);                // 背景色
    width: 16px;                                            // 幅
    height: 16px;                                           // 高さ
    border-radius: 50%;                                     // 円形に
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);    // 影
  }
  // -moz-向けのつまみ
  &::-moz-range-thumb {
    background: var(--menu-button-active);                // 背景色
    width: 18px;                                            // 幅
    height: 18px;                                           // 高さ
    border-radius: 50%;                                     // 円形に
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);    // 影
    border: none;                                           // デフォルトの線を消す
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

.partitionLine {
  width: 100%;
  height: 2px;
  margin: 30px auto 20px auto;
  background-color: var(--menu-button-background);
}

.comment {
  font-size: var(--font-size-xs);
  color: var(--menu-comment);
  line-height: 1.6em;
  &:nth-child(1) {
    margin-top: 20px;
  }
  /* &:not(:nth-child(1)) {
    margin-top: 4px;
  } */
}

.text {
  color: var(--menu-text);
  &.color {
    width: 50px;
    margin-bottom: 2px;
  }
}

.colors {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
}

.color {
  width: 24px;
  height: 24px;
  border-radius: 12px;
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
      background-color: var(--white);
      border: 1px var(--gray6) solid;
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
      background-color: var(--gray3);
      border: 1px var(--gray6) solid;
    }
    &.color11 {
      background-color: var(--colormode11-transparent);
    }
    &.color12 {
      background-color: var(--colormode12-transparent);
    }
  }
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
    fill: var(--white);
  }
  .off.color11 & {
    fill: var(--colormode11);
  }
  .off.color12 & {
    fill: var(--colormode12);
  }
}
</style>
