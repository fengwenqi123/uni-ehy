const user = {
	state: {
		userInfo: null
	},

	mutations: {
		SET_userInfo: (state, obj) => {
			state.userInfo = obj
		}
	}
}

export default user
