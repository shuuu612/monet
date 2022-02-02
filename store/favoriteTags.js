export const state = () => ({
  favoriteTags: [],   // ローカルストレージ保存対象
})

export const getters = {
  getInclusionFavoriteTags: state => (key) => {
    return state.favoriteTags.includes(key)
  },
  getFavoriteTags: state => {
    return state.favoriteTags
  },
 }

export const mutations = {
  setFavoriteTags(state,key) {
    if(state.favoriteTags.includes(key)) {
      // 削除
      state.favoriteTags.splice(state.favoriteTags.indexOf(key),1)
    }else {
      // 追加
      state.favoriteTags.push(key)
    }
  },
  setLocalStorage(state,key) {
    // 初回ロード時にローカルストレージからデータを取得
    state.favoriteTags = key
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const favoriteTagsJson = JSON.stringify(state.favoriteTags)
      localStorage.setItem('favoriteTags', favoriteTagsJson)
    }
  },
 }

 export const actions = {
  pushFavoriteTags({commit},data) {
    commit('setFavoriteTags',data)
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
  },
 }