var convert = require('xml-js');
var fs = require('fs');

const state = {
	lists: [],
	listInfo: []
}
  
const mutations = {
	addFilePath (state, file) {
		state.lists.push( file )
	}
}
  
const getters = {
	lists: state => {
		return state.lists
	}
}
  
export default {
	state,
	mutations,
	getters
}
  