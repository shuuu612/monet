export const state = () => ({
  open: false,
})

export const getters = {
  getOpen: state => {
    return state.open
  },
 }

export const mutations = {
  setOpen(state) {
    state.open = !state.open
  },
 }

export const actions = {
  pushOpen({commit}) {
    commit('setOpen')
  },
}
