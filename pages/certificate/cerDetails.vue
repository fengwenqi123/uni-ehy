<template>
	<view class="container">
<van-button type="primary">主要按钮</van-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabIndex: 0,
			tabList: ['适任证', '任解职']
		};
	},
	methods: {
	}
};
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	.tab {
		display: flex;
		background: #ffffff;
		.tab-item {
			flex: 1;
			height: 82rpx;
			line-height: 82rpx;
			text-align: center;
			font-size: 30rpx;
			font-weight: 500;
		}
		.active {
			border-bottom: 1px solid #108ee9;
			color: #108ee9;
		}
	}
	.page-section-spacing {
		// margin: 0 24rpx;
	}
	.swiper-item {
		flex: 1;
		flex-direction: row;
	}
}
</style>

 

 