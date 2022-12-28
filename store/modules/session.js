import {
	sessionList,
	createSession
} from '../../api/session.js'
import {
	getStorage,
	setStorage
} from '../../utils/storage.js'
import {
	timestampChange,
	getPointMsg
} from '../../utils/index.js'
const sessionModule = {
	state: () => ({
		sessionList: getStorage('sessionList') || [],
		recorderList: [],
		selectSession: {}
	}),
	mutations: {
		// 获取会话列表
		getSessionList(state, sessionList) {
			setStorage('sessionList', sessionList)
			state.sessionList = sessionList
		},
		// 获取聊天记录
		getRecorderList(state, list) {
			state.recorderList = list
		},
		// 发送和接收聊天记录
		changeChattingRecords(state, message) {
			console.log(123456, message)
			const selectSession = getApp().globalData.selectSession
			const userInfo = getApp().globalData.userInfo
			if (message.channel_type === 1) {
				// 接收消息
				if (
					message.user_id === selectSession.to_id &&
					message.to_id === selectSession.form_id
				) {
					state.recorderList.push(message)
				}
				// 发送消息
				if (
					message.user_id === userInfo.id &&
					message.to_id === selectSession.to_id
				) {
					state.recorderList.push(message)
				}
				// this.changeSessionPoint(message)
			}
			if (message.channel_type === 2) {
				// 接收用户加入消息
				if (message.user_id === selectSession.group_id && message.msg_type === 6) {
					state.recorderList.push(message)
				}
				// 发送消息
				if (message.to_id === selectSession.group_id) {
					state.recorderList.push(message)
				}
				// this.changeSessionPoint(message)
			}
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
		},
		// 改变会话提醒消息
		async changeSessionPoint({
			state,
			commit
		}, message) {
			const selectSession = getApp().globalData.selectSession
			const sessionList = JSON.parse(JSON.stringify(state.sessionList))
			if (message.channel_type === 1) {
				// 私聊
			} else {
				// 群聊
				const idx = sessionList.findIndex(item => {
					return item.group_id === message.to_id
				})
				console.log('群聊',idx,message)
				if (idx >= 0) {
					const time = new Date(message.time)
					// 判断是不是选中的会话
					if (sessionList[idx].id !== selectSession.id) {
						const isPoint = sessionList[idx].last_message ? sessionList[idx].last_message
							.isPoint : undefined
						const num = sessionList[idx].last_message ? sessionList[idx].last_message.num :
							undefined
						let number = 1
						if (isPoint && num) {
							number = num + 1
						}
						const lastMessage = {
							content: getPointMsg(message.msg_type, message.message),
							time: timestampChange(time, 'HH:mm'),
							isPoint: true,
							num: number,
						}
						sessionList[idx].last_message = lastMessage
						commit('getSessionList', sessionList)
						return
					}
					const lastMessage = {
						content: getPointMsg(message.msg_type, message.message),
						time: timestampChange(time, 'HH:mm'),
					}
					sessionList[idx].last_message = lastMessage
					commit('getSessionList', sessionList)
				} else {
					// 没有会话记录则创建会话
					const result = await createSession({
						id: message.form_id,
						type: 1,
					})
					const time = new Date(message.created_at)
					const session = Object.assign(result, {
						last_message: {
							content: getPointMsg(message.msg_type, message.msg),
							time: timestampChange(time, 'HH:mm'),
							isPoint: true,
							num: 1,
						},
					})
					sessionList.push(session)
					commit('getSessionList', sessionList)
				}
			}

		}
	},
	getters: {
		chatList: (state) => {
			const chatList = JSON.parse(JSON.stringify(state.recorderList))
			if (!chatList[0]) {
				return []
			}
			let timesStr = chatList[0].time
			let sendTime = new Date(timesStr).getTime()
			chatList.forEach((item, index) => {
				if (index === 0) {
					item.isShowTime = true
				}
				const timeMs = new Date(item.time).getTime()
				if (timeMs - sendTime > 120 * 1000) {
					item.isShowTime = true
				}
				sendTime = new Date(item.time).getTime()
			})
			return chatList
		}
	}
}
export default sessionModule
