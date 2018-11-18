// initial state
// shape: [{ id, quantity }]
const state = {
  leftNav:[],
  rightNav:[],
  centerNav: [],
}

// getters
const getters = {
  leftNav: state => state.leftNav,
  rightNav: state => state.rightNav,
  centerNav: state => state.centerNav
}

// actions
const actions = {
	setNavigation (context, payload) {
		//context.commit('clearNav');
		context.commit('setNav', payload);
	},


	clearNavigation (context) {
		context.commit('clearNav')
	}
}

// mutations
const mutations = {

	clearNav(state){
		state.centerNav = state.rightNav = state.leftNav = [];
	},

	addNav(state, payload){
		if (navSide == "left"){
			state.leftNav.push(navItem)
		}

		if (navSide == "right"){
			state.rightNav.push(navItem)
		}
	},

	setNav(state, payload){
		if (payload.navSide == "left"){
			state.leftNav = payload.navArray;
		}

		if (payload.navSide == "right"){
			state.rightNav = payload.navArray;
		}
	}
}

export default {
  state,
  getters,
  actions,
  mutations
}