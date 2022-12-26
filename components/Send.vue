<template>
	<view class="send">
		<view class="audio"><svg t="1672023089106" class="icon" viewBox="0 0 1024 1024" version="1.1"
				xmlns="http://www.w3.org/2000/svg" p-id="12289" width="200" height="200">
				<path d="M256 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#8a8a8a" p-id="12290"></path>
				<path
					d="M435.7 282.8a31.9 31.9 0 0 0 0 45.2 257.4 257.4 0 0 1 0 368 32 32 0 1 0 44.9 45.6 321.4 321.4 0 0 0 0-459.2 31.9 31.9 0 0 0-44.9 0.4z"
					fill="#8a8a8a" p-id="12291"></path>
				<path
					d="M660.9 105.2a32 32 0 0 0-44.9 45.6 505.2 505.2 0 0 1 0 722.4 32 32 0 1 0 44.9 45.6 569.1 569.1 0 0 0 0-813.6z"
					fill="#8a8a8a" p-id="12292"></path>
			</svg></view>
		<view class="message">
			<input class="msg-input" v-model="sendContent" />
		</view>
		<view class="right">
			<view class="small" v-if="!sendContent"><svg t="1672022899811" class="icon" viewBox="0 0 1024 1024"
					version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3512" width="200" height="200">
					<path
						d="M511.997953 527.956414M511.997953 527.956414M512 958.708971c-246.320035 0-446.708971-200.38996-446.708971-446.708971S265.679965 65.290005 512 65.290005 958.708971 265.679965 958.708971 512 758.319012 958.708971 512 958.708971zM512 97.198739c-228.729401 0-414.801261 186.080046-414.801261 414.801261S283.269575 926.801261 512 926.801261s414.801261-186.080046 414.801261-414.801261S740.729401 97.198739 512 97.198739zM655.583163 384.371204A23.386 46.772 0 1 1 655.583163 385.394511ZM679.516248 448.184579c-23.105231 0-39.884382-26.836205-39.884382-63.815421s16.779152-63.815421 39.884382-63.815421c23.105231 0 39.884382 26.836205 39.884382 63.815421S702.620455 448.184579 679.516248 448.184579zM679.516248 353.395726c-3.100618 3.64604-7.976672 14.427594-7.976672 30.973432s4.877077 27.327392 7.976672 30.973432c3.100618-3.64604 7.976672-14.426571 7.976672-30.973432S682.615842 357.041766 679.516248 353.395726zM320.550667 384.371204A23.386 46.772 0 1 1 320.550667 385.394511ZM344.483752 448.184579c-23.105231 0-39.884382-26.836205-39.884382-63.815421s16.779152-63.815421 39.884382-63.815421 39.884382 26.836205 39.884382 63.815421S367.588983 448.184579 344.483752 448.184579zM344.483752 353.395726c-3.100618 3.64604-7.976672 14.427594-7.976672 30.973432s4.876054 27.327392 7.976672 30.973432c3.100618-3.64604 7.976672-14.426571 7.976672-30.973432S347.58437 357.041766 344.483752 353.395726zM783.214005 567.841819c0 127.760802-121.42756 231.331669-271.216052 231.331669S240.781902 695.602621 240.781902 567.841819M512 815.123762c-158.339238 0-287.170418-110.929462-287.170418-247.286036 0-8.810666 7.135514-15.954367 15.954367-15.954367s15.954367 7.143701 15.954367 15.954367c0 118.758778 114.51308 215.377302 255.262708 215.377302s255.262708-96.619548 255.262708-215.377302c0-8.810666 7.135514-15.954367 15.954367-15.954367s15.954367 7.143701 15.954367 15.954367C799.170418 704.1943 670.339238 815.123762 512 815.123762zM240.782925 551.884382l542.433126 0 0 31.907711-542.433126 0 0-31.907711Z"
						fill="#8a8a8a" p-id="3513"></path>
				</svg></view>
			<view class="add" v-if="!sendContent"><svg t="1672022989071" class="icon" viewBox="0 0 1024 1024"
					version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4561" width="200" height="200">
					<path
						d="M923.86 338c-22.52-53.23-54.74-101.03-95.78-142.07-41.04-41.04-88.84-73.27-142.08-95.78C630.87 76.82 572.33 65 512 65s-118.87 11.82-174 35.14c-53.23 22.52-101.03 54.74-142.07 95.78-41.04 41.04-73.27 88.84-95.78 142.07C76.82 393.13 65 451.67 65 512c0 60.33 11.82 118.87 35.14 174 22.52 53.23 54.74 101.03 95.78 142.08 41.04 41.04 88.84 73.27 142.07 95.78C393.13 947.18 451.67 959 512 959c60.33 0 118.87-11.82 174-35.14 53.23-22.52 101.03-54.74 142.08-95.78 41.04-41.04 73.27-88.84 95.78-142.08C947.18 630.87 959 572.33 959 512s-11.82-118.87-35.14-174zM512 895c-211.19 0-383-171.81-383-383s171.81-383 383-383 383 171.81 383 383-171.81 383-383 383z"
						p-id="4562" fill="#8a8a8a"></path>
					<path
						d="M680 480H544V344c0-17.67-14.33-32-32-32s-32 14.33-32 32v136H344c-17.67 0-32 14.33-32 32s14.33 32 32 32h136v136c0 17.67 14.33 32 32 32s32-14.33 32-32V544h136c17.67 0 32-14.33 32-32s-14.33-32-32-32z"
						p-id="4563" fill="#8a8a8a"></path>
				</svg></view>
			<view class="btn" v-if="sendContent" @click="sendClick(1)">发送</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import {
		sendChatMessage
	} from '../api/chat.js'
	export default {
		name: "Send",
		data() {
			return {
				sendContent: '',
				chatInfo: {}
			};
		},
		onLoad(option) {
			this.chatInfo = option
		},
		methods: {
			sendClick(msgType, message) {
				const userInfo = uni.getStorageSync('userInfo')
				delete userInfo.token
				const selectSession = app.globalData.selectSession
				if (!this.sendContent && msgType === 1) {
					return
				}
				const time = new Date()
				sendChatMessage({
					msg_client_id: time.getTime(),
					msg_type: msgType,
					to_id: selectSession.channel_type === 1 ?
						selectSession.to_id : selectSession.group_id || -1,
					channel_type: selectSession.channel_type || 1,
					message: (msgType === 1 ? this.sendContent : message) || '',
					data: selectSession.channel_type === 1 ?
						'' : JSON.stringify(userInfo),
				}).then((res) => {
					if (!selectSession) {
						return
					}
					if (selectSession.channel_type === 2) {
						this.sendContent = ''
						return
					}
					// 聊天记录
					const Users = {
						avatar: selectSession.Users.avatar || '',
						email: selectSession.Users.email || '',
						id: selectSession.Users.id || -1,
						name: selectSession.Users.name || '',
					}
					const chatMsg = {
						Users: Users,
						channel_type: selectSession.channel_type,
						created_at: res.send_time,
						data: res.data,
						form_id: res.form_id,
						id: time.getTime() + 1,
						is_read: 0,
						msg: res.message,
						msg_type: res.msg_type,
						to_id: res.to_id,
						status: 1,
					}
					// const result = store.changeChattingRecords(chatMsg)
					// result.then(() => {
					// 	onScrollMsg()
					// })
					sendContent.value = ''
				})
			}
		}
	}
</script>

<style lang="less">
	.send {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #f5f5f5;
		box-sizing: border-box;
		padding: 0 20rpx;

		.audio {
			width: 60rpx;
			height: 60rpx;
			border: 3rpx solid #222;
			border-radius: 50%;
			padding: 6rpx;
			box-sizing: border-box;

			svg {
				width: 100%;
				height: 100%;

				path {
					fill: #222;
				}
			}
		}

		.message {
			flex: 1;
			background-color: #fff;
			height: 75rpx;
			margin: 0 20rpx;

			input {
				display: block;
				width: 100%;
				height: 100%;
				padding: 0 20rpx;
				box-sizing: border-box;
			}
		}

		.right {
			width: 130rpx;
			overflow: hidden;
			display: flex;
			justify-content: space-between;

			.small,
			.add {
				width: 60rpx;
				height: 60rpx;
				box-sizing: border-box;

				svg {
					width: 100%;
					height: 100%;

					path {
						fill: #222;
					}
				}
			}

			.btn {
				width: 120rpx;
				height: 60rpx;
				font-size: 28rpx;
				text-align: center;
				line-height: 60rpx;
				background-color: #4cacff;
				color: #fff;
			}
		}
	}
</style>
