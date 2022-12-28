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
									<view class="image" v-if="item.msg_type === 3">图片或文件</view>
									<view class="file" v-if="item.msg_type === 4">文件</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="bottom" :id="'bottom'+chatList.length"></view> -->
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
				bottomId: ''
			};
		},
		async onShow() {
			const chatInfo = app.globalData.selectSession
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
				this.chatMessageList = res.data.list.map(item => {
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
				this.chatMessageList = res.data.list.map(item => {
					const message = {}
					message.id = item.Id
					message.msg_type = item.MsgType
					message.message = item.Message
					message.user_id = item.FormId
					// console.log()
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
			scrollTop() {
				console.log(123)
			},
			goBack() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		},
		computed: {
			chatList() {
				return this.$store.getters.chatList
			}
		},
		watch: {
			chatList(){
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
