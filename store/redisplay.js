export const state = () => ({
  redisplay: false,
})

export const getters = {
  getRedisplay: state => {
    return state.redisplay
  },
 }

export const mutations = {
  setRedisplay(state) {
    state.redisplay = !state.redisplay
  },
 }

 export const actions = {
  pushRedisplay({commit}) {
    commit('setRedisplay')
  },
 }