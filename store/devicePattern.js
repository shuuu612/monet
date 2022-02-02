export const state = () => ({
  activePC: true,     // ローカルストレージ保存対象
  activeTB: false,    // ローカルストレージ保存対象
  activeSP: false,    // ローカルストレージ保存対象
  disabledPC: true,
  disabledTB: false,
  disabledSP: false,
  pattern1: true,   // PC
  pattern2: false,  // TB
  pattern3: false,  // SP
  pattern4: false,  // PC & TB & SP
  pattern5: false,  // PC & TB
  pattern6: false,  // PC & SP
  pattern7: false,  // TB & SP
  imageMaxWidth: {
    pattern1: 873,
    pattern2: 600,
    pattern3: 369,
    pattern4: 873+600+369,
    pattern5: 873+600,
    pattern6: 873+369,
    pattern7: 600+369,
  },
  multidevice: false, // ローカルストレージ保存対象
})

export const getters = {
  getActivePC: state => {
    return state.activePC
  },
  getActiveTB: state => {
    return state.activeTB
  },
  getActiveSP: state => {
    return state.activeSP
  },
  getStatePatternNumber: state => {
    if(state.pattern1) {
      return 1
    }else if(state.pattern2) {
      return 2
    }else if(state.pattern3) {
      return 3
    }else if(state.pattern4) {
      return 4
    }else if(state.pattern5) {
      return 5
    }else if(state.pattern6) {
      return 6
    }else if(state.pattern7) {
      return 7
    }
  },
  getStatePatternMaxWidth: state => {
    if(state.pattern1) {
      return state.imageMaxWidth.pattern1
    }else if(state.pattern2) {
      return state.imageMaxWidth.pattern2
    }else if(state.pattern3) {
      return state.imageMaxWidth.pattern3
    }else if(state.pattern4) {
      return state.imageMaxWidth.pattern4
    }else if(state.pattern5) {
      return state.imageMaxWidth.pattern5
    }else if(state.pattern6) {
      return state.imageMaxWidth.pattern6
    }else if(state.pattern7) {
      return state.imageMaxWidth.pattern7
    }
  },
  getDisabledPC: state => {
    return state.disabledPC
  },
  getDisabledTB: state => {
    return state.disabledTB
  },
  getDisabledSP: state => {
    return state.disabledSP
  },
  getMultidevaice: state => {
    return state.multidevice
  },
 }

export const mutations = {
  setActivePC(state) {
    state.activePC = !state.activePC
    if(!state.multidevice) {
      state.activeTB = false
      state.activeSP = false
    }
  },
  setActiveTB(state) {
    state.activeTB = !state.activeTB
    if(!state.multidevice) {
      state.activePC = false
      state.activeSP = false
    }
  },
  setActiveSP(state) {
    state.activeSP = !state.activeSP
    if(!state.multidevice) {
      state.activePC = false
      state.activeTB = false
    }
  },
  setPattern(state) {
    if(state.activePC===true && state.activeTB===false && state.activeSP===false ) {
      state.pattern1 = true
      state.pattern2 = false
      state.pattern3 = false
      state.pattern4 = false
      state.pattern5 = false
      state.pattern6 = false
      state.pattern7 = false
      state.disabledPC = true
      state.disabledTB = false
      state.disabledSP = false
    }else if(state.activePC===false && state.activeTB===true && state.activeSP===false ) {
      state.pattern1 = false
      state.pattern2 = true
      state.pattern3 = false
      state.pattern4 = false
      state.pattern5 = false
      state.pattern6 = false
      state.pattern7 = false
      state.disabledPC = false
      state.disabledTB = true
      state.disabledSP = false
    }else if(state.activePC===false && state.activeTB===false && state.activeSP===true ) {
      state.pattern1 = false
      state.pattern2 = false
      state.pattern3 = true
      state.pattern4 = false
      state.pattern5 = false
      state.pattern6 = false
      state.pattern7 = false
      state.disabledPC = false
      state.disabledTB = false
      state.disabledSP = true
    }else if(state.activePC===true && state.activeTB===true && state.activeSP===true ) {
      state.pattern1 = false
      state.pattern2 = false
      state.pattern3 = false
      state.pattern4 = true
      state.pattern5 = false
      state.pattern6 = false
      state.pattern7 = false
      state.disabledPC = false
      state.disabledTB = false
      state.disabledSP = false
    }else if(state.activePC===true && state.activeTB===true && state.activeSP===false ) {
      state.pattern1 = false
      state.pattern2 = false
      state.pattern3 = false
      state.pattern4 = false
      state.pattern5 = true
      state.pattern6 = false
      state.pattern7 = false
      state.disabledPC = false
      state.disabledTB = false
      state.disabledSP = false
    }else if(state.activePC===true && state.activeTB===false && state.activeSP===true ) {
      state.pattern1 = false
      state.pattern2 = false
      state.pattern3 = false
      state.pattern4 = false
      state.pattern5 = false
      state.pattern6 = true
      state.pattern7 = false
      state.disabledPC = false
      state.disabledTB = false
      state.disabledSP = false
    }else if(state.activePC===false && state.activeTB===true && state.activeSP===true ) {
      state.pattern1 = false
      state.pattern2 = false
      state.pattern3 = false
      state.pattern4 = false
      state.pattern5 = false
      state.pattern6 = false
      state.pattern7 = true
      state.disabledPC = false
      state.disabledTB = false
      state.disabledSP = false
    }else {
      console.log('想定外のパターン')
    }
  },
  setLocalStorage(state,key) {
    // 初回ロード時にローカルストレージからデータを取得
    state.activePC = Boolean(key[0])
    state.activeTB = Boolean(key[1])
    state.activeSP = Boolean(key[2])
    state.multidevice = Boolean(key[3])
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const devicePattern = [ Number(state.activePC), Number(state.activeTB), Number(state.activeSP), Number(state.multidevice) ]
      const devicePatternJson = JSON.stringify(devicePattern)
      localStorage.setItem('device-pattern', devicePatternJson)
    }
  },
  setMultidevaice(state) {
    state.multidevice = !state.multidevice
    if(!state.multidevice) {
      if(state.activePC) {
        state.activeTB = false
        state.activeSP = false
      }else if(state.activeTB) {
        state.activeSP = false
      }
    }
  },
 }

 export const actions = {
  pushPC({commit}) {
    commit('setActivePC')
    commit('setPattern')
    commit('updateLocalStorage')
  },
  pushTB({commit}) {
    commit('setActiveTB')
    commit('setPattern')
    commit('updateLocalStorage')
  },
  pushSP({commit}) {
    commit('setActiveSP')
    commit('setPattern')
    commit('updateLocalStorage')
  },
  pushMultidevaice({commit}) {
    commit('setMultidevaice')
    commit('setPattern')
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
    commit('setPattern')
  },
 }