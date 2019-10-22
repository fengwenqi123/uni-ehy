<template>
	<div class="container">
		<div class="form">
			<view class="input">
				<view class="title">昵称:</view>
				<input v-model="form.name" return-key-type="done" class="uni-input" placeholder="请输入昵称" />
			</view>
		</div>
		<div class="button"><button @click="submit" type="primary">确 定</button></div>
	</div>
</template>

<script>
import { updateName } from '@/api/personal.js';
export default {
	name: 'index',
	data() {
		return {
			form: {
				name: ''
			}
		};
	},
	onLoad(option) {
		this.form.name = option.name;
	},
	methods: {
		submit() {
			if (!this.form.name) {
				uni.showToast({
					title: '请输入昵称',
					icon: 'none'
				});
				return;
			}
			updateName(this.form).then(response => {
				uni.showToast({
					title: response.msg
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1,
						animationType: 'pop-out',
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
