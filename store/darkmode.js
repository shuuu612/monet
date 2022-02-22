// 現在未使用
export const state = () => ({
  htmlClass: 'darkmode',
  selectedOn: false,        // ローカルストレージ保存対象
  selectedOff: true,        // ローカルストレージ保存対象
  selectedOs: false,        // ローカルストレージ保存対象
  active: false,
  clickCount: 0,            // 初期値：ダークモードOFF[0]、ダークモードON[1]
})

export const getters = {
  getHtmlClass: state => {
    return state.htmlClass
  },
  getSelectedOn: state => {
    return state.selectedOn
  },
  getSelectedOff: state => {
    return state.selectedOff
  },
  getSelectedOs: state => {
    return state.selectedOs
  },
  getActive: state => {
    return state.active
  },
  getClickCount: state => {
    return state.clickCount
  },
 }

export const mutations = {
  setDarkmodeOn(state) {
    state.selectedOn = true
    state.selectedOff = false
    state.selectedOs = false
    if(state.active === false) state.clickCount++;
    state.active = true
  },
  setDarkmodeOff(state) {
    state.selectedOn = false
    state.selectedOff = true
    state.selectedOs = false
    if(state.active === true) state.clickCount++;
    state.active = false
  },
  setDarkmodeOs(state) {
    state.selectedOn = false
    state.selectedOff = false
    state.selectedOs = true
    const osDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if(osDark) {
      if(state.active === false) state.clickCount++;
      state.active = true
    }else {
      if(state.active === true) state.clickCount++;
      state.active = false
    }
  },
  setClickCount(state) {
    state.clickCount = state.active ? 1 : 0;
  },
  setClickCountUp(state) {
    state.clickCount++
  },
  setClickCountClear(state) {
    state.clickCount = state.active ? 1 : 0;
  },
  setDarkmodeOnForPage(state) {
    state.selectedOn = true
    state.selectedOff = false
    state.selectedOs = false
    state.active = true
  },
  setDarkmodeOffForPage(state) {
    state.selectedOn = false
    state.selectedOff = true
    state.selectedOs = false
    state.active = false
  },
  setLocalStorage(state,key) {
    // 初回ロード時にローカルストレージからデータを取得
    state.selectedOn = Boolean(key[0])
    state.selectedOff = Boolean(key[1])
    state.selectedOs = Boolean(key[2])
    if(state.selectedOn) {
      state.active = true
      state.clickCount = 1
    }else if(state.selectedOff) {
      state.active = false
      state.clickCount = 0
    }else if(state.selectedOs) {
      const osDark = window.matchMedia("(prefers-color-scheme: dark)")
      if(osDark) {
        state.active = true
        state.clickCount = 1
      }else {
        state.active = false
        state.clickCount = 0
      }
    }
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const darkmode = [Number(state.selectedOn), Number(state.selectedOff), Number(state.selectedOs)]
      const darkmodeJson = JSON.stringify(darkmode)
      localStorage.setItem('darkmode', darkmodeJson)
    }
  },
 }

export const actions = {
  pushDarkmodeOn({commit}) {
    commit('setDarkmodeOn')
    commit('updateLocalStorage')
  },
  pushDarkmodeOff({commit}) {
    commit('setDarkmodeOff')
    commit('updateLocalStorage')
  },
  pushDarkmodeOs({commit}) {
    commit('setDarkmodeOs')
    commit('updateLocalStorage')
  },
  pushCountUp({commit}) {
    commit('setClickCountUp')
  },
  pushClickCountClear({commit}) {
    commit('setClickCountClear')
  },
  pushDarkmodeOnForPage({commit}) {
    commit('setDarkmodeOnForPage')
    commit('updateLocalStorage')
  },
  pushDarkmodeOffForPage({commit}) {
    commit('setDarkmodeOffForPage')
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
  },
}
