import { friendList } from '../../api/user.js'
const addressModule = {
	state: () => ({
		addressList: []
	}),
	mutations: {
		getFriendList(state, list){
			state.addressList = list
		}
	},
	actions: {
		getFriendList({commit}){
			friendList().then(res => {
				console.log(res.data)
				commit('getFriendList', res.data)
			})
		}
	}
}
export default addressModule
