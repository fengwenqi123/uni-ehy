<template>
	<div class="container">
		<div class="form">
			<view class="input">
				<view class="title">手机号:</view>
				<input v-model="form.mobile" return-key-type="done" type="number" class="uni-input" placeholder="请输入手机号" />
			</view>
			<view class="input">
				<view class="title">验证码:</view>
				<input v-model="form.code" return-key-type="done" type="number" class="uni-input" placeholder="请输入验证码" />
				<button @click="_getSms" :disabled="disabled" size="mini" type="primary">{{ smsText }}</button>
			</view>
			<view class="input">
				<view class="title">密码:</view>
				<input v-model="form.password" return-key-type="done" password class="uni-input" placeholder="请输入密码" />
			</view>
		</div>
		<div class="button"><button @click="submit" type="primary">确 定</button></div>
	</div>
</template>

<script>
var smsText = 60;
import { getSms, forgetpassword } from '@/api/register.js';
export default {
	name: 'index',
	data() {
		return {
			smsText: '发送验证码',
			disabled: false,
			form: {
				mobile: '',
				code: '',
				password: '',
				loginName: null
			}
		};
	},
	methods: {
		// 获取验证码
		_getSms() {
			if (!this.form.mobile) {
				uni.showToast({
					title: '请填写手机号',
					icon: 'none'
				});
				return;
			}
			const type = 2;
			getSms(type, this.form.mobile).then(response => {
				this.CountDown();
			});
		},
		CountDown() {
			setTimeout(() => {
				if (smsText > 0) {
					this.disabled = true;
					smsText--;
					this.smsText = smsText + ' s';
					this.CountDown();
				} else {
					smsText = 60;
					this.smsText = '发送验证码';
					this.disabled = false;
				}
			}, 1000);
		},
		submit() {
			if (!this.form.mobile) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
				return;
			}
			if (!this.form.code) {
				uni.showToast({
					title: '请输入短信验证码',
					icon: 'none'
				});
				return;
			}
			if (!this.form.password) {
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				return;
			}
			this.form.loginName = this.form.mobile;
			forgetpassword(this.form).then(response => {
				uni.showToast({
					title: '修改成功'
				});
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/index',
						animationType: 'pop-in',
						animationDuration: 300
					});
				}, 1500);
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	background: #ffffff;
	.form {
		padding: 0 40rpx;
		.input {
			display: flex;
			align-items: center;
			height: 100rpx;
			border-bottom: 1px solid #e8e8e8;
			.title {
				width: 150rpx;
			}
			input {
				width: 300rpx;
			}
			button {
				margin-left: 20rpx;
				width: 240rpx;
			}
		}
	}
	.button {
		width: 680rpx;
		margin: 40rpx auto;
	}
}
</style>
