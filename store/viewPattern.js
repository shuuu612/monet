export const state = () => ({
  activeList: false,
  activeGrid: true,
})

export const getters = {
  getActiveList: state => {
    return state.activeList
  },
  getActiveGrid: state => {
    return state.activeGrid
  },
 }

export const mutations = {
  setActiveList(state) {
    state.activeList = !state.activeList
  },
  setActiveGrid(state) {
    state.activeGrid = !state.activeGrid
  },
  setLocalStorage(state,key) {
    // 初回ロード時にローカルストレージからデータを取得
    state.activeList = Boolean(key[0])
    state.activeGrid = Boolean(key[1])
    /* console.log('ローカルストレージからデータを取得-viewPattern')
    console.log(key) */
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (this.$storageAvailable('localStorage')) {
      /* console.log('ローカルストレージに保存-viewPattern') */
      const viewPattern = [ Number(state.activeList), Number(state.activeGrid) ]
      const viewPatternJson = JSON.stringify(viewPattern)
      /* console.log(viewPatternJson) */
      localStorage.setItem('view-pattern', viewPatternJson)
    }
  },
 }

 export const actions = {
  pushButton({commit}) {
    commit('setActiveList')
    commit('setActiveGrid')
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
  },
 }