<template>
	<view class="container">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">背景</block>
		</cu-custom>
		<view class="list">
			<p>{{city}}市</p>
			<ul>
				<li v-for="(item,index) in items" :key="index" :class="{danger:item.status !== 1}">
					<div class="box">
						<div>
							<span>{{item.name}}</span>
							<span>{{item.modifyTimeString}}</span>
						</div>
						<div>
							<i>当前水位</i>
							<i>警戒水位</i>
							<i>保障水位</i>
						</div>
						<div>
							<label :class="{red:item.status !== 1}">{{item.depth || '--'}}</label>
							<label>{{item.depthMin || '--'}}</label>
							<label>{{item.depthMax || '--'}}</label>
						</div>
					</div>
				</li>
			</ul>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import Api from '../../api/test';

	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				loadingType: 'more', //加载更多状态
				headerPosition: "fixed",
				headerTop: "0px",
				province: '浙江',
				city: '湖州',
				items: [],
				page: {
					pageSize: 20,
					pageNum: 1,
					total: 0
				}
			}
		},
		onLoad() {
			
			this.loadData();
		},
		//加载更多
		onReachBottom() {
			if (this.loadingType === 'more') {
				this.loadData();
			}
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			// if (e.scrollTop >= 0) {
			// 	this.headerPosition = "fixed";
			// } else {
			// 	this.headerPosition = "absolute";
			// }
		},
		//下拉刷新
		onPullDownRefresh() {
			this.page.pageNum = 1;
			this.loadData('refresh');
		},
		methods: {
			loadData(type = 'add', loading) {

				Api.hydrology('浙江', this.city, this.page.pageNum, this.page.pageSize).then(res => {
					// console.log(res);
					//没有更多直接返回
					if (type === 'add') {
						if (this.loadingType === 'nomore') {
							return;
						}
						this.loadingType = 'loading';
					} else {
						this.loadingType = 'more'
					}

					if (type === 'refresh') {
						this.page.pageNum = 1;
						this.items = [];
					}
					this.page.pageNum++;
					this.items = this.items.concat(res.data.data.dataList);

					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType = this.items.length === res.data.data.page.total ? 'nomore' : 'more';
					if (type === 'refresh') {
						if (loading == 1) {
							uni.hideLoading()
						} else {
							uni.stopPullDownRefresh();
						}
					}
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;

		p {
			height: 96rpx;
			line-height: 96rpx;
			color: #858585;
			padding-left: 16rpx;
			font-size: 30rpx;
			background: #f2f2f2;
		}

		.list {
			ul {
				background: #fff;

				li {
					height: 163rpx;
					padding-left: 32rpx;

					.box {
						height: 100%;
						width: 100%;
						border-bottom: 1rpx solid #d8d8d8;

						div {
							padding-right: 32rpx;
						}

						div:first-child {
							height: 68rpx;
							line-height: 68rpx;

							span:first-child {
								float: left;
								color: #333333;
								font-size: 30rpx;
							}

							span {
								float: right;
								font-size: 26rpx;
								color: #666666;
							}
						}

						div:nth-child(2),
						div:nth-child(3) {
							float: left;
							width: 100%;

							i,
							label {
								height: 25rpx;
								line-height: 25rpx;
								width: 33.33333%;
								float: left;
								color: #555555;
								font-size: 26rpx;
							}

							label {
								height: 57rpx;
								line-height: 57rpx;
								color: #108ee9;
								font-size: 30rpx;
							}
						}
					}
				}

				.danger {
					background: #fff0f0;

					.red {
						color: red !important;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
