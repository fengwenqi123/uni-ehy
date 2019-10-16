<template>
	<view class="ehy-content">
		<view>
			<view class="rule-header">未处理违章</view>
			<view class="li" v-for="(item, index) in items1" :key="index" @click="deatils(item)">
				<div class="list">
					<p>{{item.content}}</p>
					<p>
						<span>{{item.dockName}}</span>
						<span>{{item.violationDate.substring(0,10)}}</span>
					</p>
				</div>
			</view>
			<view class="empty" v-if="items1.length === 0">暂无记录</view>
		</view>
		<view>
			<view class="rule-header">历史行政处罚信息</view>
			<view class="li" v-for="(item, index) in items2" :key="index" @click="deatils(item)">
				<div class="list">
					<p>{{item.content}}</p>
					<p>
						<span>{{item.dockName}}</span>
						<span>{{item.violationDate.substring(0,10)}}</span>
					</p>
				</div>
			</view> 
			<view class="empty" v-if="items2.length === 0">暂无记录</view>
		</view>
	</view>


</template>

<script>
	import {
		violation
	} from '../../../api/home';

	export default {
		data() {
			return {
				items: [],
				items1: [],
				items2: [],
				page: {
					pageNum: 1,
					pageSize: 9999,
					total: 0
				},
			}
		},
		props: ['cm'],
		created() {
			this.getViolation();
		},
		methods: {
			getViolation() {
				violation(this.page.pageNum, this.page.pageSize, this.cm)
					.then(res => {
						console.log(res);
						this.items = res.data.dataList;
						this.items1 = this.items.filter(item => item.status === '未处理');
						this.items2 = this.items.filter(item => item.status === '已处理');
						console.log(this.items1);
					})
			},
			deatils(item){
				uni.setStorage({
				    key: 'ruleInfo',
				    data: item
				});
				var d = JSON.stringify(item);
				uni.navigateTo({
					url: '/pages/home/shipInfo/rule-details?data='+ d,
					animationType: 'pop-in',
					animationDuration: 300
				});
			}
		}
	}
</script>

<style lang="scss">
	.ehy-content {
		.rule-header {
			background: #f2f2f2;
			height: 75rpx;
			line-height: 75rpx;
			padding-left: 32rpx;
		}

		.li {
			background: #fff;

			.list {
				border-bottom: 1px solid #ddd;
				padding: 32rpx;

				p:first-child {
					line-height: 50rpx;
					color: #333;
					font-size: 36rpx;
				}

				p:last-child {
					padding-top: 32rpx;

					span {
						font-size: 30rpx;
						color: #888;
					}

					span:last-child {
						padding-left: 24rpx;
					}
				}
			}
		}

		.li:nth-child(1) {
			.rule-header {
				// border-top: 1px solid #ddd;
			}
		}.li:last-child {
			.list {
				border: 0;
			}
		}
		.empty{
			background: #fff;
			height: 96rpx;
			line-height: 96rpx;
			padding-left: 32rpx;
		}
	}
</style>
