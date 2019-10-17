<template>
	<view class="ehy-content">
		<view class="picker-city">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{city}}<text class="lg cuIcon-triangledownfill"></text></view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view id="water-scroll">
			<mescroll-uni class="list" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
				<view class="li" v-for="(item, index) in items" :key="index" :class="{ danger: item.status !== 1 }">
					<ul>
						<li>
							<div>
								<span>{{ item.name }}</span>
								<span>{{ item.modifyTimeString }}</span>
							</div>
							<div>
								<i>当前水位</i>
								<i>警戒水位</i>
								<i>保障水位</i>
							</div>
							<div>
								<label :class="{ red: item.status !== 1 }">{{ item.depth || '--' }}</label>
								<label>{{ item.depthMin || '--' }}</label>
								<label>{{ item.depthMax || '--' }}</label>
							</div>
						</li>
					</ul>
				</view>
			</mescroll-uni>
		</view>

	</view>
</template>

<script>
	// 引入mescroll-uni组件
	import MescrollUni from "mescroll-uni"; // npm安装的引入方式
	import {
		hydrology
	} from '../../../api/home';
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				array: ['杭州市', '湖州市', '宁波市', '绍兴市', '嘉兴市', '金华市', '衢州市', '台州市', '丽水市', '舟山市'],
				index: 0,
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 20 // 每页数据的数量,默认10
					},
					noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无数据'
					},
					textNoMore: '—— 到底了 ——'
				},
				mescroll: null,
				province: '浙江省',
				city: '杭州市',
				items: []
			};
		},
		created() {
			console.log(this.$route.query.city)
			this.city = this.$route.query.city;
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.city = this.array[this.index];
				this.downCallback(this.mescroll);
			},
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll) {
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
				mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll = mescroll
			},

			/*上拉加载的回调*/
			upCallback(mescroll) {
				hydrology(this.province, this.city, mescroll.num, mescroll.size)
					.then(res => {
						console.log(res);

						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.dataList;
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						// let totalPage = res.xxx; 
						// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
						let totalSize = res.data.page.total;
						if (mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
						this.items = this.dataList.concat(curPageData); //追加新数据
						mescroll.endByPage(curPageData.length, totalSize);
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	};
</script>

<style scoped lang="scss">
	.picker-city {
		width: 100%;
		height:80rpx;
		line-height: 80rpx;
		padding-left: 32rpx;
		background: #f2f2f2;
		position: fixed;
		top: 0rpx;
		left:0;
		z-index: 99999999999999;
		background: #fff;
		border-bottom: 1px solid #ddd;
	}

	.list {
		width: 100%;
		background: #fff;

		.address {
			height: 96rpx;
			line-height: 96rpx;
			color: #858585;
			padding-left: 16rpx;
			font-size: 30rpx;
			background: #f2f2f2;
		}


		ul {
			padding-left: 32rpx;
			background: #fff;

			li {
				width: 100%;
				border-bottom: 1rpx solid #d8d8d8;
				height: 163rpx;


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

		.li:last-child {
			li {
				border: 0;
			}
		}
	}
</style>
