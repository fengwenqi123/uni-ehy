<template>
	<view class="sewage">
		<div>
			<div>
				<image class="img" src="../../static/img/ships.png"></image>
				<p>{{ shipName }}</p>
			</div>
			<div>
				<picker mode="selector" :range="shipList" :value="shipName" @change="selectShip"><image class="img1" src="../../static/img/ships.png"></image></picker>
			</div>
		</div>
		<div><span>排污积分：0 ></span></div>
		<div @click="getScanCode"><image class="imgCode" src="../../static/img/sys.png"></image></div>
		<div class="cell">
			<div>
				<image class="imgCell" src="../../static/img/ywshs.png"></image>
				<span>油污水回收记录</span>
			</div>
			<div><image class="imgCell" src="../../static/img/Path.png"></image></div>
		</div>
		<div class="cell">
			<div>
				<image class="imgCell" src="../../static/img/shlj.png"></image>
				<span>生活垃圾回收记录</span>
			</div>
			<div><image class="imgCell" src="../../static/img/Path.png"></image></div>
		</div>
		<div class="cell">
			<div>
				<image class="imgCell" src="../../static/img/shws.png"></image>
				<span>生活污水回收记录</span>
			</div>
			<div><image class="imgCell" src="../../static/img/Path.png"></image></div>
		</div>
		<div class="cell">
			<div>
				<image class="imgCell" src="../../static/img/hsdwz.png"></image>
				<span>回收点位置查询</span>
			</div>
			<div><image class="imgCell" src="../../static/img/Path.png"></image></div>
		</div>
		<div class="cell">
			<div>
				<image class="imgCell" src="../../static/img/wfsa.png"></image>
				<span>无法上岸问题上班</span>
			</div>
			<div><image class="imgCell" src="../../static/img/Path.png"></image></div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			shipName: '浙萧山货32132',
			shipList: ['浙萧山货32132', '浙诸暨货3123', '浙萨达多']
		};
	},
	methods: {
		selectShip(value) {
			console.log(value);
		},
		getScanCode() {
			uni.scanCode({
				success: function(res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.sewage {
	width: 100%;
	div:nth-child(1),
	div:nth-child(2) {
		padding: 10rpx;
		width: 100%;
		background-color: #0faeff;
		display: flex;
		height: 60rpx;
		// align-items: center;
		.img {
			width: 60rpx;
			height: 60rpx;
			float: left;
		}
		p{
			line-height: 60rpx;
			color:#fff;
			font-size:30rpx;
		}
		div:nth-child(2) {
			display: flex;
			justify-content: flex-end;
			margin-right: 20rpx;
			.img1 {
				float: right;
				width: 60rpx;
				height: 60rpx;
			}
		}
		span {
			color: #fff;
			display: inline-block;
			margin-left: 10rpx;
			height: 80rpx;
			font-size: 35rpx;
			line-height: 80rpx;
		}
	}
	div:nth-child(3) {
		text-align: center;
		background-color: #0faeff;
		height: 300rpx;
		padding: 50rpx;
		.imgCode {
			height: 200rpx;
			width: 200rpx;
		}
	}
	.cell {
		width: 100%;
		background-color: #fff;
		display: flex;
		padding: 10rpx 0;
		justify-content: space-between;
		div {
			align-items: center;
			background-color: #fff;
			.imgCell {
				width: 30rpx;
				height: 30rpx;
			}
			span {
				color: #333;
				font-size: 30rpx;
			}
		}
		div:nth-child(2) {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.imgCell {
				width: 20rpx;
				height: 20rpx;
				margin-right:20rpx;
			}
		}
	}
}
</style>
