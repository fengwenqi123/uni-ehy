const certificate = {
	state: {
		certificateInfo: null
	},

	mutations: {
		SET_certificateInfo: (state, obj) => {
			state.certificateInfo = obj
		}
	}
}

export default certificate
