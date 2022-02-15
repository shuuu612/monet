export const state = () => ({
  keyword: '',    // セッションストレージ保存対象
  open: false,    // モバイル用
})

export const getters = {
  getKeyword: state => {
    return state.keyword
  },
  getOpen: state => {
    return state.open
  },
 }

export const mutations = {
  setKeyword(state,data) {
    state.keyword = data
  },
  setOpen(state) {
    state.open = !state.open
  },
  setClear(state) {
    state.keyword = ''
  },
  setLocalStorage(state,key) {
    // 初回ロード時にセッションストレージからデータを取得
    state.keyword = key[0]
    state.open = Boolean(key[1])
  },
  updateLocalStorage(state) {
    // セッションストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const search = [state.keyword, Number(state.open)]
      const searchJson = JSON.stringify(search)
      sessionStorage.setItem('search', searchJson)
    }
  },
 }

export const actions = {
  pushKeyword({commit},data) {
    commit('setKeyword',data)
    commit('updateLocalStorage')
  },
  pushOpen({commit}) {
    commit('setOpen')
    commit('updateLocalStorage')
  },
  pushClear({commit}) {
    commit('setClear')
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
  },
}
