<template>
	<div class="container">
		<cu-custom bgColor="#FFFFFF" :isBack="true"></cu-custom>
		<div class="logo"><image src="../../static/img/ehy-logo.png" mode=""></image></div>
		<div class="form">
			<view class="input">
				<view class="title"><image src="../../static/img/username.png" mode=""></image></view>
				<input v-model="form.loginName" focus placeholder="请输入帐号/手机号" />
			</view>
			<view class="input">
				<view class="title"><image src="../../static/img/password.png" mode=""></image></view>
				<input v-model="form.password" password type="text" placeholder="请输入密码" />
				<div @click="forget" class="forget">忘记密码</div>
			</view>
		</div>
		<div class="botton" @click="submit"><button type="primary">登 录</button></div>
		<div class="register">
			<p>
				没有账号?
				<span @click="register">免费注册</span>
			</p>
		</div>
	</div>
</template>

<script>
import { login, online } from '@/api/login.js';
import { saveToken, saveUserInfo } from '@/utils/cache.js';
export default {
	name: 'index',
	data() {
		return {
			form: {
				loginName: '',
				password: '',
				loginType: 3,
				loginSource: 3
			}
		};
	},
	methods: {
		submit() {
			login(this.form).then(response => {
				this.getonline(response.data);
			});
		},
		getonline(token) {
			online(token).then(response => {
				saveToken(response.data.accessToken);
				saveUserInfo(response.data);
				uni.showToast({
					title: '登录成功',
					duration: 1500
				});
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/home/index',
						animationType: 'pop-in',
						animationDuration: 300
					});
				}, 1500);
			});
		},
		register() {
			uni.navigateTo({
				url: '/pages/register/index',
				animationType: 'pop-in',
				animationDuration: 300
			});
		},
		forget() {
			uni.navigateTo({
				url: '/pages/forget/index',
				animationType: 'pop-in',
				animationDuration: 300
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	background: #ffffff;
	.logo {
		text-align: center;
		image {
			width: 280rpx;
			height: 132rpx;
		}
	}
	.form {
		margin-top: 100rpx;
		padding: 0 50rpx;
		.input {
			margin-top: 20rpx;
			border-bottom: 1rpx solid #d8d8d8;
			display: flex;
			height: 80rpx;
			align-items: center;
			.title {
				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 30rpx;
				}
			}
			input {
				width: 450rpx;
			}
			.forget {
				font-size: 28rpx;

				font-weight: 500;
				color: rgba(102, 102, 102, 1);
			}
		}
	}
	.botton {
		width: 658rpx;
		margin: 90rpx auto;
	}
	.register {
		text-align: right;
		padding-right: 48rpx;
		p {
			font-size: 28rpx;
			font-weight: 500;
			color: rgba(204, 204, 204, 1);
			span {
				font-size: 28rpx;
				font-weight: 500;
				color: #108ee9;
				margin-left: 14rpx;
			}
		}
	}
}
</style>
