export const state = () => ({
  keyword: '',
  open: false,
})

export const getters = {
  getKeyword: state => {
    return state.keyword
  },
  getOpen: state => {
    return state.open
  },
 }

export const mutations = {
  setKeyword(state,data) {
    console.log('setKeyword')
    state.keyword = data
  },
  setOpen(state) {
    state.open = !state.open
  },
 }

 export const actions = {
  pushKeyword({commit},data) {
    commit('setKeyword',data)
  },
  pushOpen({commit}) {
    commit('setOpen')
  },
 }