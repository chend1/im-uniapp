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
		// 删除会话
		removeSessionList(state, id){
			const list = JSON.parse(JSON.stringify(state.sessionList))
			const idx = list.findIndex(item => {
				return item.id === id
			})
			if(idx >=0 ){
				list.splice(idx, 1)
				setStorage('sessionList', list)
				state.sessionList = list
			}
		},
		// 添加会话
		addSessionList(state, session){
			state.selectSession = session
			state.sessionList.push(session)
			setStorage('sessionList', state.sessionList)
		},
		// 置顶、取消置顶会话
		changeSessionType(state, id){
			const list = JSON.parse(JSON.stringify(state.sessionList))
			list.forEach(item => {
				if(item.id === id){
					const status = item.top_status
					item.top_status = status == 1 ? 0 : 1
				}
			})
			state.sessionList = list
			setStorage('sessionList', list)
		},
		// 获取聊天记录
		getRecorderList(state, list) {
			state.recorderList = list
		},
		// 发送和接收聊天记录
		changeChattingRecords(state, message) {
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
			const userInfo = getApp().globalData.userInfo
			const sessionList = JSON.parse(JSON.stringify(state.sessionList))
			if (message.channel_type === 1) {
				// 私聊
				const idx = sessionList.findIndex((item) => {
					const res =
						item.to_id === message.to_id && item.form_id === userInfo.id
					return (
						res ||
						(item.to_id === message.user_id && item.form_id === message.to_id)
					)
				})
				const time = new Date(message.time)
				if(idx >= 0){
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
				} else{
					const result = await createSession({
						id: message.user_id,
						type: 1,
					})
					const time = new Date(message.created_at)
					const session = Object.assign(result.data, {
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
			} else {
				// 群聊
				const idx = sessionList.findIndex(item => {
					return item.group_id === message.to_id
				})
				const time = new Date(message.time)
				if (idx >= 0) {
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
					// const result = await createSession({
					// 	id: message.form_id,
					// 	type: 2,
					// })
					// const time = new Date(message.created_at)
					// const session = Object.assign(result.data, {
					// 	last_message: {
					// 		content: getPointMsg(message.msg_type, message.msg),
					// 		time: timestampChange(time, 'HH:mm'),
					// 		isPoint: true,
					// 		num: 1,
					// 	},
					// })
					// sessionList.push(session)
					// commit('getSessionList', sessionList)
				}
			}
		},
		// 添加会话
		async addSessionList({ state, commit }, userId){
			console.log(userId)
			const list = JSON.parse(JSON.stringify(state.sessionList))
			const session = list.filter(item => {
				return item.to_id == userId
			})
			if(session.length > 0){
				const app = getApp()
				app.globalData.selectSession = session[0]
				return
			} else {
				const result = await createSession({
					id: userId,
					type: 1,
				})
				const time = new Date()
				const newSession = Object.assign(result.data, {
					last_message: {
						content: '开始聊天',
						time: timestampChange(time, 'HH:mm'),
						isPoint: false,
						num: 1,
					},
				})
				const app = getApp()
				app.globalData.selectSession = newSession
				console.log(newSession,'ces')
				commit('addSessionList', newSession)
			}
		},
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
