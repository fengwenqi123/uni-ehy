<template>
	<view class="lifeWater">
		<div class="top">
			<p @click="showCityPicker">
				<span>{{ city }}{{ area }}</span>
				<span v-if="city === ''">地区</span>
				<image class="downImg" src="../../../static/img/down.png"></image>
			</p>
			<p>
				<picker mode="selector" :range="typeList" @change="selectType">
					<span>{{ fomesType }}</span>
					<span v-if="fomesType === ''">排污类型</span>
					<image class="downImg" src="../../../static/img/down.png"></image>
				</picker>
			</p>
		</div>
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		<div id="lifeWater-scroll">
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
				<view v-for="data in dataList" :key="data.id" @click="goDetail(data)">
					<div class="card-content">
						<div class="card-top">
							<p>
								<span>{{ data.name }}</span>
								<span>{{ data.attribute === 1 ? '智能' : data.attribute === 2 ? '普通' : data.attribute === 3 ? '综合' : '不明' }}</span>
							</p>
							<p :class="{ status1: data.status === 2, status2: data.status === 3 }">
								{{ data.status === 1 ? '空闲' : data.status === 2 ? '工作中' : data.status === 3 ? '报修中' : '状态不明' }}
							</p>
						</div>
						<div class="card-mid">
							<p>
								<span>联系人：{{ data.contact || '--' }}</span>
								<span>{{ data.mobile }}</span>
							</p>
							<p>
								<span>{{ data.distance }}</span>
							</p>
						</div>
						<div class="card-mid">
							<p>地址：{{ data.address }}</p>
						</div>
						<div class="card-bottom">
							<span :class="{ active: fomesFun1(data.fomesType || '') }">生活垃圾</span>
							<span :class="{ active: fomesFun2(data.fomesType || '') }">生活污水</span>
							<span :class="{ active: fomesFun3(data.fomesType || '') }">油污</span>
						</div>
					</div>
				</view>
			</mescroll-uni>
		</div>
	</view>
</template>

<script>
import { sewagePoint } from '@/api/sewage.js';
import MescrollUni from 'mescroll-uni'; // npm安装的引入方式
import mpvueCityPicker from 'mpvue-citypicker';
export default {
	data() {
		return {
			pickerValueDefault: [10, 0, 0],
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
			mescroll: null,
			dataList: [],
			typeList: ['全部类型', '生活垃圾', '生活污水', '油污'],
			currentLon: '',
			currentLat: '',
			city: '',
			area: '',
			fomesType: ''
		};
	},
	components: {
		mpvueCityPicker,
		MescrollUni
	},
	created() {
		uni.getLocation({
			type: 'wgs84',
			success: res => {
				console.log('当前位置的经度：' + res.longitude);
				this.currentLon = res.longitude;
				console.log('当前位置的纬度：' + res.latitude);
				this.currentLat = res.latitude;
			}
		});
	},
	methods: {
		showCityPicker() {
			this.$refs.mpvueCityPicker.show();
		},
		selectType(e) {
			console.log(e.detail.value);
			this.fomesType = this.typeList[e.detail.value];
			if (this.fomesType === '全部类型') {
				this.fomesType = '';
			}
			this.upCallback(this.mescroll);
		},
		onChange(e) {
			console.log(e);
		},
		onCancel(e) {
			console.log(e);
		},
		onConfirm(e) {
			console.log(e);
			this.city = e.label.split('-')[1];
			this.area = e.label.split('-')[2];
			console.log(this.city);
			console.log(this.area);
			this.upCallback(this.mescroll);
		},
		fomesFun1(value) {
			if (value.indexOf('生活垃圾') !== -1) {
				return true;
			} else {
				return false;
			}
		},
		fomesFun2(value) {
			if (value.indexOf('生活污水') !== -1) {
				return true;
			} else {
				return false;
			}
		},
		fomesFun3(value) {
			if (value.indexOf('油污') !== -1) {
				return true;
			} else {
				return false;
			}
		},
		/*下拉刷新的回调, 有三种处理方式: */
		downCallback(mescroll) {
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
			console.log(this.city, this.area);
			sewagePoint(pageNum, pageSize, this.city, this.area, this.fomesType, this.currentLon, this.currentLat).then(response => {
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
				.status1 {
					color: #09bb07;
				}
				.status2 {
					color: #f76260;
				}
			}
		}
		.card-mid {
			font-size: 30rpx;
			color: #888;
			padding: 10rpx 0;
		}
		.card-bottom {
			padding: 10rpx 0;
			span {
				font-size: 20rpx;
				color: #888;
				padding: 2rpx;
				border: 1px solid #888;
				border-radius: 3rpx;
				margin-right: 10rpx;
			}
			.active {
				color: #007aff;
				border-color: #007aff;
			}
		}
	}
}
</style>
