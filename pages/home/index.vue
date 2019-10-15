<template>
	<view>
		主页
	</view>
</template>

<script>
	import {
		allPoints
	} from '@/api/test.js'

	export default {
		mounted() {
			this.getAllPoint()
		},
		methods: {
			getAllPoint() {
				allPoints().then(response => {
					console.log(response)
				})
			}
		}
	}
</script>
<style>
</style>
