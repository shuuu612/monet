export const state = () => ({
  contents: {},
})

export const getters = {
  getContents: state => {
    return state.contents
  },
 }

export const mutations = {
  setContents(state,data) {
    state.contents = data
  },
 }

 export const actions = {
  pushContents({commit},data) {
    commit('setContents',data)
  },
 }