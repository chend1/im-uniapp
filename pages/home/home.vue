<template>
	<view class="home">
		<Head></Head>
		<view class="container">
			<view class="list">
				<view class="li" v-for="(item, index) in sessionList" :key="index"
					:class="{active: sessionInfo.id === item.id}" @click="sessionClick(item)">
					<view class="avatar">
						<img :src="item.avatar" alt="">
					</view>
					<view class="content">
						<view class="left">
							<view class="name">
								{{item.note || item.name}}
							</view>
							<view class="message">
								{{(item.last_message && item.last_message.content) || '开始聊天'}}
							</view>
						</view>
						<view class="right">
							<view class="time">
								{{(item.last_message && item.last_message.time) || '00:00' }}
							</view>
							<view class="point" v-if="item.last_message && item.last_message.isPoint">
								<view class="num">{{ item.last_message && item.last_message.num }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import Head from '../../components/Head.vue'
	import WebSocket from '../../utils/socket.js'
	import {
		sessionList
	} from '../../api/session.js'
	export default {
		components: {
			Head
		},
		data() {
			return {
				sessionList: [],
				sessionInfo: {}
			};
		},
		methods: {
			getSessionList() {
				sessionList().then(res => {
					console.log(res)
					this.sessionList = res.data
				})
			},
			sessionClick(session) {
				this.sessionInfo = session
				app.globalData.selectSession = session
				const id = session.channel_type === 2 ? session.group_id : session.to_id
				uni.navigateTo({
					url: `/pages/chat/chat?id=${id}&name=${session.name}&type=${session.channel_type || 1}`
				})
			}
		},
		onLoad() {
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
		onShow() {
			console.log(app.globalData.userInfo, app.globalData.socketObj)
			this.getSessionList()
		}
	}
</script>

<style lang="less">
	.container {
		width: 100%;
		height: calc(100vh - 220rpx);
		box-sizing: border-box;
		padding: 20rpx 0;
		overflow-y: auto;

		.list {
			.li {
				display: flex;
				margin: 10rpx 0;

				padding: 10rpx 30rpx;

				.avatar {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					overflow: hidden;
					background-color: azure;
					border: 2rpx solid #eee;

					img {
						width: 100%;
					}
				}

				.content {
					flex: 1;
					overflow: hidden;
					display: flex;
					justify-content: space-between;
					margin-left: 20rpx;

					.left {
						font-size: 28rpx;
						line-height: 44rpx;

						.name {
							color: #333;
						}

						.message {
							color: #666;
						}
					}

					.right {
						font-size: 24rpx;
						color: #666;
						line-height: 44rpx;
						text-align: right;

						.point {
							.num {
								display: inline-block;
								padding: 4rpx;
								width: 50rpx;
								height: 50rpx;
								background-color: #ff0000;
								text-align: center;
								border-radius: 50%;
								color: #fff;
								box-sizing: border-box;
								transform: scale(.8);
							}
						}
					}
				}
			}

			.active {
				background-color: aliceblue;
			}
		}
	}
</style>
