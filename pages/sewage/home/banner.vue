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
		  <view class="sewage-banner-bottom-left">
			  <view class="sewage-banner-bottom-left-top">
				 <smImg style="margin-bottom:10rpx"/>
				  <span>扫码排放</span>
			  </view>
			  <view class="sewage-banner-bottom-left-bottom"></view>
		  </view>
		  <view class="sewage-banner-bottom-right">
			  <view class="sewage-banner-bottom-right-top">
				 <image src="../../static/img/ls.png" class="ls"></image>
				 <span>可用绿水积分</span>
			  </view>
			  <view class="sewage-banner-bottom-right-bottom">0</view>
		  </view>
	  </view>
	</view>
</template>

<script>
import smImg from './sm.vue'
	export default {
		components:{
			smImg
		},
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
            padding:50rpx 0;
			display: flex;
			width:100%;
			.sewage-banner-bottom-left,.sewage-banner-bottom-right{
				width:50%;
				display:flex;
				flex-direction: column;
				
				align-items: center;
			}
			.sewage-banner-bottom-left{
				width:50%;
				.sewage-banner-bottom-left-top{
					display: flex;
					height:100rpx;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					.sm{
						margin-bottom:20rpx;
					}
					span{
						color:#fff;
					}
				}
				.sewage-banner-bottom-left-bottom{
					height:30rpx;
				}
			}
			.sewage-banner-bottom-right{
				width:50%;
				position: relative;
				.sewage-banner-bottom-right-top{
					height:100rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					.ls{
						width:60rpx;
						height:180rpx;
						margin-bottom:20rpx;
					}
					span{
						color:#fff;
					}
				}
				.sewage-banner-bottom-right-bottom{
					position: absolute;
					height:40rpx;
					color:#fff;
					margin-top:20rpx;
					bottom:-20rpx;
					left:50%;
					transform: translateX(-50%);
				}
			}
		}
	}

</style>