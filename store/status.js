export const state = () => ({
  searchTag: false,       // セッションストレージ保存対象
  searchKeyword: false,    // セッションストレージ保存対象
})

export const getters = {
  getSearchTag: state => {
    return state.searchTag
  },
  getSearchKeyword: state => {
    return state.searchKeyword
  },
 }

export const mutations = {
  setSearchTag(state) {
    console.log('現在の状態を「通常表示」に変更')
    state.searchTag = true;
    state.searchKeyword = false;
  },
  setSearchKeyword(state) {
    console.log('現在の状態を「キーワード検索」に変更')
    state.searchTag = false;
    state.searchKeyword = true;
  },
  setLocalStorage(state,key) {
    // 初回ロード時にセッションストレージからデータを取得
    state.searchTag = Boolean(key[0])
    state.searchKeyword = Boolean(key[1])
  },
  updateLocalStorage(state) {
    // セッションストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const status = [ Number(state.searchTag), Number(state.searchKeyword) ]
      const statusJson = JSON.stringify(status)
      sessionStorage.setItem('status', statusJson)
    }
  },
 }

 export const actions = {
  pushSearchTag({commit}) {
    commit('setSearchTag')
    commit('updateLocalStorage')
  },
  pushSearchKeyword({commit}) {
    commit('setSearchKeyword')
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
  },
 }