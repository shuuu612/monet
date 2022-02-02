export const state = () => ({
  page: 0,                  // セッションストレージ保存対象
  exist: [],
  contents: {           // セッションストレージ保存対象
    type: [],
    industry: [],
    impression: [],
    layout: [],
    color: [],
    pickup: [],
    technique: [],
    technology: [],
    condition: [],
  },
  displayingPage: [],
  scroll: [],
  reload: false,            // セッションストレージ保存対象
  backward: false,          // セッションストレージ保存対象
})

export const getters = {
  getExist: state => {
    console.log(state.exist)
    return state.exist[state.page-1]

  },
  getType: state => {
    return state.contents.type[state.page-1]
  },
  getIndustry: state => {
    return state.contents.industry[state.page-1]
  },
  getImpression: state => {
    return state.contents.impression[state.page-1]
  },
  getLayout: state => {
    return state.contents.layout[state.page-1]
  },
  getColor: state => {
    return state.contents.color[state.page-1]
  },
  getPickup: state => {
    return state.contents.pickup[state.page-1]
  },
  getTechnique: state => {
    return state.contents.technique[state.page-1]
  },
  getTechnology: state => {
    return state.contents.technology[state.page-1]
  },
  getCondition: state => {
    return state.contents.condition[state.page-1]
  },
  getPage: state => {
    return state.page
  },
  getReload: state => {
    return state.reload
  },
  getBackward: state => {
    return state.backward
  },
 }

export const mutations = {
  setReplaceEmpty(state) {
    state.exist.splice(state.page-1, 1, 0);
    state.contents.type.splice(state.page-1, 1, '')
    state.contents.industry.splice(state.page-1, 1, '')
    state.contents.impression.splice(state.page-1, 1, '')
    state.contents.layout.splice(state.page-1, 1, '')
    state.contents.color.splice(state.page-1, 1, '')
    state.contents.pickup.splice(state.page-1, 1, '')
    state.contents.technique.splice(state.page-1, 1, '')
    state.contents.technology.splice(state.page-1, 1, '')
    state.contents.condition.splice(state.page-1, 1, '')
  },
  setUpdateEmpty(state) {
    state.exist.splice(state.page-1, 1, 0);
    state.contents.type.splice(state.page-1, 1, '')
    state.contents.industry.splice(state.page-1, 1, '')
    state.contents.impression.splice(state.page-1, 1, '')
    state.contents.layout.splice(state.page-1, 1, '')
    state.contents.color.splice(state.page-1, 1, '')
    state.contents.pickup.splice(state.page-1, 1, '')
    state.contents.technique.splice(state.page-1, 1, '')
    state.contents.technology.splice(state.page-1, 1, '')
    state.contents.condition.splice(state.page-1, 1, '')
    state.exist.splice(state.page)
    state.contents.type.splice(state.page)
    state.contents.industry.splice(state.page)
    state.contents.impression.splice(state.page)
    state.contents.layout.splice(state.page)
    state.contents.color.splice(state.page)
    state.contents.pickup.splice(state.page)
    state.contents.technique.splice(state.page)
    state.contents.technology.splice(state.page)
    state.contents.condition.splice(state.page)
  },
  setReplaceExist(state) {
    // 置き換え
    state.exist.splice(state.page-1, 1, 1);
    console.log('現在の保存状態')
    console.log(state.exist)
    console.log(state.contents)
  },
  setReplaceType(state,data) {
    // 置き換え
    state.contents.type.splice(state.page-1, 1, data);
  },
  setReplaceIndustry(state,data) {
    // 置き換え
    state.contents.industry.splice(state.page-1, 1, data);
  },
  setReplaceImpression(state,data) {
    // 置き換え
    state.contents.impression.splice(state.page-1, 1, data);
  },
  setReplaceLayout(state,data) {
    // 置き換え
    state.contents.layout.splice(state.page-1, 1, data);
  },
  setReplaceColor(state,data) {
    // 置き換え
    state.contents.color.splice(state.page-1, 1, data);
  },
  setReplacePickup(state,data) {
    // 置き換え
    state.contents.pickup.splice(state.page-1, 1, data);
  },
  setReplaceTechnique(state,data) {
    // 置き換え
    state.contents.technique.splice(state.page-1, 1, data);
  },
  setReplaceTechnology(state,data) {
    // 置き換え
    state.contents.technology.splice(state.page-1, 1, data);
  },
  setReplaceCondition(state,data) {
    // 置き換え
    state.contents.condition.splice(state.page-1, 1, data);
  },
  setUpdateExist(state) {
    // 更新
    state.exist.splice(state.page-1, 1, 1);
    state.exist.splice(state.page);
    console.log('現在の保存状態')
    console.log(state.exist)
    console.log(state.contents)
  },
  setUpdateType(state,data) {
    // 更新
    state.contents.type.splice(state.page-1, 1, data);
    state.contents.type.splice(state.page);
  },
  setUpdateIndustry(state,data) {
    // 更新
    state.contents.industry.splice(state.page-1, 1, data);
    state.contents.industry.splice(state.page);
  },
  setUpdateImpression(state,data) {
    // 更新
    state.contents.impression.splice(state.page-1, 1, data);
    state.contents.impression.splice(state.page);
  },
  setUpdateLayout(state,data) {
    // 更新
    state.contents.layout.splice(state.page-1, 1, data);
    state.contents.layout.splice(state.page);
  },
  setUpdateColor(state,data) {
    // 更新
    state.contents.color.splice(state.page-1, 1, data);
    state.contents.color.splice(state.page);
  },
  setUpdatePickup(state,data) {
    // 更新
    state.contents.pickup.splice(state.page-1, 1, data);
    state.contents.pickup.splice(state.page);
  },
  setUpdateTechnique(state,data) {
    // 更新
    state.contents.technique.splice(state.page-1, 1, data);
    state.contents.technique.splice(state.page);
  },
  setUpdateTechnology(state,data) {
    // 更新
    state.contents.technology.splice(state.page-1, 1, data);
    state.contents.technology.splice(state.page);
  },
  setUpdateCondition(state,data) {
    // 更新
    state.contents.condition.splice(state.page-1, 1, data);
    state.contents.condition.splice(state.page);
  },
  setPageUp(state) {
    state.page++;
  },
  setPageDown(state) {
    state.page--;
  },
  setReload(state) {
    state.reload = !state.reload;
  },
  setBackward(state) {
    state.backward = !state.backward;
  },
  setLocalStorage(state,key) {
    // 初回ロード時にセッションストレージからデータを取得
    state.page = key[0]
    state.exist = key[1]
    state.reload = Boolean(key[2])
    state.backward = Boolean(key[3])
  },
  updateLocalStorage(state) {
    // セッションストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const page = [state.page, state.exist, Number(state.reload), Number(state.backward)]
      const pageJson = JSON.stringify(page)
      sessionStorage.setItem('page', pageJson)
    }
  },
 }

 export const actions = {
  pushReplaceEmpty({commit}) {
    commit('setReplaceEmpty')
    commit('updateLocalStorage')
  },
  pushUpdateEmpty({commit}) {
    commit('setUpdateEmpty')
    commit('updateLocalStorage')
  },
  // 置き換え
  pushReplaceExist({commit}) {
    commit('setReplaceExist')
    commit('updateLocalStorage')
  },
  pushReplaceType({commit},data) {
    commit('setReplaceType',data)
    commit('updateLocalStorage')
  },
  pushReplaceIndustry({commit},data) {
    commit('setReplaceIndustry',data)
    commit('updateLocalStorage')
  },
  pushReplaceImpression({commit},data) {
    commit('setReplaceImpression',data)
    commit('updateLocalStorage')
  },
  pushReplaceLayout({commit},data) {
    commit('setReplaceLayout',data)
    commit('updateLocalStorage')
  },
  pushReplaceColor({commit},data) {
    commit('setReplaceColor',data)
    commit('updateLocalStorage')
  },
  pushReplacePickup({commit},data) {
    commit('setReplacePickup',data)
    commit('updateLocalStorage')
  },
  pushReplaceTechnique({commit},data) {
    commit('setReplaceTechnique',data)
    commit('updateLocalStorage')
  },
  pushReplaceTechnology({commit},data) {
    commit('setReplaceTechnology',data)
    commit('updateLocalStorage')
  },
  pushReplaceCondition({commit},data) {
    commit('setReplaceCondition',data)
    commit('updateLocalStorage')
  },
  // 更新
  pushUpdateExist({commit}) {
    commit('setReplaceExist')
    commit('updateLocalStorage')
  },
  pushUpdateType({commit},data) {
    commit('setUpdateType',data)
    commit('updateLocalStorage')
  },
  pushUpdateIndustry({commit},data) {
    commit('setUpdateIndustry',data)
    commit('updateLocalStorage')
  },
  pushUpdateImpression({commit},data) {
    commit('setUpdateImpression',data)
    commit('updateLocalStorage')
  },
  pushUpdateLayout({commit},data) {
    commit('setUpdateLayout',data)
    commit('updateLocalStorage')
  },
  pushUpdateColor({commit},data) {
    commit('setUpdateColor',data)
    commit('updateLocalStorage')
  },
  pushUpdatePickup({commit},data) {
    commit('setUpdatePickup',data)
    commit('updateLocalStorage')
  },
  pushUpdateTechnique({commit},data) {
    commit('setUpdateTechnique',data)
    commit('updateLocalStorage')
  },
  pushUpdateTechnology({commit},data) {
    commit('setUpdateTechnology',data)
    commit('updateLocalStorage')
  },
  pushUpdateCondition({commit},data) {
    commit('setUpdateCondition',data)
    commit('updateLocalStorage')
  },
  pushPageUp({commit}) {
    commit('setPageUp')
    commit('updateLocalStorage')
  },
  pushPageDown({commit}) {
    commit('setPageDown')
    commit('updateLocalStorage')
  },
  pushReload({commit}) {
    commit('setReload')
    commit('updateLocalStorage')
  },
  pushBackward({commit}) {
    commit('setBackward')
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
  },
 }