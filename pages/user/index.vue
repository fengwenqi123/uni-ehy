<template>
	<view class="container">
		<view class="status_bar"></view>
		<view class="header">
			<div class="main">
				<div class="info">
					<div class="img"><image src="../../static/img/h8.png" mode=""></image></div>
					<div class="name">
						<p class="p1">张三</p>
						<p class="p2">10989882928</p>
					</div>
				</div>
				<div class="set"><image src="../../static/img/set.png" mode=""></image></div>
			</div>
		</view>
		<div class="list">
			<ul>
				<li>
					<div class="item">
						
					</div>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
export default {
	name: 'index'
};
</script>
<style scoped lang="scss">
.container {
	width: 100%;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background: #007AFF;
}
.header {
	background: url(../../static/img/background.png) no-repeat;
	background-size: 100% 100%;
	height: 295rpx;
	width: 100%;
	padding: 0 32rpx 0 72rpx;
	.main {
		padding-top: 132rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.info {
			display: flex;
			align-items: center;
			.img {
				image {
					border-radius: 50%;
					height: 124rpx;
					width: 124rpx;
				}
			}
			.name {
				margin-left: 30rpx;
				.p1 {
					font-size: 34rpx;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
				}
				.p2 {
					font-size: 30rpx;
					margin-top: 20rpx;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
		.set {
			image {
				height: 30rpx;
				width: 30rpx;
			}
		}
	}
}
.list{
	ul{
		li{
			.item{
				width:100%;
				height:104px;
				background:rgba(255,255,255,1);
			}
		}
	}
}
</style>
