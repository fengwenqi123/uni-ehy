<template>
	<div class="container">
		<div class="form">
			<view class="input">
				<view class="title">姓名:</view>
				<input v-model="form.name" class="uni-input" focus placeholder="请输入姓名" />
			</view>
			<view class="input">
				<view class="title">身份证:</view>
				<input v-model="form.idCard" class="uni-input" focus placeholder="请输入身份证" />
			</view>
			<view class="input">
				<view class="title">手机号:</view>
				<input v-model="form.mobile" class="uni-input" focus placeholder="请输入手机号" />
			</view>
			<view class="input">
				<view class="title">验证码:</view>
				<input v-model="form.code" class="uni-input" focus placeholder="请输入验证码" />
				<button @click="_getSms" :disabled="disabled" size="mini" type="primary">{{ smsText }}</button>
			</view>
			<view class="input">
				<view class="title">密码:</view>
				<input v-model="form.password" class="uni-input" focus placeholder="请输入密码" />
			</view>
			<view class="input">
				<view class="title">推广单位:</view>
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{ array[index] }}</view>
				</picker>
			</view>
		</div>
		<div class="button"><button @click="submit" type="primary">注 册</button></div>
	</div>
</template>

<script>
var smsText = 60;
import { getSms, getRegister } from '@/api/register.js';
export default {
	name: 'index',
	data() {
		return {
			smsText: '发送验证码',
			disabled: false,
			array: [
				'吴山渡站',
				'太湖站',
				'南浔港航管理检查站',
				'乾元站',
				'新市站',
				'环城站',
				'洪桥站',
				'双林站',
				'武康站',
				'马家渡站',
				'雉城站',
				'吕山站',
				'菱湖站',
				'小浦站',
				'和平站'
			],
			index: 0,
			form: {
				name: '',
				idCard: '',
				mobile: '',
				channel: '吴山渡站',
				code: '',
				password: '',
				loginName: ''
			}
		};
	},
	methods: {
		bindPickerChange(e) {
			this.index = e.target.value;
			this.form.channel = this.array[e.target.value];
		},
		// 获取验证码
		_getSms() {
			if (!this.form.mobile) {
				// Toast('请填写手机号');
				uni.showToast({
					title: '请填写手机号',
					duration: 1500
				});
				return;
			}
			const type = 1;
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
			if (!this.form.name) {
				uni.showToast({
					title: '请输入姓名',
					icon:'none'
				});
				return;
			}
			if (!this.form.idCard) {
				uni.showToast({
					title: '请输入身份证',
					icon:'none'
				});
				return;
			}
			if (!this.form.mobile) {
				uni.showToast({
					title: '请输入手机号',
					icon:'none'
				});
				return;
			}
			if (!this.form.code) {
				uni.showToast({
					title: '请输入短信验证码',
					icon:'none'
				});
				return;
			}
			if (!this.form.password) {
				uni.showToast({
					title: '请输入密码',
					icon:'none'
				});
				return;
			}
			if (!this.form.channel) {
				uni.showToast({
					title: '请选择推广单位',
					icon:'none'
				});
				return;
			}
			this.form.loginName = this.form.mobile;
			getRegister(this.form).then(response => {
				uni.showToast({
					title: '注册成功'
				});
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/home/index',
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
