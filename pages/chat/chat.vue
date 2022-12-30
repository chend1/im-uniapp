<template>
	<view class="chat-wrap">
		<view class="head">
			<view class="left" @click="goBack">
				<u-icon name="arrow-left" color="#fff" size="20"></u-icon>
			</view>
			<view class="middle">
				{{chatInfo.name}}
			</view>
			<view class="right">
				<u-icon name="list-dot" color="#fff" size="20"></u-icon>
			</view>
		</view>
		<view class="chat">
			<scroll-view :scroll-top="scrollNum" scroll-y="true" class="scroll-Y" @scrolltoupper="scrollTop">
				<view class="chat-item" :class="{own: item.user_id == userInfo.id}" v-for="item in chatList"
					:key="item.id" :id="item.id">
					<view class="time" v-if="item.isShowTime">
						<view class="text">{{item.time}}</view>
					</view>
					<view class="invite" v-if="item.msg_type === 6">
						<view class="text">{{item.message}}</view>
					</view>
					<view class="item" v-if="item.msg_type !== 6">
						<view class="img">
							<img :src="item.info.avatar" alt="" v-if="item.user_id != userInfo.id">
							<img :src="userInfo.avatar" alt="" v-if="item.user_id == userInfo.id">
						</view>
						<view class="content">
							<view class="left">
								<view class="name" v-if="chatInfo.channel_type == 2">{{item.info.name}}</view>
								<view class="msg">
									<view class="wrap" v-if="item.msg_type === 1">{{item.message}}</view>
									<view class="audio" v-if="item.msg_type === 2">
										{{item.message}}
										<!-- <audio :src="item.message" :controls="true" :action="audioAction"></audio> -->
									</view>
									<view class="image"
										v-if="item.msg_type === 3 && getFileType(item.message)[0] === 'image'">
										<img :src="item.message" alt="">
									</view>
									<view class="file" v-if="item.msg_type === 4">
										<view class="file-name">
											{{getFileName(item.message)}}
										</view>
										<view class="icon">
											<view class="icon-l">图标</view>
											<view class="icon-r">
												{{getFileType(item.message)[1]}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</view>
			</scroll-view>
		</view>
		<view class="send-wrap">
			<Send></Send>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import {
		chatMessage,
		chatGroupMessage
	} from '../../api/chat.js'
	import {
		timestampChange
	} from '../../utils/index.js'
	import Send from '../../components/Send.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			Send
		},
		data() {
			return {
				chatInfo: {},
				chatMessageList: [],
				type: 1,
				userInfo: {},
				audioAction: {
					method: 'pause'
				},
				scrollNum: 999999,
				bottomId: '',
				pagingInfo: {
					size: 20,
					total: 0,
					page: 1
				},
				isMore: false
			};
		},
		async onShow() {
			const chatInfo = app.globalData.selectSession
			console.log(123, chatInfo)
			this.chatInfo = chatInfo
			console.log(chatInfo)
			this.userInfo = uni.getStorageSync('userInfo')
			const id = chatInfo.channel_type === 2 ? chatInfo.group_id : chatInfo.to_id
			const data = {
				page: '',
				pageSize: 20,
				to_id: id,
			}
			if (chatInfo.channel_type == 1) {
				// 私聊
				const res = await chatMessage(data)
				console.log(res)
				this.pagingInfo.page = 1
				this.pagingInfo.size = res.data.mate.pageSize
				this.pagingInfo.total = res.data.mate.total
				const list = Array.isArray(res.data.list) ? res.data.list : []
				this.chatMessageList = list.map(item => {
					const message = {}
					message.id = item.id
					message.msg_type = item.msg_type
					message.message = item.msg
					message.user_id = item.form_id
					message.time = item.created_at
					message.info = item.Users
					return message
				})
				setTimeout(() => {
					this.scrollNum++
				}, 100)
				this.$store.commit('getRecorderList', this.chatMessageList)
			} else {
				// 群聊
				const res = await chatGroupMessage(data)
				this.pagingInfo.page = 1
				this.pagingInfo.size = res.data.mate.pageSize
				this.pagingInfo.total = res.data.mate.total
				const list = Array.isArray(res.data.list) ? res.data.list : []
				this.chatMessageList = list.map(item => {
					const message = {}
					message.id = item.Id
					message.msg_type = item.MsgType
					message.message = item.Message
					message.user_id = item.FormId
					const time = new Date(item.SendTime * 1000)
					message.time = timestampChange(time)
					message.info = JSON.parse(item.Data)
					return message
				})
				setTimeout(() => {
					this.scrollNum++
				}, 100)
				this.$store.commit('getRecorderList', this.chatMessageList)
			}
		},
		methods: {
			async scrollTop() {
				console.log(this.pagingInfo)
				if (this.pagingInfo.page * this.pagingInfo.size >= this.pagingInfo.total) {
					return
				}
				const chatId = this.chatMessageList[0].id
				this.isMore = true
				if (this.chatInfo.channel_type == 1) {
					const res = await chatMessage({
						page: chatId,
						pageSize: 20,
						to_id: this.chatInfo.to_id,
					})
					let list = []
					if (Array.isArray(res.data.list)) {
						list = res.data.list
					}
					const chatMsgList = list.map(item => {
						const message = {}
						message.id = item.id
						message.msg_type = item.msg_type
						message.message = item.msg
						message.user_id = item.form_id
						message.time = item.created_at
						message.info = item.Users
						return message
					})
					this.chatMessageList = [...chatMsgList, ...this.chatMessageList]
					this.pagingInfo.page++
					this.$store.commit('getRecorderList', this.chatMessageList)
				} else {
					const res = await chatGroupMessage({
						page: chatId,
						pageSize: 20,
						to_id: this.chatInfo.group_id,
					})
					let list = []
					if (Array.isArray(res.data.list)) {
						list = res.data.list
					}
					const chatMsgList = list.map(item => {
						const message = {}
						message.id = item.Id
						message.msg_type = item.MsgType
						message.message = item.Message
						message.user_id = item.FormId
						const time = new Date(item.SendTime * 1000)
						message.time = timestampChange(time)
						message.info = JSON.parse(item.Data)
						return message
					})
					this.chatMessageList = [...chatMsgList, ...this.chatMessageList]
					this.pagingInfo.page++
					this.$store.commit('getRecorderList', this.chatMessageList)
				}
			},
			goBack() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			getFileType(url) {
				const type = url.substring(url.lastIndexOf('.') + 1)
				const imgType = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'apng', 'webp']
				if (imgType.indexOf(type) !== -1) {
					// 图片
					return ['image', type]
				} else {
					// 其他文件
					return ['other', type]
				}
			},
			getFileName(url) {
				return url.substring(url.lastIndexOf('/') + 1)
			}
		},
		computed: {
			chatList() {
				return this.$store.getters.chatList
			}
		},
		watch: {
			chatList() {
				if (this.isMore) {
					this.isMore = false
					return
				}
				setTimeout(() => {
					this.scrollNum += 1000
				}, 60)
			}
		}
	}
</script>

<style lang="less">
	.chat-wrap {
		width: 100%;
		height: 100vh;
		background-color: #fff;

		.head {
			width: 100%;
			height: 70rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #4cacff;
			box-sizing: border-box;
			padding: 0 20rpx;
			color: #fff;
		}

		.chat {
			height: calc(100% - 70rpx - 100rpx);
			width: 100%;
			box-sizing: border-box;
			padding: 0 20rpx;

			.scroll-Y {
				height: 100%;
				box-sizing: border-box;
				padding: 20rpx 0 0;
			}

			.chat-item {
				width: 100%;
				padding-bottom: 30rpx;

				.time,
				.invite {
					width: 100%;
					font-size: 24rpx;
					text-align: center;
					margin: 30rpx 0 10rpx;
					border-radius: 8rpx;

					.text {
						display: inline-block;
						padding: 10rpx 20rpx;
						background-color: #f6fbff;
						color: #999;
					}
				}

				.item {
					width: 100%;
					display: flex;
				}

				.img {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					overflow: hidden;
					background-color: aliceblue;

					img {
						width: 100%;
					}
				}

				.content {
					flex: 1;
					display: flex;
					justify-content: space-between;
					margin-left: 20rpx;
					overflow: hidden;

					.left {
						width: 80%;
						font-size: 28rpx;

						.name {
							color: #666;
							margin-top: -10rpx;
						}

						.msg {
							color: #222;
							margin-top: 10rpx;

							.wrap {
								display: inline-block;
								padding: 12rpx 20rpx;
								background-color: aliceblue;
								border-radius: 6rpx;
								line-height: 50rpx;
								// overflow-wrap: break-word; 
								overflow-wrap: anywhere;
								text-align: left;
							}

							.audio {
								width: 300rpx;

								audio {
									width: 100%;
								}
							}

							.image {
								width: 100%;

								img {
									max-width: 100%;
									max-height: 100%;
								}
							}
						}
					}
				}
			}

			.own {
				.item {
					flex-direction: row-reverse;
				}

				.content {
					flex-direction: row-reverse;
					margin-right: 20rpx;

					.left {
						text-align: right;
					}
				}
			}
		}

		.send-wrap {
			width: 100%;
			height: 100rpx;
		}
	}

	.bottom {
		width: 100%;
		height: 1px;
	}
</style>
