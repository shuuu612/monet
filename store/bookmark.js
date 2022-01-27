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
    /* console.log('ローカルストレージからデータを取得-bookmark') */
    state.bookmark = key
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (window.localStorage) {
      /* console.log('ローカルストレージに保存-bookmark') */
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