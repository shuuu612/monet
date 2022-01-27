export const state = () => ({
  loaded: false,                // 初回読み込み時にResizeObserverを実行しないためのフラグ
  loadingDisplayed: false,      // ローディング画面表示済みフラグ
})

export const getters = {
  getLoaded: state => {
    return state.loaded
  },
  getLoadingDisplayed: state => {
    return state.loadingDisplayed
  },
 }

export const mutations = {
  setLoaded(state) {
    state.loaded = true
  },
  setLoadingDisplayed(state) {
    state.loadingDisplayed = true
  },
 }

 export const actions = {
  pushLoaded({commit}) {
    commit('setLoaded')
  },
  pushLoadingDisplayed({commit}) {
    commit('setLoadingDisplayed')
  },
 }