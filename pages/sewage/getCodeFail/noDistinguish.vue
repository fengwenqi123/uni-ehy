<template>
	<view class="success">
		<div class="top">
			<div><image src="../../../static/img/unrecognized.png" class="img"></image></div>
			<div><p>无法识别</p></div>
			<div><p>设备二维码无法识别，请确认是否正确扫描二维码，请尝试手动输入设备码或报修</p></div>
		</div>
		<div class="button"><button @click="manCode">手动输入二维码</button></div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: 1,
			attr: 1
		};
	},
	methods: {
		goHome() {
			uni.switchTab({
				url: '/pages/home/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.success {
	width: 100%;
	.top {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		div {
			text-align: center;
			padding: 20rpx 0;
		}
		div:nth-child(1) {
			padding: 50rpx 0 20rpx 0;
			.img {
				width: 150rpx;
				height: 150rpx;
			}
		}
		div:nth-child(2) {
			p {
				font-size: 35rpx;
			}
		}
		div:nth-child(3) {
			padding-bottom: 50rpx;
			p {
				color: #888;
			}
		}
	}
	.button {
		width: 100%;
		padding: 5% 0;
		button {
			margin: 0 auto;
			width: 90%;
			background-color: #007aff;
			color: #ffffff;
		}
	}
}
</style>
