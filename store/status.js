export const state = () => ({
  searchTag: false,       // セッションストレージ保存対象
  searchMulti: false,     // セッションストレージ保存対象
  searchKeyword: false,    // セッションストレージ保存対象
})

export const getters = {
  getSearchTag: state => {
    return state.searchTag
  },
  getSearchMulti: state => {
    return state.searchMulti
  },
  getSearchKeyword: state => {
    return state.searchKeyword
  },
 }

export const mutations = {
  setSearchTag(state) {
    console.log('現在の状態を「通常表示」に変更')
    state.searchTag = true;
    state.searchMulti = false;
    state.searchKeyword = false;
  },
  setSearchMulti(state) {
    console.log('現在の状態を「複数選択」に変更')
    state.searchTag = false;
    state.searchMulti = true;
    state.searchKeyword = false;
  },
  setSearchKeyword(state) {
    console.log('現在の状態を「キーワード検索」に変更')
    state.searchTag = false;
    state.searchMulti = false;
    state.searchKeyword = true;
  },
  setLocalStorage(state,key) {
    // 初回ロード時にセッションストレージからデータを取得
    state.searchTag = Boolean(key[0])
    state.searchMulti = Boolean(key[1])
    state.searchKeyword = Boolean(key[2])
  },
  updateLocalStorage(state) {
    // セッションストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const status = [ Number(state.searchTag), Number(state.searchMulti), Number(state.searchKeyword) ]
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
  pushSearchMulti({commit}) {
    commit('setSearchMulti')
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