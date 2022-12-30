<template>
	<view class="home">
		<Head></Head>
		<view class="container">
			<view class="list">
				<u-swipe-action>
					<view class="wrap" v-for="(item, index) in newSessionList" :key="index"
						:class="{active: sessionInfo.id === item.id, is_top: item.top_status == 1}">
						<u-swipe-action-item :options="item.optionsList" @click="optionClick" :name="item.id">
							<view class="li" @click="sessionClick(item)" :class="{active: sessionInfo.id === item.id, is_top: item.top_status == 1}">
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
						</u-swipe-action-item>
					</view>

				</u-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import Head from '../../components/Head.vue'
	import WebSocket from '../../utils/socket.js'
	import {
		removeSession
	} from '../../api/session.js'
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			Head
		},
		data() {
			return {
				sessionInfo: {}
			};
		},
		computed: {
			...mapState({
				sessionList: state => state.session.sessionList,
			}),
			newSessionList() {
				const topList = this.sessionList.filter(item => {
					return item.top_status == 1
				})
				const lastList = this.sessionList.filter(item => {
					return item.top_status == 0
				})
				const list = [...topList, ...lastList]
				return list.map(item => {
					const optionsList = [{
						text: item.top_status == 0 ? '置顶' : '取消置顶',
						style: {
							backgroundColor: '#3c9cff'
						}
					}, {
						text: '删除',
						style: {
							backgroundColor: '#f56c6c'
						}
					}]
					item.optionsList = optionsList
					return item
				})
			}
		},
		methods: {
			sessionClick(session) {
				this.sessionInfo = session
				app.globalData.selectSession = session
				uni.navigateTo({
					url: `/pages/chat/chat`
				})
			},
			receiptMessage(res) {
				const time = new Date()
				const message = JSON.parse((res.data))
				const userInfo = uni.getStorageSync('userInfo')
				const chatMsg = {
					info: message.channel_type == 2 ? JSON.parse(message.data) : userInfo,
					channel_type: message.channel_type,
					time: message.send_time,
					user_id: message.form_id,
					id: time.getTime() + 1,
					message: message.message,
					msg_type: message.msg_type,
					to_id: message.to_id,
				}
				this.$store.commit('changeChattingRecords', chatMsg)
				this.$store.dispatch('changeSessionPoint', chatMsg)
			},
			optionClick(val) {
				if (val.index == 1) {
					removeSession(val.name).then(res => {
						this.$store.commit('removeSessionList', val.name)
						console.log(res)
					})
				}
				if (val.index == 0) {
					this.$store.commit('changeSessionType', val.name)
				}
			}
		},
		mounted() {
			this.$store.dispatch('getSessionList')
		},
		onLoad() {
			// 监听事件  
			uni.$off('message', this.receiptMessage)
			uni.$on('message', this.receiptMessage)
		},
		onShow() {
			this.sessionInfo = {}
			app.globalData.selectSession = {}
		}
	}
</script>

<style lang="less">
	.container {
		width: 100%;
		height: calc(100vh - 220rpx);
		box-sizing: border-box;
		padding: 25rpx 0;
		overflow-y: auto;

		.list {
			.wrap {
				padding: 20rpx 0;
			}

			.li {
				display: flex;
				margin: 0rpx 0;

				padding: 0rpx 30rpx;

				.avatar {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					overflow: hidden;
					background-color: azure;
					border: 2rpx solid #eee;
					position: relative;

					img {
						width: 100%;
					}

					// .point{
					// 	width: 16rpx;
					// 	height: 16rpx;
					// 	border-radius: 50%;
					// 	background-color: #ff0000;
					// 	position: absolute;
					// 	top: 0;
					// 	left: 0;
					// }
				}

				.content {
					flex: 1;
					overflow: hidden;
					display: flex;
					justify-content: space-between;
					margin-left: 20rpx;
					overflow: hidden;

					.left {
						font-size: 28rpx;
						line-height: 44rpx;
						flex: 1;
						overflow: hidden;
						.name {
							color: #333;
						}

						.message {
							color: #666;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
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

			.is_top {
				background-color: #f7f7f7;
			}
		}

	}
</style>
