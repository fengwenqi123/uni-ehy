<template>
	<view class="sewage">
		<div class="top">
			<div>
				<div>
					<image class="img" src="../../static/img/ships.png"></image>
					<p>{{ shipName }}</p>
				</div>
				<div>
					<picker mode="selector" :range="shipList" @change="selectShip"><image class="img1" src="../../static/img/ships.png"></image></picker>
				</div>
			</div>
			<div><span>排污积分：0 ></span></div>
			<div @click="getScanCode"><image class="imgCode" src="../../static/img/sys.png"></image></div>
		</div>
		<div class="cell">
			<div>
				<image class="imgCell" src="../../static/img/ywshs.png"></image>
				<span>油污水回收记录</span>
			</div>
			<div><image class="imgCell" src="../../static/img/i-right.png"></image></div>
		</div>
		<div class="cell">
			<div>
				<image class="imgCell" src="../../static/img/shlj.png"></image>
				<span>生活垃圾回收记录</span>
			</div>
			<div><image class="imgCell" src="../../static/img/i-right.png"></image></div>
		</div>
		<div class="cell">
			<div>
				<image class="imgCell" src="../../static/img/shws.png"></image>
				<span>生活污水回收记录</span>
			</div>
			<div><image class="imgCell" src="../../static/img/i-right.png"></image></div>
		</div>
		<div class="cell">
			<div>
				<image class="imgCell" src="../../static/img/hsdwz.png"></image>
				<span>回收点位置查询</span>
			</div>
			<div><image class="imgCell" src="../../static/img/i-right.png"></image></div>
		</div>
		<div class="cell">
			<div>
				<image class="imgCell" src="../../static/img/wfsa.png"></image>
				<span>无法上岸问题上班</span>
			</div>
			<div><image class="imgCell" src="../../static/img/i-right.png"></image></div>
		</div>
	</view>
</template>

<script>
import { boatList, recoveryInfo } from '@/api/sewage.js';
export default {
	data() {
		return {
			shipName: '',
			code: '',
			shipList: [],
			codeInfo: null
		};
	},
	created() {
		this.list();
	},
	methods: {
		list() {
			boatList(2).then(response => {
				console.log(response);
				this.shipList = response.data.map(item => item.shipName);
				this.shipName = this.shipList[0];
			});
		},
		selectShip(e) {
			console.log(e.detail.value);
			this.shipName = this.shipList[e.detail.value];
		},
		getScanCode() {
			// uni.scanCode({
			// 	success: function(res) {
			// 		console.log('条码类型：' + res.scanType);
			// 		console.log('条码内容：' + res.result);
			// 		// this.code = res.result;
			// 		this.getRecoveryInfo();
			// 	}
			// });
			this.getRecoveryInfo();
		},
		getRecoveryInfo() {
			// recoveryInfo(this.shipName, this.code).then(response => {
			// this.codeInfo=response.data
			this.code = '123123213';
			this.codeInfo = JSON.stringify({ shipName: 'sasasas', siteName: '花式科技', type: 3, attribute: 2, address: '湖州市港航管理局',name:"123213123" });
			switch (2) {
				case 1:
					uni.navigateTo({
						url: `/pages/sewage/lifeWater/index?code=${this.code}&info=${this.codeInfo}`
					});
					break;
				case 2:
					uni.navigateTo({
						url: `/pages/sewage/oil/index?code=${this.code}&info=${this.codeInfo}`
					});
					break;
				default:
					uni.navigateTo({
						url: `/pages/sewage/lifeRubbish/index?code=${this.code}&info=${this.codeInfo}`
					});
			}
			// });
		}
	}
};
</script>

<style lang="scss" scoped>
.sewage {
	width: 100%;
	.top {
		background-color: #007aff;
		div:nth-child(1),
		div:nth-child(2) {
			padding: 10rpx;
			width: 100%;
			display: flex;
			height: 60rpx;
			align-items: center;
			.img {
				width: 60rpx;
				height: 60rpx;
				float: left;
			}
			p {
				line-height: 60rpx;
				color: #fff;
				margin-left: 20rpx;
				font-size: 40rpx;
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
			height: 300rpx;
			padding: 50rpx;
			.imgCode {
				height: 200rpx;
				width: 200rpx;
			}
		}
	}
	.cell {
		width: 100%;
		background-color: #fff;
		display: flex;
		height: 80rpx;
		padding: 10rpx 0;
		justify-content: space-between;
		div {
			display: flex;
			padding: 0 10rpx;
			align-items: center;
			background-color: #fff;
			.imgCell {
				width: 30rpx;
				height: 30rpx;
			}
			span {
				color: #333;
				margin-left: 10px;
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
				margin-right: 20rpx;
			}
		}
	}
}
</style>
