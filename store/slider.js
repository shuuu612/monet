export const state = () => ({
  min: 0.25,
  max: 1,
  step: 0.075,
  value: 0,
  myValue: 0,               // ローカルストレージ保存対象
  autoSizing: true,         // ローカルストレージ保存対象
  maxValue: 0,
  overFlag: false,
  stepData: [],
  steps: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  decidedSteps: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
})

export const getters = {
  getValue: state => {
    if(state.autoSizing) {
      return state.value
    }else {
      return state.myValue
    }
  },
  getAutoSizing: state => {
    return state.autoSizing
  },
  getOverFlag: state => {
    return state.overFlag
  },
  getStepData: state => {
    return state.stepData
  },
  getSteps: state => {
    return state.steps
  },
  getDecidedSteps: state => {
    return state.decidedSteps
  },
  getMaxValue: state => {
    return state.maxValue
  },
  getMaxSteps: state => {
    return ((state.maxValue*1000 - 0.25*1000) / (0.075*1000)) + 1
  },
 }

export const mutations = {
  setMin(state,inputData) {
    state.min = inputData
  },
  setMax(state,inputData) {
    state.max = inputData
  },
  setStep(state,inputData) {
    state.step = inputData
  },
  setMyValue(state,inputData) {
    if(state.maxValue >= Number(inputData)) {
      state.myValue = Number(inputData)
      state.overFlag = false
    }else {
      state.overFlag = true
    }
    
    if(state.autoSizing) {
      state.autoSizing = !state.autoSizing
    }
  },
  setAptitudeValue(state,inputData) {
    if(state.autoSizing) {
      state.value = inputData
      state.overFlag = false
    }
  },
  setMaxValue(state,inputData) {
    state.maxValue = inputData
  },
  setAutoSizing(state) {
    state.autoSizing = !state.autoSizing
    if(!state.autoSizing) {
      state.myValue = state.value
    }
  },
  setStepData(state) {
    for(let i=Number(state.min)*1000, count=0; i <= Number(state.max)*1000; i=i+Number(state.step)*1000,count++) {
      state.stepData[count] = i/1000
    }
  },
  setSteps(state) {
    let Value
    if(state.autoSizing) {
      Value = state.value
    }else {
      Value = state.myValue
    }

    if(Value === state.stepData[0]) {
      state.steps = [true,false,false,false,false,false,false,false,false,false,false,]
    }else if(Value === state.stepData[1]) {
      state.steps = [false,true,false,false,false,false,false,false,false,false,false,]
    }else if(Value === state.stepData[2]) {
      state.steps = [false,false,true,false,false,false,false,false,false,false,false,]
    }else if(Value === state.stepData[3]) {
      state.steps = [false,false,false,true,false,false,false,false,false,false,false,]
    }else if(Value === state.stepData[4]) {
      state.steps = [false,false,false,false,true,false,false,false,false,false,false,]
    }else if(Value === state.stepData[5]) {
      state.steps = [false,false,false,false,false,true,false,false,false,false,false,]
    }else if(Value === state.stepData[6]) {
      state.steps = [false,false,false,false,false,false,true,false,false,false,false,]
    }else if(Value === state.stepData[7]) {
      state.steps = [false,false,false,false,false,false,false,true,false,false,false,]
    }else if(Value === state.stepData[8]) {
      state.steps = [false,false,false,false,false,false,false,false,true,false,false,]
    }else if(Value === state.stepData[9]) {
      state.steps = [false,false,false,false,false,false,false,false,false,true,false,]
    }else if(Value === state.stepData[10]) {
      state.steps = [false,false,false,false,false,false,false,false,false,false,true,]
    }
  },
  setDecidedSteps(state) {
    state.decidedSteps = state.steps
  },
  setLocalStorage(state,key) {
    // 初回ロード時にローカルストレージからデータを取得
    state.myValue = key[0]
    state.autoSizing = Boolean(key[1])
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const slider = [ state.myValue, Number(state.autoSizing) ]
      const sliderJson = JSON.stringify(slider)
      localStorage.setItem('slider', sliderJson)
    }
  },
 }

 export const actions = {
  pushSlider({commit},data) {
    commit('setMyValue',data)
    commit('setSteps')
    commit('updateLocalStorage')
  },
  pushSliderInitial({commit},data) {
    commit('setMin',data.min)
    commit('setMax',data.max)
    commit('setStep',data.step)
    commit('setDecidedSteps')
    commit('setStepData')
    commit('setSteps')
  },
  pushAptitudeValue({commit},data) {
    commit('setAptitudeValue',data)
    commit('setSteps')
    commit('setDecidedSteps')
    commit('updateLocalStorage')
  },
  pushMaxValue({commit},data) {
    commit('setMaxValue',data)
  },
  pushAutoSizing({commit}) {
    commit('setAutoSizing')
    commit('setSteps')
    commit('setDecidedSteps')
    commit('updateLocalStorage')
  },
  pushDecidedSteps({commit}) {
    commit('setDecidedSteps')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
    commit('setStepData')
    commit('setSteps')
    commit('setDecidedSteps')
  },
 }