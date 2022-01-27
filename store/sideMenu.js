export const state = () => ({
  open: false,
  /* selectedHome: false,
  selectedTag: false,
  selectedSearch: false,
  selectedBookmark: false,
  selectedSetting: false,
  selectedHomeBefore: false,
  selectedTagBefore: false,
  selectedSearchBefore: false,
  selectedBookmarkBefore: false,
  selectedSettingBefore: false, */
})

export const getters = {
  getOpen: state => {
    return state.open
  },
  /* getSelectedHome: state => {
    return state.selectedHome
  },
  getSelectedTag: state => {
    return state.selectedTag
  },
  getSelectedSearch: state => {
    return state.selectedSearch
  },
  getSelectedBookmark: state => {
    return state.selectedBookmark
  },
  getSelectedSetting: state => {
    return state.selectedSetting
  }, */
 }

export const mutations = {
  setOpen(state) {
    state.open = !state.open
  },
  /* setOpen(state, key) {
    console.log('セットオープン')
    console.log(key)
    if(state.open === true) {
      if(key === 'tag' || key === 'search' || key === 'setting') {
        // 何もしない
      }else {
        state.open = !state.open
      }
    }else if(state.open !== true){
      if(key === 'tag' || key === 'search' || key === 'setting') {
        state.open = !state.open

        state.selectedHomeBefore = state.selectedHome
        state.selectedTagBefore = state.selectedTag
        state.selectedSearchBefore = state.selectedSearch
        state.selectedBookmarkBefore = state.selectedBookmark
        state.selectedSettingBefore = state.selectedSetting
      }
    }


    if(key === 'mask') {
      state.selectedHome = state.selectedHomeBefore
      state.selectedTag = state.selectedTagBefore
      state.selectedSearch = state.selectedSearchBefore
      state.selectedBookmark = state.selectedBookmarkBefore
      state.selectedSetting = state.selectedSettingBefore
    }else if(key === 'home') {
      state.selectedHome = true
      state.selectedTag = false
      state.selectedSearch = false
      state.selectedBookmark = false
      state.selectedSetting = false
    }else if(key === 'tag' || key === 'tagsearch') {
      state.selectedHome = false
      state.selectedTag = true
      state.selectedSearch = false
      state.selectedBookmark = false
      state.selectedSetting = false
    }else if(key === 'search') {
      state.selectedHome = false
      state.selectedTag = false
      state.selectedSearch = true
      state.selectedBookmark = false
      state.selectedSetting = false
    }else if(key === 'bookmark') {
      state.selectedHome = false
      state.selectedTag = false
      state.selectedSearch = false
      state.selectedBookmark = true
      state.selectedSetting = false
    }else if(key === 'setting') {
      state.selectedHome = false
      state.selectedTag = false
      state.selectedSearch = false
      state.selectedBookmark = false
      state.selectedSetting = true
    }
  },
  setSelectedHome(state) {
    state.selectedHome = true
    state.selectedTag = false
    state.selectedSearch = false
    state.selectedBookmark = false
    state.selectedSetting = false
  },
  setSelectedTag(state) {
    state.selectedHome = false
    state.selectedTag = true
    state.selectedSearch = false
    state.selectedBookmark = false
    state.selectedSetting = false
  },
  setSelectedSearch(state) {
    state.selectedHome = false
    state.selectedTag = false
    state.selectedSearch = true
    state.selectedBookmark = false
    state.selectedSetting = false
  },
  setSelectedBookmark(state) {
    state.selectedHome = false
    state.selectedTag = false
    state.selectedSearch = false
    state.selectedBookmark = true
    state.selectedSetting = false
  },
  setSelectedSetting(state) {
    state.selectedHome = false
    state.selectedTag = false
    state.selectedSearch = false
    state.selectedBookmark = false
    state.selectedSetting = true
  }, */

  /* setLocalStorage(state,key) {
    state.activeList = Boolean(key[0])
    state.activeGrid = Boolean(key[1])
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (window.localStorage) {
      const viewPattern = [ Number(state.activeList), Number(state.activeGrid) ]
      const viewPatternJson = JSON.stringify(viewPattern)
      localStorage.setItem('view-pattern', viewPatternJson)
    }
  }, */
 }

 export const actions = {
  pushOpen({commit}) {
    commit('setOpen')
    /* commit('updateLocalStorage') */
  },
  /* pushSelectedHome({commit}) {
    commit('setSelectedHome')
  },
  pushSelectedTag({commit}) {
    commit('setSelectedTag')
  },
  pushSelectedSearch({commit}) {
    commit('setSelectedSearch')
  },
  pushSelectedBookmark({commit}) {
    commit('setSelectedBookmark')
  },
  pushSelectedSetting({commit}) {
    commit('setSelectedSetting')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
  }, */
 }