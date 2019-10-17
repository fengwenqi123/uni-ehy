<template>
	<view class="success">
		<div class="top">
			<div><image src="../../../static/img/fail.png" class="img"></image></div>
			<div><p>申请失败</p></div>	
			<div><p>接受设备可能故障，请联系管理人员或报修</p></div>
		</div>
		<div class="button"><button @click="goHome">返回首页</button></div>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
