export const state = () => ({
  contents: {           // セッションストレージ保存対象
    type: [],
    industry: [],
    impression: [],
    layout: [],
    color: [],
    pickup: [],
    technique: [],
    technology: [],
    condition: 'or',
  },
  active: false,        // セッションストレージ保存対象
  start: false,
  hit: 0,               // セッションストレージ保存対象
})

export const getters = {
  getContents: state => {
    return state.contents
  },
  getType: state => {
    return state.contents.type
  },
  getIndustry: state => {
    return state.contents.industry
  },
  getImpression: state => {
    return state.contents.impression
  },
  getLayout: state => {
    return state.contents.layout
  },
  getColor: state => {
    return state.contents.color
  },
  getPickup: state => {
    return state.contents.pickup
  },
  getTechnique: state => {
    return state.contents.technique
  },
  getTechnology: state => {
    return state.contents.technology
  },
  getCondition: state => {
    return state.contents.condition
  },
  getStart: state => {
    return state.start
  },
  getHit: state => {
    return state.hit
  },
  getActive: state => {
    return state.active
  },
 }

export const mutations = {
  setType(state,data) {
    console.log('1')
    if(!state.contents.type.includes(data)) {
      state.contents.type.push(data)
    }else {
      state.contents.type.splice(state.contents.type.indexOf(data),1)
    }
  },
  setIndustry(state,data) {
    if(!state.contents.industry.includes(data)) {
      state.contents.industry.push(data)
    }else {
      state.contents.industry.splice(state.contents.industry.indexOf(data),1)
    }
  },
  setImpression(state,data) {
    if(!state.contents.impression.includes(data)) {
      state.contents.impression.push(data)
    }else {
      state.contents.impression.splice(state.contents.impression.indexOf(data),1)
    }
  },
  setLayout(state,data) {
    if(!state.contents.layout.includes(data)) {
      state.contents.layout.push(data)
    }else {
      state.contents.layout.splice(state.contents.layout.indexOf(data),1)
    }
  },
  setColor(state,data) {
    if(!state.contents.color.includes(data)) {
      state.contents.color.push(data)
    }else {
      state.contents.color.splice(state.contents.color.indexOf(data),1)
    }
  },
  setPickup(state,data) {
    if(!state.contents.pickup.includes(data)) {
      state.contents.pickup.push(data)
    }else {
      state.contents.pickup.splice(state.contents.pickup.indexOf(data),1)
    }
  },
  setTechnique(state,data) {
    if(!state.contents.technique.includes(data)) {
      state.contents.technique.push(data)
    }else {
      state.contents.technique.splice(state.contents.technique.indexOf(data),1)
    }
  },
  setTechnology(state,data) {
    if(!state.contents.technology.includes(data)) {
      state.contents.technology.push(data)
    }else {
      state.contents.technology.splice(state.contents.technology.indexOf(data),1)
    }
  },
  setCondition(state,data) {
    state.contents.condition = data
  },
  setActive(state) {
    const total = 
      state.contents.type.length +
      state.contents.industry.length +
      state.contents.impression.length +
      state.contents.layout.length +
      state.contents.color.length +
      state.contents.pickup.length +
      state.contents.technique.length +
      state.contents.technology.length

    if(total > 0) {
      state.active = true
    }else {
      state.active = false
    }
  },
  setStart(state) {
    state.start = !state.start
  },
  setHit(state,data) {
    state.hit = data
  },
  setClear(state) {
    console.log('setClear-START')
    state.contents.type.length = 0
    state.contents.industry.length = 0
    state.contents.impression.length = 0
    state.contents.layout.length = 0
    state.contents.color.length = 0
    state.contents.pickup.length = 0
    state.contents.technique.length = 0
    state.contents.technology.length = 0

    state.contents.type.splice()
    state.contents.industry.splice()
    state.contents.impression.splice()
    state.contents.layout.splice()
    state.contents.color.splice()
    state.contents.pickup.splice()
    state.contents.technique.splice()
    state.contents.technology.splice()
    console.log('setClear-END')
  },
  setLocalStorage(state,key) {
    // 初回ロード時にセッションストレージからデータを取得
    state.contents.type = key[0]
    state.contents.industry = key[1]
    state.contents.impression = key[2]
    state.contents.layout = key[3]
    state.contents.color = key[4]
    state.contents.pickup = key[5]
    state.contents.technique = key[6]
    state.contents.technology = key[7]
    state.contents.condition = key[8]
    state.active = Boolean(key[9])
    state.hit = key[10]
  },
  updateLocalStorage(state) {
    // セッションストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const multipleSelect = [
        state.contents.type,
        state.contents.industry,
        state.contents.impression,
        state.contents.layout,
        state.contents.color,
        state.contents.pickup,
        state.contents.technique,
        state.contents.technology,
        state.contents.condition,
        Number(state.active),
        state.hit
      ]
      const multipleSelectJson = JSON.stringify(multipleSelect)
      sessionStorage.setItem('multipleSelect', multipleSelectJson)
    }
  },
 }

 export const actions = {
  pushType({commit},data) {
    commit('setType',data)
    commit('setActive')
    commit('updateLocalStorage')
  },
  pushIndustry({commit},data) {
    commit('setIndustry',data)
    commit('setActive')
    commit('updateLocalStorage')
  },
  pushImpression({commit},data) {
    commit('setImpression',data)
    commit('setActive')
    commit('updateLocalStorage')
  },
  pushLayout({commit},data) {
    commit('setLayout',data)
    commit('setActive')
    commit('updateLocalStorage')
  },
  pushColor({commit},data) {
    commit('setColor',data)
    commit('setActive')
    commit('updateLocalStorage')
  },
  pushPickup({commit},data) {
    commit('setPickup',data)
    commit('setActive')
    commit('updateLocalStorage')
  },
  pushTechnique({commit},data) {
    commit('setTechnique',data)
    commit('setActive')
    commit('updateLocalStorage')
  },
  pushTechnology({commit},data) {
    commit('setTechnology',data)
    commit('setActive')
    commit('updateLocalStorage')
  },
  pushCondition({commit},data) {
    commit('setCondition',data)
    commit('updateLocalStorage')
  },
  pushStart({commit}) {
    commit('setStart')
    commit('updateLocalStorage')
  },
  pushHit({commit},data) {
    commit('setHit',data)
    commit('updateLocalStorage')
  },
  pushClear({commit}) {
    commit('setClear')
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
  },
 }