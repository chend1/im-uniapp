<template>
	<view class="session-info">
		<view class="head">
			<view class="left" @click="goBack">
				<u-icon name="arrow-left" color="#333" size="20"></u-icon>
			</view>
			<view class="middle">
				聊天信息
			</view>
			<view class="right">
			</view>
		</view>
		<view class="content">
			<view class="user-list" v-if="sessionInfo.Users && sessionInfo.channel_type != 2">
				<view class="user">
					<view class="avatar">
						<img :src="sessionInfo.Users.avatar" alt="">
					</view>
					<view class="name">{{sessionInfo.Users.name}}</view>
				</view>
				<view class="add">
					<u-icon name="plus" color="#999" size="20"></u-icon>
				</view>
			</view>
			<view class="user-list" v-if="sessionInfo.channel_type == 2">
				<view class="user" v-for="user in userList" :key="user.id">
					<view class="avatar">
						<img :src="user.users.avatar" alt="">
					</view>
					<view class="name">{{user.users.name}}</view>
				</view>
				<view class="add">
					<u-icon name="plus" color="#999" size="20"></u-icon>
				</view>
			</view>
			<view class="li" v-if="sessionInfo.channel_type == 2">
				<u-cell-group>
					<u-cell title="群聊名称" :isLink="true">
						<text slot="value" class="u-slot-value">{{sessionInfo.name}}</text>
					</u-cell>
					<u-cell title="群二维码" :isLink="true"></u-cell>
					<u-cell title="群公告" :isLink="true"></u-cell>
					<u-cell title="备注" :isLink="true">
						<text slot="value" class="u-slot-value">{{sessionInfo.note || '暂无'}}</text>
					</u-cell>
				</u-cell-group>
			</view>
			<view class="li" v-if="sessionInfo.channel_type != 2">
				<u-cell-group>
					<u-cell title="消息免打扰">
						<view slot="value">
							<u-switch v-model="isTop" size="20" activeColor="#44ce00"
								inactiveColor="#e6e6e6"></u-switch>
						</view>
					</u-cell>
					<u-cell title="提醒">
						<view slot="value">
							<u-switch v-model="isTop" size="20" activeColor="#44ce00"
								inactiveColor="#e6e6e6"></u-switch>
						</view>
					</u-cell>
				</u-cell-group>
			</view>
			<view class="li">
				<u-cell-group>
					<u-cell title="置顶聊天">
						<view slot="value">
							<u-switch v-model="isTop" size="20" activeColor="#44ce00"
								inactiveColor="#e6e6e6"></u-switch>
						</view>
					</u-cell>
					<u-cell title="清空聊天记录" :isLink="true"></u-cell>
				</u-cell-group>
			</view>
			<view class="li" v-if="sessionInfo.channel_type == 2">
				<view class="delete">退出群聊</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import { getGroupUserInfo } from '../../api/group.js'
	export default {
		data() {
			return {
				isTop: false,
				sessionInfo: {},
				userList: []
			};
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			getUserList(id){
				getGroupUserInfo({id}).then(res => {
					console.log(res)
					this.userList = res.data.group_users
				})
			}
		},
		onShow() {
			const sessionInfo = app.globalData.selectSession
			console.log(sessionInfo)
			this.sessionInfo = sessionInfo
			this.isTop = sessionInfo.top_status == 1
			if(sessionInfo.channel_type == 2){
				this.getUserList(sessionInfo.group_id)
			}
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
		height: calc(100% - 70rpx);
		overflow-y: auto;
		box-sizing: border-box;
		padding: 20rpx 0;

		.user-list {
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding: 0 20rpx;

			.user {
				width: 90rpx;
				height: 130rpx;
				margin: 0 30rpx 20rpx 0;

				.avatar {
					width: 100%;
					height: 90rpx;
					border-radius: 6rpx;
					overflow: hidden;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.name {
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					color: #999;
					text-align: center;
				}
			}

			.add {
				width: 90rpx;
				height: 90rpx;
				border-radius: 6rpx;
				border: 1px dashed #999;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.li {
			border-top: 6px solid #eee;

			.delete {
				width: 100%;
				line-height: 80rpx;
				text-align: center;
				color: #ff0000;
				border-bottom: 1px solid #eee;
			}
		}
	}
</style>
