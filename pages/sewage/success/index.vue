<template>
	<view class="success">
		<div class="top">
			<div><image src="../../../static/img/success.png" class="img"></image></div>
			<div v-if="attr===1"><p>回收成功</p></div>
			<div v-if="attr===2"><p>开始回收</p></div>
			<div v-if="attr === 1"><p>工作人员审核后记录及积分生效</p></div>
			<div v-if="type === 1&&attr===2"><p>请开启回收设备完成回收作业</p></div>
			<div v-if="type === 2&&attr===2"><p>请工作人员确认开始回收作业</p></div>
			<div v-if="type === 3&&attr===2"><p>请等待垃圾箱远程开盖完成投放</p></div>
		</div>
		<div class="bottom">
			<p>预计可获得积分</p>
			<div>
				<p>
					<span>基础分</span>
					<span>10分</span>
				</p>
				<p>
					<span>定位设备加分</span>
					<span>10分</span>
				</p>
				<p>
					<span>船载生活污水柜加分</span>
					<span>0分</span>
				</p>
			</div>
			<p>
				<span>合计积分</span>
				<span>20分</span>
			</p>
		</div>
		<div class="button"><button @click="goHome">返回首页</button></div>
	</view>
</template>

<script>
export default {
	onLoad(option) {
		const item = option;
		console.log(item.type);
		this.type = item.type;
		this.attr = item.attr;
	},
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
	.bottom {
		background: #fff;
		margin-top: 30rpx;
		padding: 0 30rpx;
		p {
			display: flex;
			justify-content: space-between;
		}
		> p {
			line-height: 100rpx;
			font-size: 40rpx;
			border-bottom: 1px solid #eee;
		}
		> div {
			padding: 20rpx 0rpx;
			border-bottom: 1px solid #eee;
			p {
				line-height: 80rpx;
				span:nth-child(1) {
					color: #888;
				}
				span:nth-child(2) {
					color: #333;
					font-size: 30rpx;
					font-weight: bold;
				}
			}
		}
		> p:nth-child(3) {
			span:nth-child(1) {
				font-size: 32rpx;
				color: #888;
			}
			span:nth-child(2) {
				color: #f19d52;
				font-size: 30rpx;
				font-weight: bold;
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
