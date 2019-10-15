<template>
	<div class="container">
		<cu-custom bgColor="#FFFFFF" :isBack="true"></cu-custom>
		<div class="logo"><image src="../../static/img/ehy-logo.png" mode=""></image></div>
		<div class="form">
			<view class="input">
				<view class="title"><image src="../../static/img/username.png" mode=""></image></view>
				<input class="uni-input" focus placeholder="输入用户" />
			</view>
			<view class="input">
				<view class="title"><image src="../../static/img/password.png" mode=""></image></view>
				<input class="uni-input" focus placeholder="输入用户" />
			</view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'index'
};
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	background: #ffffff;
	.logo{
		text-align: center;
		image{
			width:280rpx;
			height: 132rpx;
		}
	}
	.form {
		padding: 0 50rpx;;
		.input {
			margin-top: 20rpx;
			border-bottom: 1rpx solid #D8D8D8;
			display: flex;
			height: 100rpx;
			align-items: center;
			.title {
				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 30rpx;
				}
			}
		}
	}
}
</style>
