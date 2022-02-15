export const state = () => ({
  display: false,
  text: 'サンプル',
  type: 3,    // 1:エラー、2:警告、3:通常
})

export const getters = {
  getDisplay: state => {
    return state.display
  },
  getText: state => {
    return state.text
  },
  getType: state => {
    return state.type
  },
 }

export const mutations = {
  setDisplay(state) {
    state.display = true
  },
  setText(state,text) {
    state.text = text
  },
  setType(state,id) {
    state.type = id
  },
  setClose(state) {
    state.display = false
  },
 }

export const actions = {
  pushDisplay({commit},{id, text}) {
    commit('setType',id)
    commit('setText',text)
    commit('setDisplay')
  },
  pushClose({commit}) {
    commit('setClose')
  },
}
