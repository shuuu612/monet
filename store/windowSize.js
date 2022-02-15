export const state = () => ({
  windowWidth: 0,
})

export const getters = {
  getWindowWidth: state => {
    return state.windowWidth
  },
 }

export const mutations = {
  setWindowWidth(state,data) {
    state.windowWidth = data
  },
 }

export const actions = {
  pushWindowWidth({commit},data) {
    commit('setWindowWidth',data)
  },
}
