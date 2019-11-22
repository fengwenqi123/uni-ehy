<template>
	<view class="news">
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback">
			<view v-for="data in dataList" :key="data.id" @click="goDetail(data)">
				<ul class="news-content" v-if="data.categoryName === 'e航运'">
                   <!-- <li>
						<image v-if="data.categoryName === '公告'" src="../../static/img/n1.png" mode=""></image>
						<image v-else-if="data.categoryName === 'e航运'" src="../../static/img/n2.png" mode=""></image>
						<image v-else src="../../static/img/n3.png" mode=""></image>
						<p v-if="data.categoryName === '公告'">{{ data.categoryName }}</p>
						<p v-else-if="data.categoryName === 'e航运'">{{ data.categoryName }}</p>
						<p v-else>其他</p>
					</li> -->
					<li>
						<p>
							<span>{{ data.title }}</span>
							<i>{{ data.addTimeString.slice(0, 16) }}</i>
						</p>
						<p v-html="data.content"></p>
					</li>
				</ul>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
// 引入mescroll-uni组件
import { newsList } from '@/api/news.js';
import MescrollUni from 'mescroll-uni'; // npm安装的引入方式
import navBar from '../../colorui/components/cu-custom.vue';
export default {
	components: {
		MescrollUni,
		navBar
	},
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
			dataList: []
		};
	},
	methods: {
		//
		goDetail(item) {
			let itemString = JSON.stringify(item);
			uni.navigateTo({
				url: `/pages/news/details?details=${itemString}`
			});
		},
		//
		/*下拉刷新的回调, 有三种处理方式: */
		downCallback(mescroll) {
			//下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
			mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
		},
		/*上拉加载的回调*/
		upCallback(mescroll) {
			// 此时mescroll会携带page的参数:
			let pageNum = mescroll.num; // 页码, 默认从1开始
			let pageSize = mescroll.size; // 页长, 默认每页10条
			console.log(pageNum, pageSize);
			newsList({
				pageNum,
				pageSize,
				type: 'e航运'
			}).then(response => {
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
.news {
	.news-content {
		background-color: #ffffff;

		li {
			width: 100%;
			height: 180rpx;
			background-color: #ffffff;
			float: left;
		}

		// li:nth-child(1) {
		// 	width: 160rpx;
		// 	padding-left: 36rpx;
		// 	text-align: center;

		// 	image {
		// 		width: 90rpx;
		// 		height: 90rpx;
		// 		margin-top: 20rpx;
		// 	}

		// 	p {
		// 		padding-top: 15rpx;
		// 	}
		// }

		li:nth-child(1) {
			width: 100%;
			padding: 0 32rpx;
			border-bottom: 1rpx solid #ddd;

			p:first-child {
				height: 100rpx;
				line-height: 100rpx;

				span {
					width: calc(100% - 250rpx);
					float: left;
					font-weight: 500;
					font-size: 38rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				i {
					width: 250rpx;
					float: right;
					text-align: right;
					font-size: 28rpx;
					color: #888;
				}
			}
			p:last-child {
				height: 56rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
		}
	}
}
</style>
