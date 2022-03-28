export const state = () => ({
  loaded: false,                // 初回読み込み完了フラグ
  loadedImage: false,           // 画像の読み込み完了フラグ
})

export const getters = {
  getLoaded: state => {
    return state.loaded
  },
  getLoadedImage: state => {
    return state.loadedImage
  },
 }

export const mutations = {
  setLoaded(state) {
    state.loaded = true
  },
  setLoadedImage(state) {
    state.loadedImage = true
  },
 }

export const actions = {
  pushLoaded({commit}) {
    commit('setLoaded')
  },
  pushLoadedImage({commit}) {
    commit('setLoadedImage')
  },
}
