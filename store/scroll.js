export const state = () => ({
  windowScroll: 0,
  sideMenuScroll: 0,
})

export const getters = {
  getWindowScroll: state => {
    return state.windowScroll
  },
  getSideMenuScroll: state => {
    return state.sideMenuScroll
  },
 }

export const mutations = {
  setWindowScroll(state,data) {
    state.windowScroll = data
  },
  setSideMenuScroll(state,data) {
    state.sideMenuScroll = data
  },
 }

export const actions = {
  pushWindowScroll({commit},data) {
    commit('setWindowScroll',data)
  },
  pushSideMenuScroll({commit},data) {
    commit('setSideMenuScroll',data)
  },
}
