export const state = () => ({
  tag: '',
  sort: '',
})

export const getters = {
  getTag: state => {
    return state.tag
  },
  getSort: state => {
    return state.sort
  },
 }

export const mutations = {
  setTag(state,data) {
    state.tag = data
  },
  setSort(state,data) {
    state.sort = data
  },
 }

 export const actions = {
  pushTag({commit},data) {
    commit('setTag',data)
  },
  pushSort({commit},data) {
    commit('setSort',data)
  },
 }