export const state = () => ({
  name: '',       // セッションストレージ
  email: '',      // セッションストレージ
  message: '',    // セッションストレージ
})

export const getters = {
  getName: state => {
    return state.name;
  },
  getEmail: state => {
    return state.email;
  },
  getMessage: state => {
    return state.message;
  },
 }

export const mutations = {
  setName(state, name) {
    state.name = name;
  },
  setEmail(state,email) {
    state.email = email;
  },
  setMessage(state,message) {
    state.message = message;
  },
  setClear(state) {
    state.name = '';
    state.email = '';
    state.message = '';
    localStorage.removeItem('contact');
  },
  setLocalStorage(state,key) {
    // 初回ロード時にローカルストレージからデータを取得
    state.name = key[0];
    state.email = key[1];
    state.message = key[2];
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const contact = [state.name, state.email, state.message]
      const contactJson = JSON.stringify(contact)
      localStorage.setItem('contact', contactJson)
    }
  },
 }

export const actions = {
  pushInputData({commit},{name, email, message}) {
    commit('setName',name);
    commit('setEmail',email);
    commit('setMessage',message);
    commit('updateLocalStorage');
  },
  pushClear({commit}) {
    commit('setClear');
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data);
  },
}
