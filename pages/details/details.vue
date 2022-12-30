<template>
	<view class="user-details">
		<view class="head">
			<view class="left" @click="goBack">
				<u-icon name="arrow-left" color="#333" size="20"></u-icon>
			</view>
			<view class="middle">
				<!-- {{chatInfo.name}} -->
			</view>
			<view class="right">
				<u-icon name="list-dot" color="#333" size="20"></u-icon>
			</view>
		</view>
		<view class="content">
			<view class="info" v-if="friendInfo.Users">
				<view class="avatar">
					<img :src="friendInfo.Users.avatar" alt="">
				</view>
				<view class="right">
					<view class="name">
						{{ friendInfo.Users.name }}
					</view>
					<view class="note">
						备注：{{friendInfo.note || '暂无'}}
					</view>
					<view class="email">
						邮箱：{{friendInfo.Users.email || '暂无'}}
					</view>
				</view>
			</view>
			<view class="list">
				<view class="li">
					<u-cell-group>
						<u-cell title="设置备注和标签" :isLink="true"></u-cell>
						<u-cell title="更多信息" :isLink="true"></u-cell>
					</u-cell-group>
				</view>
			</view>
			<view class="tool">
				<view class="send" @click="sendMsgClick">
					<u-icon name="chat" color="#666" size="22"></u-icon>
					发消息
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				friendInfo: {}
			};
		},
		methods: {
			goBack() {
				uni.switchTab({
					url: '/pages/address/address'
				})
			},
			async sendMsgClick(){
				await this.$store.dispatch('addSessionList',this.friendInfo.Users.id)
				uni.redirectTo({
					url: '/pages/chat/chat'
				})
			}
		},
		onShow() {
			this.friendInfo = app.globalData.selectUser
		}
	}
</script>

<style lang="less">
	.head {
		width: 100%;
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 20rpx;
		color: #333;
	}

	.content {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		overflow-y: auto;
		height: calc(100% - 70rpx);

		.info {
			display: flex;

			.avatar {
				width: 120rpx;
				height: 120rpx;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				flex: 1;
				margin-left: 20rpx;

				.name {
					color: #333;
					margin-bottom: 10rpx;
				}

				.note,
				.email {
					font-size: 28rpx;
					color: #555;
					line-height: 44rpx;
				}
			}
		}

		.list {
			margin-top: 60rpx;
		}

		.tool {
			width: 100%;
			border-top: 6px solid #eee;

			// margin-top: 20rpx;
			.send {
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 1px solid #eee;
				font-size: 28rpx;
			}
		}
	}
</style>
