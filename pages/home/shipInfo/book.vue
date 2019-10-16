<template>
	<view>
		<view class="li" v-for="(item, index) in items" :key="index" :class="{ danger: item.status !== 1 }">
			<div class="list">
				<p>{{item.zsmc}}</p>
				<p>证书有效期：{{item.yxrq}}</p>
			</div>
		</view>
	</view>
</template>

<script>
	import {
		certificate
	} from '../../../api/home';

	export default {
		data() {
			return {
				items: []
			}
		},
		props: ['cbdjh'],
		created() {
			this.getCertificate();
		},
		methods: {
			getCertificate() {
				certificate(this.cbdjh)
					.then(res => {
						console.log(res);
						this.items = res.data;
					})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		border-bottom: 1px solid #ddd;
		padding: 32rpx;

		p:first-child {
			color: #333333;
			font-size: 36rpx;
		}

		p:last-child {
			color: #888;
			padding-top: 20rpx;
		}
	}
</style>
