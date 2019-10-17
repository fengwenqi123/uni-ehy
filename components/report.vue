<template>
	<view class="report"><p @click="goReport">回收设备有故障？点击报修</p></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		goReport() {
			uni.navigateTo({
				url: '/pages/sewage/failReport/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.report {
	width: 100%;
	position: fixed;
	bottom: 40rpx;
	p {
		width: 100%;
		text-align: center;
		color: #007aff;
	}
}
</style>
