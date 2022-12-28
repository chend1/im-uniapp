<script>
	import {
		getStorage
	} from './utils/storage.js'
	import WebSocket from './utils/socket.js'
	export default {
		globalData: {
			socketObj: {},
			userInfo: getStorage('userInfo') || {},
			selectSession: {},
			selectUser: {}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			const app = getApp()
			if (app.globalData.userInfo.token) {
				if (app.globalData.socketObj.initSocket) {
					// 如果sockt实例未连接
					if (!app.globalData.socketObj.isConnect) {
						app.globalData.socketObj.initSocket()
					}
				} else {
					const path = `wss://im.pltrue.top/im/connect?token=${app.globalData.userInfo.token}`
					app.globalData.socketObj = new WebSocket(path, 10)
					app.globalData.socketObj.initSocket()
				}
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
