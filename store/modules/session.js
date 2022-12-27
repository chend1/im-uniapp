import {
	sessionList
} from '../../api/session.js'
import {
	getStorage,
	setStorage
} from '../../utils/storage.js'
import { timestampChange } from '../../utils/index.js'
const sessionModule = {
	state: () => ({
		sessionList: getStorage('sessionList') || []
	}),
	mutations: {
		getSessionList(state, sessionList) {
			setStorage('sessionList', sessionList)
			state.sessionList = sessionList
		}
	},
	actions: {
		getSessionList({
			commit,
			state
		}) {
			if (state.sessionList[0]) {
				return
			}
			sessionList().then(res => {
				const sessionList = res.data.map((item) => {
					const time = new Date()
					const option = {
						content: '开始聊天',
						time: timestampChange(time, 'HH:mm'),
					}
					item.last_message = option
					return item
				})
				commit('getSessionList', sessionList)
			})
		}
	}
}
export default sessionModule
