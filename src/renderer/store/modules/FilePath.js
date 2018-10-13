const state = {
  filePath: {},
  exportPath: {}
}

const mutations = {
  setFilePath (state, path) {
    state.filePath = path
  },
  setExportPath (state, path) {
    state.exportPath = path
  }
}

const getters= {
    filePath: state => {
      return state.filePath.path
	},
	
	exportPath: state => {
		return state.filePath.path
	  }
}

export default {
  state,
  mutations,
  getters
}
