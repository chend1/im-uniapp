<template>
	<view class="login">
		<view class="box">
			<view class="head">
				<u--image :showLoading="true" src="/static/image/logo.png" width="80px" height="80px"></u--image>
			</view>
			<view class="form">
				<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="form1">
					<u-form-item label="账号:" prop="account" borderBottom>
						<u--input placeholder="请输入账号" border="surround" v-model="userInfo.account"></u--input>
					</u-form-item>
					<u-form-item label="密码:" prop="password" borderBottom>
						<u--input placeholder="请输入密码" border="surround" type="password" v-model="userInfo.password">
						</u--input>
					</u-form-item>
				</u--form>
			</view>
			<view class="bottom">
				<view class="btn" @click="loginClick">
					<u-button text="登录" type="primary"></u-button>
				</view>
				<view class="btn">
					<u-button text="注册" type="primary" :plain="true"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import { login } from '../../api/login.js'
	export default {
		data() {
			return {
				userInfo: {
					account: '',
					password: ''
				},
				rules: {
					'account': {
						type: 'string',
						required: true,
						message: '请填写账号',
						trigger: ['blur', 'change']
					},
					'password': {
						type: 'string',
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					},
				},
				value: ''
			};
		},
		methods: {
			loginClick() {
				if(!this.userInfo.account || !this.userInfo.password){
					return
				}
				const data = {
					email: this.userInfo.account,
					password: this.userInfo.password
				}
				login(data).then(res => {
					console.log(res)
					const message = {
						name: res.data.name,
						email: res.data.email,
						id: res.data.id,
						token: res.data.token,
						avatar: res.data.avatar
					}
					app.globalData.userInfo = message
					uni.setStorageSync('userInfo', message)
					uni.switchTab({
						url: '/pages/home/home'
					})
				})
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
	}
</script>


<style lang="less">
	.login {
		width: 100%;
		height: 100vh;
		padding: 10px;
		background-color: #f6f6f7;
		box-sizing: border-box;

		.box {
			width: 80%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.head {
				width: 100%;
				display: flex;
				justify-content: center;
				margin-bottom: 20px;
			}

			.form {
				padding: 10px;
			}

			.bottom {
				margin-top: 20%;

				.btn {
					margin: 20px 0;
				}
			}

		}

	}
</style>
