<template>
	<view class="sewage">
		<div class="top">
			<div>
				<div>
					<image class="img" src="../../static/img/ships.png"></image>
					<span>{{ shipName }}</span>
				</div>
				<div>
					<picker mode="selector" :range="shipList" @change="selectShip"><span>切换</span><image class="img1" src="../../static/img/change.png"></image></picker>
				</div>
			</div>
			<div><span style="font-size:30rpx;margin-top:20rpx;" @click="goPoint">排污积分：0 ></span></div>
			<div @click="getScanCode"><image class="imgCode" src="../../static/img/sys.png"></image></div>
		</div>
		<div class="cell" @click="goOli">
			<div>
				<image class="imgCell" src="../../static/img/ywshs.png"></image>
				<span>油污水回收记录</span>
			</div>
			<div><image class="imgCell1" src="../../static/img/i-right.png"></image></div>
		</div>
		<div class="cell" @click="goLifeRubbish">
			<div>
				<image class="imgCell" src="../../static/img/shlj.png"></image>
				<span>生活垃圾回收记录</span>
			</div>
			<div><image class="imgCell1" src="../../static/img/i-right.png"></image></div>
		</div>
		<div class="cell" @click="goLifeWater">
			<div>
				<image class="imgCell" src="../../static/img/shws.png"></image>
				<span>生活污水回收记录</span>
			</div>
			<div><image class="imgCell1" src="../../static/img/i-right.png"></image></div>
		</div>
		<div class="cell" @click="goSite">
			<div>
				<image class="imgCell" src="../../static/img/hsdwz.png"></image>
				<span>回收点位置查询</span>
			</div>
			<div><image class="imgCell1" src="../../static/img/i-right.png"></image></div>
		</div>
		<div class="cell" @click="goReport">
			<div>
				<image class="imgCell" src="../../static/img/wfsa.png"></image>
				<span>无法上岸问题上报</span>
			</div>
			<div><image class="imgCell1" src="../../static/img/i-right.png"></image></div>
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
		goOli(){
			uni.showModal({
				content: "暂未开放，敬请期待！",
				showCancel: false,
				confirmText: "确定"
			})
		},
		goLifeRubbish(){
			uni.showModal({
				content: "暂未开放，敬请期待！",
				showCancel: false,
				confirmText: "确定"
			})
		},
		list() {
			boatList(2).then(response => {
				console.log(response);
				this.shipList = response.data.map(item => item.shipName);
				this.shipName = this.shipList[0];
			});
		},
		goPoint(){
			uni.showModal({
				content: "暂未开放，敬请期待！",
				showCancel: false,
				confirmText: "确定"
			})
		},
		goSite(){
			uni.navigateTo({
				url: '/pages/sewage/siteList/index'
			});
		},
		goReport(){
			uni.navigateTo({
				url: '/pages/sewage/failReport/index'
			});
		},
		goLifeWater(){
			uni.navigateTo({
				url: '/pages/sewage/lifeWaterReport/index'
			});
		},
		selectShip(e) {
			console.log(e.detail.value);
			this.shipName = this.shipList[e.detail.value];
		},
		getScanCode() {
			uni.scanCode({
				onlyFromCamera: true,
				success: res => {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					this.code = res.result
					// console.log('条码内容：'+this.code)
					this.getRecoveryInfo();
				}
			});
			// this.getRecoveryInfo();
		},
		getRecoveryInfo() {
			// this.code = '445678902454545453535';
			recoveryInfo(this.shipName, this.code)
				.then(response => {
					this.codeInfo = response.data;
					console.log(this.codeInfo)
					// this.code = '445678902454545453535';
					// this.codeInfo = JSON.stringify({ shipName: 'sasasas', siteName: '花式科技', type: 3, attribute: 2, address: '湖州市港航管理局',name:"123213123" });
					switch (this.codeInfo.type) {
						case 1:
							uni.navigateTo({
								url: `/pages/sewage/lifeWater/index?code=${this.code}&info=${JSON.stringify(this.codeInfo)}`
							});
							break;
						case 2:
							uni.navigateTo({
								url: `/pages/sewage/oil/index?code=${this.code}&info=${JSON.stringify(this.codeInfo)}`
							});
							break;
						default:
							uni.navigateTo({
								url: `/pages/sewage/lifeRubbish/index?code=${this.code}&info=${JSON.stringify(this.codeInfo)}`
							});
					}
				})
				.catch(() => {
					uni.navigateTo({
						url: '/pages/sewage/getCodeFail/fail'
					});
				});
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
			span { 
				display: inline-block;
				line-height: 60rpx;
				color: #fff;
				margin-left: 20rpx;
				font-size: 40rpx;
			}
			div:nth-child(2) {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				span{
					font-size:25rpx;
				}
				.img1 {
					width: 25rpx;
					height: 25rpx;
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
			padding: 30rpx 50rpx 50rpx 50rpx;
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
		height: 104rpx;
		padding: 0rpx 32rpx;
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
			.imgCell1 {
				width: 16rpx;
				height: 36rpx;
			}
			span {
				margin-left: 10px;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
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
