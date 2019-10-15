<template>
	<view>
		<navigation-bar></navigation-bar>
		<view> 状态栏下的文字 </view>
	</view>
</template>

<script>
	import navigationBar from '@/components/navigation-bar/index.vue'
	export default {
		name: 'index',
		components:{
			navigationBar
		}
	}
</script>
<style scoped lang="scss">
</style>
