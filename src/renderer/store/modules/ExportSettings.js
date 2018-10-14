const state = {
  filePath: {},
  exportPath: {},
  exportDirName: "BoxCutter",
  exportStructure: "",
  exportPreferredRegion: "",
  exportImages: false,
  exportVideos: false,
  exportMetadata: true,
  exportMetadataFilename: "gameinfo.xml",
  exportBIOS: true
}

const mutations = {
	setFilePath (state, path) {
		state.filePath = path
	},

	setExportPath (state, path) {
		state.exportPath = path
	},

	setExportStructure (state, type) {
		state.exportStructure = type
	},

	setExportPreferredRegion (state, type) {
		state.exportPreferredRegion = type
	},

	setExportImages (state, bool) {
		state.exportImages = bool
	},

	setExportVideos (state, bool) {
		state.exportVideos = bool
	},

	setExportMetadata (state, bool) {
		state.exportMetadata = bool
	},

	setExportMetadataFilename (state, filename) {
		state.exportMetadataFilename = filename
	},

	setExportBIOS (state, bool) {
		state.exportBIOS = bool
	},
}

const getters = {
    filePath: state => {
      return state.filePath.path
	},
	
	exportPath: state => {
		return state.exportPath.path
	},

	exportDirName: state => {
		return state.exportDirName
	},
	
	exportStructure: state => {
		return state.exportStructure
	},
	
	exportPreferredRegion: state => {
		return state.exportPreferredRegion
	},

	exportImages: state => {
		return state.exportImages
	},
	
	exportVideos: state => {
		return state.exportVideos
	},
	
	exportMetadata: state => {
		return state.exportMetadata
	},

	exportMetadataFilename: state => {
		return state.exportMetadataFilename
	},
	
	exportBIOS: state => {
		return state.exportBIOS
	},

	

}

export default {
  state,
  mutations,
  getters
}
