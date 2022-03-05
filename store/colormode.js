// 現在未使用
export const state = () => ({
  color1: true,         // ローカルストレージ保存対象
  color2: true,        // ローカルストレージ保存対象
  color3: true,        // ローカルストレージ保存対象
  color4: true,        // ローカルストレージ保存対象
  color5: true,        // ローカルストレージ保存対象
  color6: true,        // ローカルストレージ保存対象
  color7: true,         // ローカルストレージ保存対象
  color8: true,        // ローカルストレージ保存対象
  color9: true,        // ローカルストレージ保存対象
  color10: false,        // ローカルストレージ保存対象
  color11: true,        // ローカルストレージ保存対象
  color12: true,        // ローカルストレージ保存対象
  random: true,
  empty: false,
})

export const getters = {
  getColor1: state => {
    return state.color1
  },
  getColor2: state => {
    return state.color2
  },
  getColor3: state => {
    return state.color3
  },
  getColor4: state => {
    return state.color4
  },
  getColor5: state => {
    return state.color5
  },
  getColor6: state => {
    return state.color6
  },
  getColor7: state => {
    return state.color7
  },
  getColor8: state => {
    return state.color8
  },
  getColor9: state => {
    return state.color9
  },
  getColor10: state => {
    return state.color10
  },
  getColor11: state => {
    return state.color11
  },
  getColor12: state => {
    return state.color12
  },
  getRandom: state => {
    return state.random
  },
  getColormode: state => {
    if(state.random) {
      let colors = []
      if(state.empty) {
        colors = [
          'color1',
          'color2',
          'color3',
          'color4',
          'color5',
          'color6',
          'color7',
          'color8',
          'color9',
          'color10',
          'color11',
          'color12',
        ]
      }else {
        if(state.color1) colors.push('color1')
        if(state.color2) colors.push('color2')
        if(state.color3) colors.push('color3')
        if(state.color4) colors.push('color4')
        if(state.color5) colors.push('color5')
        if(state.color6) colors.push('color6')
        if(state.color7) colors.push('color7')
        if(state.color8) colors.push('color8')
        if(state.color9) colors.push('color9')
        if(state.color10) colors.push('color10')
        if(state.color11) colors.push('color11')
        if(state.color12) colors.push('color12')
      }
      const max = colors.length
      const random = Math.floor(Math.random() * max);

      if(random === 0) {
        return colors[0]
      }else if(random === 1) {
        return colors[1]
      }else if(random === 2) {
        return colors[2]
      }else if(random === 3) {
        return colors[3]
      }else if(random === 4) {
        return colors[4]
      }else if(random === 5) {
        return colors[5]
      }else if(random === 6) {
        return colors[6]
      }else if(random === 7) {
        return colors[7]
      }else if(random === 8) {
        return colors[8]
      }else if(random === 9) {
        return colors[9]
      }else if(random === 10) {
        return colors[10]
      }else if(random === 11) {
        return colors[11]
      }
    }else if(state.color1) {
      return 'color1'
    }else if(state.color2) {
      return 'color2'
    }else if(state.color3) {
      return 'color3'
    }else if(state.color4) {
      return 'color4'
    }else if(state.color5) {
      return 'color5'
    }else if(state.color6) {
      return 'color6'
    }else if(state.color7) {
      return 'color7'
    }else if(state.color8) {
      return 'color8'
    }else if(state.color9) {
      return 'color9'
    }else if(state.color10) {
      return 'color10'
    }else if(state.color11) {
      return 'color11'
    }else if(state.color12) {
      return 'color12'
    }else {
      // 通らないはず
      return ''
    }
  },
 }

export const mutations = {
  setColor1(state) {
    state.color1 = !state.color1
  },
  setColor2(state) {
    state.color2 = !state.color2
  },
  setColor3(state) {
    state.color3 = !state.color3
  },
  setColor4(state) {
    state.color4 = !state.color4
  },
  setColor5(state) {
    state.color5 = !state.color5
  },
  setColor6(state) {
    state.color6 = !state.color6
  },
  setColor7(state) {
    state.color7 = !state.color7
  },
  setColor8(state) {
    state.color8 = !state.color8
  },
  setColor9(state) {
    state.color9 = !state.color9
  },
  setColor10(state) {
    state.color10 = !state.color10
  },
  setColor11(state) {
    state.color11 = !state.color11
  },
  setColor12(state) {
    state.color12 = !state.color12
  },
  setRandom(state) {
    let count = 0;
    if(state.color1) count++;
    if(state.color2) count++;
    if(state.color3) count++;
    if(state.color4) count++;
    if(state.color5) count++;
    if(state.color6) count++;
    if(state.color7) count++;
    if(state.color8) count++;
    if(state.color9) count++;
    if(state.color10) count++;
    if(state.color11) count++;
    if(state.color12) count++;
    if(count >= 2) {
      state.random = true;
      state.empty = false;
    }else if(count === 0) {
      state.random = true;
      state.empty = true;
    }else {
      state.random = false;
      state.empty = false;
    }
  },

  setLocalStorage(state,key) {
    // 初回ロード時にローカルストレージからデータを取得
    state.color1 = Boolean(key[0])
    state.color2 = Boolean(key[1])
    state.color3 = Boolean(key[2])
    state.color4 = Boolean(key[3])
    state.color5 = Boolean(key[4])
    state.color6 = Boolean(key[5])
    state.color7 = Boolean(key[6])
    state.color8 = Boolean(key[7])
    state.color9 = Boolean(key[8])
    state.color10 = Boolean(key[9])
    state.color11 = Boolean(key[10])
    state.color12 = Boolean(key[11])
  },
  updateLocalStorage(state) {
    // ローカルストレージ更新
    if (this.$storageAvailable('localStorage')) {
      const colormode = [
        Number(state.color1),
        Number(state.color2),
        Number(state.color3),
        Number(state.color4),
        Number(state.color5),
        Number(state.color6),
        Number(state.color7),
        Number(state.color8),
        Number(state.color9),
        Number(state.color10),
        Number(state.color11),
        Number(state.color12),
      ]
      const colormodeJson = JSON.stringify(colormode)
      localStorage.setItem('colormode', colormodeJson)
    }
  },
 }

export const actions = {
  pushColor1({commit}) {
    commit('setColor1')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor2({commit}) {
    commit('setColor2')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor3({commit}) {
    commit('setColor3')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor4({commit}) {
    commit('setColor4')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor5({commit}) {
    commit('setColor5')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor6({commit}) {
    commit('setColor6')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor7({commit}) {
    commit('setColor7')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor8({commit}) {
    commit('setColor8')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor9({commit}) {
    commit('setColor9')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor10({commit}) {
    commit('setColor10')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor11({commit}) {
    commit('setColor11')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushColor12({commit}) {
    commit('setColor12')
    commit('setRandom')
    commit('updateLocalStorage')
  },
  pushLocalStorage({commit},data) {
    commit('setLocalStorage',data)
    commit('setRandom')
  },
}
