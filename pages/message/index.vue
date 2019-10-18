<template>
	<div class="container">
		<ul>
			<li @click="toDetails(item)" v-for="(item,index) in dataList" :key="index">
				<div class="item">
					<div class="title">
						<div class="name">{{item.title}}</div>
						<div class="date">{{item.addTimeString}}</div>
					</div>
					<div class="value">
						{{item.content}}
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { getMessage } from '@/api/message.js';
export default {
	name: 'index',
	data() {
		return {
			dataList: null
		};
	},
	created() {
		this._getMessage();
	},
	methods: {
		_getMessage() {
			getMessage().then(response => {
				this.dataList=response.data.dataList
			});
		},
		toDetails(item){
			uni.navigateTo({
				url: `/pages/message/details?title=${item.title}&time=${item.addTimeString}&content=${item.content}`,
				animationType: 'pop-in',
				animationDuration: 300
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	ul {
		background: #ffffff;
		li{
			border-bottom: 1px solid #D8D8D8;
		}
	}
	.item {
		padding: 34rpx 25rpx;
		.title {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			.name {
				font-size: 32rpx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}
			.date {
				font-size: 24rpx;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
			}
		}
		.value {
			margin-top: 15rpx;
			font-size: 26rpx;
			line-height: 35rpx;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			display: -webkit-box;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
		}
	}
}
</style>
