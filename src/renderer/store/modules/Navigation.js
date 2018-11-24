// initial state
// shape: [{ id, quantity }]
const state = {
  leftNav:[],
  rightNav:[],
  centerNav: [],
  header:""
}

// getters
const getters = {
  leftNav: state => state.leftNav,
  rightNav: state => state.rightNav,
  centerNav: state => state.centerNav,
  header: state => state.header,
}

// actions
const actions = {
	setNavigation (context, payload) {
		context.commit('clearNav');
		context.commit('setNav', payload);
	},

	clearNavigation (context) {
		context.commit('clearNav')
	},

	setHeader (context, newHeader){
		context.commit('header', newHeader)
	}
}

// mutations
const mutations = {

	clearNav(state){
		state.centerNav = state.rightNav = state.leftNav = [];
	},

	setNav(state, payload){
		state.leftNav = payload.left;
		state.rightNav = payload.right;
	},

	header(state, newHeader){
		state.header = newHeader;
	}
}

export default {
  state,
  getters,
  actions,
  mutations
}