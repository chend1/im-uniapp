<template>
	<view class="head">
		<view class="img">
			<image :src="userInfo.avatar" mode="aspectFit">
		</view>
		<view class="content">
			<view class="name">{{userInfo.name}}</view>
			<view class="email">{{userInfo.email}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Head",
		data() {
			return {
				userInfo: {}
			};
		},
		mounted(){
			this.userInfo = uni.getStorageSync('userInfo')
		}
	}
</script>

<style lang="less">
.head{
	width: 100%;
	display: flex;
	align-items: center;
	padding: 10px;
	background-color: #4cacff;
	.img{
		width: 40px;
		height: 40px;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.content{
		margin-left: 10px;
		.name,.email{
			line-height: 20px;
			color: #fff;
		}
	}
}
</style>
