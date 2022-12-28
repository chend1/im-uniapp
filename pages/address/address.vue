<template>
	<view class="home">
		<Head></Head>
		<view class="container">
			<view class="list">
				<view class="li" :class="{active: addressInfo.id === item.id}" v-for="(item, index) in addressList"
					:key="index" @click="addressClick(item)">
					<view class="avatar">
						<img :src="item.Users.avatar" alt="">
					</view>
					<view class="name">
						{{item.note || item.Users.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Head from '../../components/Head.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			Head
		},
		computed: mapState({
			addressList: state => state.address.addressList,
		}),
		data() {
			return {
				addressInfo: {}
			};
		},
		methods: {
			addressClick(address){
				const app = getApp()
				// this.addressInfo = address
				app.globalData.selectUser = address
				uni.navigateTo({
					url: `/pages/details/details?id=${address.Users.id}&name=${address.Users.name}`
				})
			}
		},
		onShow() {
			this.$store.dispatch('getFriendList')
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
				display: flex;
				padding: 10rpx 30rpx;

				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					overflow: hidden;
					background-color: azure;
					border: 2rpx solid #eee;

					img {
						width: 100%;
					}
				}

				.name {
					flex: 1;
					font-size: 28rpx;
					line-height: 80rpx;
					margin-left: 20rpx;
					border-bottom: 1px solid #f9f9f9;
				}
			}

			.active {
				background-color: aliceblue;
			}
		}
	}
</style>
