<template>
	<view class="sewage-banner">
      <view class="sewage-banner-top">
		  <view class="sewage-banner-top-left">
		  	<image class="img" src="../../static/img/ships.png"></image>
		  	<span>{{ shipName }}</span>
		  </view>
		  <view  class="sewage-banner-top-right">
		  	<picker mode="selector" :range="shipList" @change="selectShip">
		  		<span>切换</span>
		  		<image class="img1" src="../../static/img/change.png"></image>
		  	</picker>
		  </view>
	  </view>
	  <view class="sewage-banner-bottom">
		  <view class="sewage-banner-bottom-left"></view>
		  <view class="sewage-banner-bottom-right"></view>
	  </view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				shipName:"这萧山货24091"
			}
		}
	}
</script>

<style scoped lang="scss">
	.sewage-banner{
		margin:10rpx 10rpx 20rpx 10rpx;
		padding:0 20rpx;
		background-color:#007aff;
		border-radius:15rpx ;
		.sewage-banner-top{
			display: flex;
			height: 80rpx;
			align-items: center;
			justify-content: space-between;
			border-bottom:1rpx solid #fff;
			width:100%;
			.sewage-banner-top-left,.sewage-banner-top-right{
				height:80rpx;
			}
			.sewage-banner-top-left{
				display: flex;
				align-items: center;
				.img{
					height:40rpx;
	                width:40rpx;
				}
				span {
					color: #fff;
					margin-left: 20rpx;
					font-size: 30rpx;
				}
			}
			.sewage-banner-top-right{
				display: flex;
				align-items: center;
				.img1 {
					width: 30rpx;
					height: 30rpx;
				}
				span {
					color: #fff;
					font-size: 30rpx;
					
				}
			}
			
		}
		.sewage-banner-bottom{
			height:100rpx;
		}
	}

</style>