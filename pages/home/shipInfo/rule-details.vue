<template>
	<view class="ehy-content">
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>船名</p>
					<p>{{item.shipName || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>违章录入单位</p>
					<p>{{item.dockName || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>违章处理状态</p>
					<p>{{item.status || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>违章标记</p>
					<p>{{item.flag || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>违章时间</p>
					<p>{{item.violationDate.slice(0,10) || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>违章录入时间</p>
					<p>{{item.addDate.slice(0,10) || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>违章类型</p>
					<p>{{item.gcvTypeName || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>违法内容</p>
					<p>{{item.content || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>违章处理结果</p>
					<p>{{item.whyRemove || '--'}}</p>
				</div>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				item: {
					violationDate:'',
					addDate:''
				}
			}
		},
		created() {
			const value = uni.getStorageSync('ruleInfo');
			if (value) {
				this.item = value
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.flex{
		background: #fff;
	}
	.info{
		p:first-child{
			color: #888;
		}
		p:last-child{
			line-height: 50rpx;
			color: #333333;
			font-size: 36rpx;
			padding-top: 20rpx;
		}
	}
</style>
