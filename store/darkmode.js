// 現在未使用
export const state = () => ({
  htmlClass: 'darkmode',
  selectedOn: false,        // ローカルストレージ保存対象
  selectedOff: true,        // ローカルストレージ保存対象
  selectedOs: false,        // ローカルストレージ保存対象
  active: false,
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
 }

export const mutations = {
  setDarkmodeOn(state) {
    state.selectedOn = true
    state.selectedOff = false
    state.selectedOs = false
    state.active = true
  },
  setDarkmodeOff(state) {
    state.selectedOn = false
    state.selectedOff = true
    state.selectedOs = false
    state.active = false
  },
  setDarkmodeOs(state) {
    state.selectedOn = false
    state.selectedOff = false
    state.selectedOs = true
    const osDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if(osDark) {
      state.active = true
    }else {
      state.active = false
    }
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
    }else if(state.selectedOff) {
      state.active = false
    }else if(state.selectedOs) {
      const osDark = window.matchMedia("(prefers-color-scheme: dark)")
      if(osDark) {
        state.active = true
      }else {
        state.active = false
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
