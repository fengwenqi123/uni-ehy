<template>
	<div class="sewageScore">
		<view class="top">
			<image src="../../../static/img/score.png" class="img"></image>
			<div class="top-point">
				<p>船舶综合积分</p>
				<p>831</p>
			</div>
		</view>
		<view class="middle">
			<p class="middle-title">信用积分</p>
			<div class="middle-content">
				<div>
					<p>751</p>
					<p>违章积分</p>
				</div>
				<div @click="goSewagePoint">
					<p>864</p>
					<p>排污积分</p>
				</div>
				<div>
					<p>324</p>
					<p>运营积分</p>
				</div>
				<div>
					<p>751</p>
					<p>积分商城</p>
				</div>
			</div>
		</view>
		
	</div>
</template>

<script>
export default {
	data(){
		return{}
	},
	methods:{
		goSewagePoint(){
			uni.navigateTo({
				url:"/pages/sewage/sewageScore/detail"
			})
		}
	}
};
</script>

<style scoped lang="scss">
.sewageScore {
	width: 100%;
	padding:5%;
	.top {
		position: relative;
		width: 100%;
		padding-bottom: 3%;
		.img {
			width:100%;
			height:210rpx;	
		}
		.top-point{
			position: absolute;
			top:50%;
			margin-top:-40rpx;
			left:35%;
			p{
				color:#fff;
				font-size:32rpx;
				font-weight: bold;
				line-height:40rpx;
			}
		}
	}
	.middle{
		background-color:#fff;
        border-radius: 20rpx;
		width:100%;
		.middle-title{
			line-height: 104rpx;
			font-size:30rpx;
			padding-left:20rpx;
		}
		.middle-content{
		    width:100%;
			div{
				padding:30rpx;
				width:33.33%;
				display: inline-block;
				border-top:1px solid #eee;
				p{ 
					width:100%;
					padding:10rpx;
					text-align: center;
					line-height:50rpx;
				}
				p:nth-child(1){
					font-size:32rpx;
					color:#F7A043;
				}
			}
		}
	}
}
</style>
