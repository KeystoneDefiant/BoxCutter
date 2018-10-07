const state = {
  filePath: {}
}

const mutations = {
  setFilePath (state, path) {
    state.filePath = path
  }
}

const getters= {
    filePath: state => {
      return state.filePath.path
    }
  }

export default {
  state,
  mutations,
  getters
}
