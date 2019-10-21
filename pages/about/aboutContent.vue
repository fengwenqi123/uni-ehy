<template>
	<div class="container">
		<div class="content"><rich-text :nodes="content"></rich-text></div>
	</div>
</template>

<script>
export default {
	name: 'aboutContent',
	data() {
		return {
			content: null,
			title: null
		};
	},
	onLoad(option) {
		this.content = option.content;
	}
};
</script>

<style scoped lang="scss">
.container {
	position: absolute;
	width: 100%;
	height: 100%;
	background: #fff;

	.content {
		margin: 10rpx 20rpx;
		line-height: 50rpx;
		text-indent: 60rpx;
	}
}
</style>
