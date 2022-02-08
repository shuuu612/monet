export const state = () => ({
  loaded: false,                // 初回読み込み完了フラグ
  loadingDisplayed: false,      // ローディング画面表示済みフラグ
  loadedImage: false,           // 画像の読み込み完了フラグ
})

export const getters = {
  getLoaded: state => {
    return state.loaded
  },
  getLoadingDisplayed: state => {
    return state.loadingDisplayed
  },
  getLoadedImage: state => {
    return state.loadedImage
  },
 }

export const mutations = {
  setLoaded(state) {
    state.loaded = true
  },
  setLoadingDisplayed(state) {
    state.loadingDisplayed = true
  },
  setLoadedImage(state) {
    state.loadedImage = true
  },
 }

 export const actions = {
  pushLoaded({commit}) {
    commit('setLoaded')
  },
  pushLoadingDisplayed({commit}) {
    commit('setLoadingDisplayed')
  },
  pushLoadedImage({commit}) {
    commit('setLoadedImage')
  },
 }