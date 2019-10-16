<template>
	<view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>AIS是否安装</p>
					<p>{{isAis}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>MMSI（九位码）</p>
					<p>{{items.no||'--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>最后一次定位时间</p>
					<p>{{items.receiveTimeString||'--'}}</p>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		latestPosByShipName
	} from '../../../api/home';

	export default {
		data() {
			return {
				items: {},
				isAis: '是'
			}
		},
		props: ['cm'],
		created() {
			this.getLatestPosByShipName();
		},
		methods: {
			getLatestPosByShipName() {
				latestPosByShipName(2, this.cm)
					.then(res => {
						console.log(res);
						if (res.data) {
							this.items = response.data;
							this.isAis = '是';
						} else {
							this.isAis = '否';
							this.items = {};
						}
					})
			}
		}
	}
</script>

<style lang="scss">
	.info{
		p:first-child{
			color: #888;
		}
		p:last-child{
			color: #333333;
			font-size: 36rpx;
			padding-top: 20rpx;
		}
	}
</style>
