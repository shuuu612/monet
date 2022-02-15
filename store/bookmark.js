export const state = () => ({
  bookmark: [],   // ローカルストレージ保存対象
})

export const getters = {
  getInclusionBookmark: state => (key) => {
    return state.bookmark.includes(key)
  },
  getBookmark: state => {
    return state.bookmark
  },
 }

export const mutations = {
  setBookmark(state,key) {
    if(state.bookmark.includes(key)) {
      // 削除
      state.bookmark.splice(state.bookmark.indexOf(key),1)
    }else {
      // 追加
      state.bookmark.push(key)
    }
  },
  setLocalStorage(state,key) {
    // 初回ロード時にローカルストレージからデータを取得
    state.bookmark = key
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const bookmarkJson = JSON.stringify(state.bookmark)
      localStorage.setItem('bookmark', bookmarkJson)
    }
  },
 }

export const actions = {
  pushBookmark({commit},data) {
    commit('setBookmark',data)
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
  },
}
 