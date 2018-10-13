var fs = require('fs');

const state = {
	lists: [],
	listsSelected: []
}
  
const mutations = {
	addList (state, fileObj){
		state.lists.push(fileObj);
	},

	clearLists(state){
		state.lists = [];
		state.listsSelected = [];
	},

	toggleListSelection(state, fileObj){
		var index = state.listsSelected.findIndex(list => list.name === fileObj.name);
		if (index < 0){
			state.listsSelected.push(fileObj)
		}else{
			state.listsSelected.splice(index, 1)
		}
	}
}
  
const getters = {
	lists: state => {
		return state.lists
	},

	list: (state) => (searchName) =>{
		return state.lists.find(list => list.name === searchName);
	},

	selectedList: state => {
		return state.listsSelected;
	},
}
  
export default {
	state,
	mutations,
	getters
}
  