<template>
	<view class="sewage">
		<banner></banner>	
		<homeItem></homeItem>
	</view>
</template>

<script>
import { boatList, recoveryInfo } from '@/api/sewage.js';
import { saveShipName } from '@/utils/cache.js';
import banner from './home/banner.vue'
import homeItem from './home/homeItem.vue'
export default{
	components:{
		banner,homeItem
	},
	data(){
		return{
			
		}
	},
	created(){
		
	},
	methods:{
		
	}
}
</script>

<style lang="scss" scoped>
	.sewage{
		width:100%;
		padding:10rpx;
	}
</style>
