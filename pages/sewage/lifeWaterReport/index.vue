<template>
	<view class="lifeWater">
		<div class="top">
			<p @click="showPicker">
				<span>{{ time }}</span>
				<image class="downImg" src="../../../static/img/down.png"></image>
			</p>
			<mpvue-picker
				:themeColor="themeColor"
				ref="mpvuePicker"
				:mode="mode"
				:deepLength="2"
				:pickerValueDefault="pickerValueDefault"
				@onChange="onChange"
				@onConfirm="onConfirm"
				@onCancel="onCancel"
				:pickerValueArray="pickerValueArray"
			></mpvue-picker>
		</div>
		<div id="lifeWater-scroll">
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
				<view v-for="data in dataList" :key="data.id" @click="goDetail(data)">
					<div class="card-content">
						<div class="card-top">
							<p>
								<span>{{ data.place }}</span>
								<span>{{ data.portType === 1 ? '智能' : data.portType === 2 ? '普通' : '--' }}</span>
							</p>
							<p>{{ data.amount }} L</p>
						</div>
						<div class="card-mid">
							<p>{{ data.outletName }}</p>
						</div>
						<div class="card-bottom">
							<p>{{ item.startTime || '--' }}至{{ item.endTime || '--' }}</p>
							<p :class="{ status1: data.status === 1, status2: data.status === 2, status3: data.status === 3 }">
								{{ data.status === 1 ? '生效' : data.status === 2 ? '审核中' : data.status === 3 ? '失效' : '--' }}
							</p>
						</div>
					</div>
				</view>
			</mescroll-uni>
		</div>
	</view>
</template>

<script>
import { sewageReport } from '@/api/sewage.js';
import MescrollUni from 'mescroll-uni'; // npm安装的引入方式
import mpvuePicker from 'mpvue-picker';
export default {
	data() {
		return {
			// 下拉刷新的常用配置
			downOption: {
				use: true, // 是否启用下拉刷新; 默认true
				auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
			},
			// 上拉加载的常用配置
			upOption: {
				use: true, // 是否启用上拉加载; 默认true
				auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10 // 每页数据的数量,默认10
				},

				bottom: 20,
				noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				},
				textNoMore: '—— 到底了 ——'
			},
			// 列表数据
			themeColor: '#007aff',
			mode: 'multiSelector',
			dataList: [],
			type: 1,
			time: '',
			pickerValueArray: [
				[
					{ label: '2012年', value: '2012' },
					{ label: '2013年', value: '2013' },
					{ label: '2014年', value: '2014' },
					{ label: '2015年', value: '2015' },
					{ label: '2016年', value: '2016' },
					{ label: '2017年', value: '2017' },
					{ label: '2018年', value: '2018' },
					{ label: '2019年', value: '2019' },
					{ label: '2020年', value: '2020' },
					{ label: '2021年', value: '2021' },
					{ label: '2022年', value: '2022' },
					{ label: '2023年', value: '2023' },
					{ label: '2024年', value: '2024' },
					{ label: '2025年', value: '2025' },
					{ label: '2026年', value: '2026' },
					{ label: '2027年', value: '2027' },
					{ label: '2028年', value: '2028' },
					{ label: '2029年', value: '2029' },
					{ label: '2030年', value: '2030' }
				],
				[
					{ label: '1月', value: '01' },
					{ label: '2月', value: '02' },
					{ label: '3月', value: '03' },
					{ label: '4月', value: '04' },
					{ label: '5月', value: '05' },
					{ label: '6月', value: '06' },
					{ label: '7月', value: '07' },
					{ label: '8月', value: '08' },
					{ label: '9月', value: '09' },
					{ label: '10月', value: '10' },
					{ label: '11月', value: '11' },
					{ label: '12月', value: '12' }
				]
			],
			pickerValueDefault: [7, 1],
			mescroll: null
		};
	},
	components: {
		mpvuePicker,
		MescrollUni
	},
	created() {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month < 10 ? '0' + month : month;
		this.time = year + '-' + month;
		this.pickerValueDefault[1] = month - 1;
		console.log(this.time);
	},
	methods: {
		showPicker() {
			this.$refs.mpvuePicker.show();
		},
		onChange(e) {
			console.log(e);
		},
		onCancel(e) {
			console.log(e);
		},
		onConfirm(e) {
			console.log(e);
			this.time = e.value[0] + '-' + e.value[1];
			console.log(this.time);
			this.upCallback(this.mescroll);
		},
		/*下拉刷新的回调, 有三种处理方式: */ downCallback(mescroll) {
			//下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
			mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			this.mescroll = mescroll;
		},
		/*上拉加载的回调*/
		upCallback(mescroll) {
			// 此时mescroll会携带page的参数:
			let pageNum = mescroll.num; // 页码, 默认从1开始
			let pageSize = mescroll.size; // 页长, 默认每页10条
			console.log(pageNum, pageSize);
			sewageReport(pageNum, pageSize, this.time, this.type).then(response => {
				console.log(response);
				// 接口返回的当前页数据列表 (数组)
				let curPageData = response.data.dataList;
				// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
				let totalSize = response.data.page.total;
				if (mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				mescroll.endByPage(curPageData.length, totalSize);
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.lifeWater {
	width: 100%;
	.top {
		align-items: center;
		padding: 20rpx 0;
		p {
			display: inline-block;
			background-color: #fff;
			margin-left: 20rpx;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 20rpx;
			border-radius: 30rpx;
			.downImg {
				width: 20rpx;
				height: 10rpx;
				vertical-align: middle;
			}
			span {
				font-size: 25rpx;
				margin-right: 5rpx;
			}
		}
	}
	.card-content {
		padding: 20rpx;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		.card-top {
			display: flex;
			justify-content: space-between;
			padding: 15rpx 0;
			p {
				display: flex;
				align-items: center;
				span:nth-child(1) {
					color: #333;
					font-size: 36rpx;
				}
				span:nth-child(2) {
					padding: 5rpx 10rpx;
					margin-left: 10rpx;
					font-size: 20rpx;
					color: #fff;
					background: #007aff;
				}
			}
		}
		.card-mid {
			font-size: 30rpx;
			color: #333;
			padding: 10rpx 0;
		}
		.card-bottom {
			display: flex;
			justify-content: space-between;
			color: #888;
			padding:10rpx 0;
			font-size: 26rpx;
			.status1 {
				color: #09bb07;
			}
			.status2 {
				color: #f76260;
			}
		}
	}
}
</style>
