export const state = () => ({
  min: 0.25,
  max: 1,
  step: 0.075,
  value: 0.625,
  myValue: 0,               // ローカルストレージ保存対象
  autoSizing: true,    // ローカルストレージ保存対象
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
  getStepData: state => {
    return state.stepData
  },
  getSteps: state => {
    return state.steps
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
  /* setValue(state,inputData) {
    console.log('setValue')
    state.value = inputData
  }, */
  setMyValue(state,inputData) {
    state.myValue = Number(inputData)
    if(state.autoSizing) {
      state.autoSizing = !state.autoSizing
    }
  },
  setAptitudeValue(state,inputData) {
    if(state.autoSizing) {
      state.value = inputData
    }
    /* state.aptitudeValue = inputData */
  },
  setAutoSizing(state) {
    state.autoSizing = !state.autoSizing
    if(!state.autoSizing) {
      state.myValue = state.value
    }
  },
  setStepData(state) {
    for(let i=Number(state.min)*1000, count=0; i <= Number(state.max)*1000; i=i+Number(state.step)*1000,count++) {
      /* state.stepData[count] = String(i/1000) */
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
  setLocalStorage(state,key) {
    // 初回ロード時にローカルストレージからデータを取得
    state.myValue = key[0]
    state.autoSizing = Boolean(key[1])
    /* console.log('ローカルストレージからデータを取得-slider')
    console.log(key) */
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (window.localStorage) {
      /* console.log('ローカルストレージに保存-slider') */
      const slider = [ state.myValue, Number(state.autoSizing) ]
      const sliderJson = JSON.stringify(slider)
      /* console.log(sliderJson) */
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
    commit('setStepData')
    commit('setSteps')
  },
  pushAptitudeValue({commit},data) {
    commit('setAptitudeValue',data)
    commit('setSteps')
    commit('updateLocalStorage')
  },
  pushCheckbox({commit}) {
    commit('setAutoSizing')
    commit('setSteps')
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
    commit('setStepData')
    commit('setSteps')
  },
 }